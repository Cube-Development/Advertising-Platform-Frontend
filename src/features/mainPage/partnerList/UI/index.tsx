import { FC } from "react";
import styles from "./styles.module.scss";

interface PartnerListProps {
  partners: { img: string }[];
}

export const PartnerList: FC<PartnerListProps> = ({ partners }) => {
  return (
    <div className={styles.partners}>
      {partners.map((partner, index) => (
        <img key={index} src={`images/partners/${partner.img}`} alt="" />
      ))}
    </div>
  );
};
