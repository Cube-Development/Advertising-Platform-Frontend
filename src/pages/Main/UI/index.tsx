import { OptionList, BasicInfoList, PartnerList, PriceList, AccommList } from '../../../features/mainPage';
import {FC} from 'react';
import * as data from './../../../../public/locales/ru/translation.json';
import styles from './styles.module.scss';
import { MyButton } from '../../../shared/ui';

export const MainPage: FC = () => {
    const text = data.main_page_advertiser
    return (
        <>
            <section className={styles.top__wrapper}>
                <div className="container">
                    <div className={styles.top__row}>
                        <div className={styles.top__right}>
                            <h1 className={styles.top__title}>
                                {text.title}
                            </h1>
                            <h3 className={styles.top__subtitle}>
                                {text.subtitle}
                            </h3>
                            <OptionList options={text.options}/>
                            <MyButton>{text.btn_catalog}</MyButton>
                        </div>

                        <div>
                            <img src="./../../../../public/images/assets/MainImage.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.services__wrapper}>
                <div className="container">
                    <h2 className={styles.services__title}>
                        {text.services}
                    </h2>
                    <BasicInfoList infos={text.basic_information}/>
                </div>
            </section>

            <section className={styles.partners__wrapper}>
                    <h1 className={styles.partners__title}>
                        {text.confidence}
                    </h1>

                    <div className={styles.partners__block}>
                        <PartnerList partners={text.partners} />
                        <PartnerList partners={text.partners} />
                    </div>
            </section>

            <section className={styles.how__wrapper}>


            </section>

            <section className={styles.why__wrapper}>
                <div className="container">
                    <h1 className={styles.why__title}>
                        {text.why}
                    </h1>
                    <AccommList accomms={text.accomms}/>
                </div>
            </section>

            <section className={styles.cta__wrapper}>
                <div className="container">
                    <div className={styles.cta__column}>
                        <div className={styles.cta__row}>
                            <img src="./../../../../public/images/common/key.svg" alt="" />
                            <h1 className={styles.cta__title}>{text.start_advertising}</h1>
                        </div>
                        
                        <h2 className={styles.cta__subtitle}>{text.choose_tarif}</h2>
                        <p className={styles.cta__text}>{text.tarif_info}</p>
                    </div>

                    <PriceList tarifs={text.tarifs}/>

                </div>
            </section>
        </>
    );
};
