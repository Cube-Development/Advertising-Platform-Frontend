import { platformType } from '@shared/config/platform';
import { MyButton, MyInput } from '@shared/ui';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';


interface FormData {
    platform: platformType;
    link: string;
}


export const PlatformIdentification: FC = () => {
    const isVisible = false
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
                <span>
                    1
                </span>
                <p>{t('add_platform.identification')}</p>
            </div>

            {isVisible && 
                <>
                <div  className={styles.form}>
                    <div>
                        <p>{t('add_platform.choose_platform')}</p>
                        <div>
                            <MyButton className={styles.platform__btn} {...register('platform', { value: platformType.telegram })}>
                                {t('add_platform_btn.telegram')}
                            </MyButton>
                            <MyButton className={styles.platform__btn}  {...register('platform', { value: platformType.instagram })}>
                                {t('add_platform_btn.instagram')}
                            </MyButton>
                            <MyButton className={styles.platform__btn}  {...register('platform', { value: platformType.youtube })}>
                                {t('add_platform_btn.youtube')}
                            </MyButton>
                        </div>
                    </div>

                    <div>
                        <p>{t('add_platform.paste_link')}</p>
                        <div>
                            {/* <input {...register('link', { required: 'Это поле обязательно' })} /> */}
                            <MyInput className={styles.platform__input} {...register('link', { required: 'Это поле обязательно' })} placeholder="Https//t.me/channel_name..." />
                            {errors.link && <span>{errors.link.message}</span>}
                            
                        <MyButton className={`${styles.platform__btn} ${styles.check}`} type="submit">
                                {t('add_platform_btn.check')}
                            </MyButton>
                        </div>
                    </div>

                    </div>
                    <div className={`${styles.top} ${styles.blur}`}>
                        <span>
                            2
                        </span>
                        <p>{t('add_platform.channel_info')}</p>
                    </div>
                </>
            }
        </form>
    );
};