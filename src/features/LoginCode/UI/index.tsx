import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ILogin } from "@shared/types/common";
import { useAuth } from "@shared/hooks/useAuth";
import { postCode } from "@shared/auth";
import { MyButton, MyInput } from "@shared/ui";

interface LoginCodeProps {
  email: string;
  changeModal: ILogin;
}

export const LoginCode: FC<LoginCodeProps> = ({ email, changeModal }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(120);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { toggleLogin } = useAuth();

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (countdown > 0) {
      timerId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [countdown]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");
    const truncatedValue = sanitizedValue.slice(0, 5);
    setVerificationCode(truncatedValue);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault(); // Предотвращение стандартного действия по умолчанию (перезагрузки страницы)
    console.log("handleSubmit");
    // Проверка длины кода перед отправкой
    if (verificationCode.length < 5) {
      return;
    }

    try {
      const response = await postCode({ code: parseInt(verificationCode) });
      console.log(response);
      if (response?.status === "Success") {
        // Закрыть модальное окно или выполнить другие действия после успешной отправки
        toggleLogin(response);
      } else if (response?.status === "Invalid Code") {
        // Показать сообщение об ошибке
        setErrorMessage(
          "Неверный код. Пожалуйста, проверьте введенный код и попробуйте снова."
        );
      }
    } catch (error) {
      // Показать общее сообщение об ошибке
      setErrorMessage("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <div>
      <p>
        На почту {email} был выслан код для подтверждения.
        <br />
        <br />
      </p>
      <p>Введите код:</p>

      <MyInput
        type="text"
        placeholder="Вставьте код"
        value={verificationCode}
        onChange={handleInputChange}
        pattern="[0-9]*"
        maxLength={5}
      />
      <p>
        {countdown} сек
        <br />
        <br />
      </p>
      <MyButton
        type="submit"
        disabled={verificationCode.length < 5}
        onClick={handleSubmit}
      >
        Продолжить
      </MyButton>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
