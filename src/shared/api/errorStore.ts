interface BackendError {
  status: number | string;
  message: string;
  time: string;
  url?: string;
  params?: any;
  body?: any;
  raw: any;
}

class ErrorStore {
  private errors: BackendError[] = [];
  private listeners: Set<(errors: BackendError[]) => void> = new Set();

  addError(error: BackendError) {
    this.errors = [error, ...this.errors].slice(0, 10); // Храним последние 10 ошибок
    this.notify();
  }

  getErrors() {
    return this.errors;
  }

  subscribe(listener: (errors: BackendError[]) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.errors));
  }
}

export const errorStore = new ErrorStore();

import { useState, useEffect } from "react";

export const useBackendErrors = () => {
  const [errors, setErrors] = useState<BackendError[]>(errorStore.getErrors());

  useEffect(() => {
    return errorStore.subscribe(setErrors);
  }, []);

  return errors;
};
