import { LoginForm } from './../../../features/LoginForm';
import {FC, useState} from 'react';
import { MyModal } from './../../../shared/ui';
import { LoginCode } from './../../../features/LoginCode';
import { ILogin } from './../../../shared/types/login';


export const LoginPage: FC = () => {
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
  
    const changeModal: ILogin = (vision, data) => {
        setModal(vision);
        if (data) {
          setFormData(data);
        }
      };
  
    return (
      <>
        <LoginForm setModal={changeModal} />
        <MyModal visible={modal} setVisible={setModal}>
          <LoginCode email={formData.email} changeModal={changeModal} />
        </MyModal>
      </>
    );
  };