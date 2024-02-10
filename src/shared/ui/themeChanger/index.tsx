import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface ThemeChangerProps {
    page: string;
    onThemeChange: (coefficient: number) => void;
}

const allThemes  = [
    {"name": "theme1", "coefficient": 1},
    {"name": "theme2", "coefficient": 2},
    {"name": "theme3", "coefficient": 3},
]

export const ThemeChanger: FC<ThemeChangerProps> = ({page, onThemeChange }) => {
    const { t } = useTranslation();

    const [selectedTheme, setSelectedTheme] = useState<string>('');

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTheme = event.target.value;
        setSelectedTheme(selectedTheme);

        const selectedThemeObject = allThemes.find(theme => theme.name === selectedTheme);
        if (selectedThemeObject) {
            onThemeChange(selectedThemeObject.coefficient);
        }
    };

    return (
        <div className={styles.theme__wrapper}>
            <h2>
                {t(`${page}.card.theme`)}
            </h2>

            <select
                value={selectedTheme}
                onChange={handleThemeChange}
            >
                {allThemes.map((theme, index) =>
                    <option key={index} value={theme.name}>{theme.name}</option>
                )}
            </select>
        </div>
    );
};