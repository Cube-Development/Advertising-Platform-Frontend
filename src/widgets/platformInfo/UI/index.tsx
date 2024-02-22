import React, { FC, useState, useEffect } from 'react';
import { MySelect } from '@shared/ui/MySelect';
import { SubmitHandler, useForm, UseFormRegister, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { SelectOption } from '@features/selectOption';
import { IOptions } from '@shared/types/common';



interface FormData {
  category: string;
  languages: string;
  region: string;
  sex: string;
  age: string;
}

const options: IOptions = {
  category: [
    { label: 'Категория 1', value: '1' },
    { label: 'Категория 2', value: '2' },
  ],
  languages: [
    { label: 'Русский', value: 'ru' },
    { label: 'Английский', value: 'en' },
  ],
  region: [
    { label: 'Россия', value: 'ru' },
    { label: 'Украина', value: 'ua' },
  ],
  sex: [
    { label: 'Мужчины', value: 'male' },
    { label: 'Женщины', value: 'female' },
  ],
  age: [
    { label: '18-24', value: '18-24' },
    { label: '25-34', value: '25-34' },
  ],
};

export const PlatformInfo: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedAge, setSelectedAge] = useState('');

  useEffect(() => {
    setSelectedCategory(options.category[0].value);
    setSelectedLanguage(options.languages[0].value);
    setSelectedRegion(options.region[0].value);
    setSelectedSex(options.sex[0].value);
    setSelectedAge(options.age[0].value);
  }, []);

  const isVisible = true;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <div className={`${styles.top} ${isVisible || styles.complite}`}>
        <span>1</span>
        <p>{t('add_platform.identification')}</p>
      </div>
      <div className={styles.form}>
        <SelectOption defaultValue={'add_platform.default_value'} options={options.category} title={'add_platform.category'} text={'ffsdfs'}/>
        <SelectOption defaultValue={'add_platform.default_value'} options={options.languages} title={'add_platform.languages'} text={'ffsdfs'}/>
        <SelectOption defaultValue={'add_platform.default_value'} options={options.region} title={'add_platform.region'} text={'ffsdfs'}/>
        <SelectOption defaultValue={'add_platform.default_value'} options={options.age} title={'add_platform.age'} text={'ffsdfs'}/>
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};
