import { FC } from "react";
import styles from "./styles.module.scss";
import { IOption } from "@shared/types/mainPage";
import { OptionCard } from "@entities/mainPage";

interface OptionListProps {
  options: IOption[];
}

export const OptionList: FC<OptionListProps> = ({ options }) => {
    return (
        <div className={styles.options}>
        {options.map((option, index) => (
            <OptionCard key={index} option={option} />
        ))}
        </div>
    );
};
