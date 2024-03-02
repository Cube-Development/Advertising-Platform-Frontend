import { InfoIcon } from '@shared/assets';
import { IAddProfileData, IBlockData } from '@shared/types/common';
import { MyInput } from '@shared/ui';
import { FC } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';


interface ProfileDataProps {
    data: IBlockData[];
    onChange:  UseFormSetValue<IAddProfileData>;
}

export const ProfileData: FC<ProfileDataProps> = ({data, onChange}) => {
  const { t } = useTranslation();

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>, type: keyof IAddProfileData) => {
    const selectedValue = event.target.value;
    onChange(type, selectedValue);
  };

  return (
        <div className={styles.wrapper} >
            {/* {
                data.map((row) => {

                    const row_dict: IParametraData = t(row.parametr, {returnObjects: true});

                    return (
                            <div className={styles.wrapper} >
                                <div className={styles.left}>
                                    <p>{t(row_dict.title)}</p>
                                    <InfoIcon />
                                </div>

                                <div>
                                    <MyInput onChange={(event) => handleDataChange(event, row.type)} placeholder={row_dict.default_value} />
                                </div>            
                            </div>
                            )
                        }
                    )
            } */}
        </div>
    )
};