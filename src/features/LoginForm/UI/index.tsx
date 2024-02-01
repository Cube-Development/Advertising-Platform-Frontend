import React, { FC, useState } from "react";
import styles from "./styles.module.scss";
import { ILogin } from "@shared/types/common";
import { MyButton, MyForm, MyInput } from "@shared/ui";

interface LoginFormProps {
  setModal: ILogin;
}

export const LoginForm: FC<LoginFormProps> = ({ setModal }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setModal(true, formData);
  };

  return (
    <MyForm onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Имя:</label>
        <MyInput
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <MyInput
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <MyButton type="submit">Отправить</MyButton>
    </MyForm>
  );
};
