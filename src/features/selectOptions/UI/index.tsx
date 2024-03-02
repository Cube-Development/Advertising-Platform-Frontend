import { IAddPLatformData, IOption } from '@shared/types/common';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'
import { InfoIcon } from '@shared/assets';
import { UseFormSetValue } from 'react-hook-form';


interface SelectOptionsProps {
    title: string;
    text: string;
    defaultValue: string;
    options: IOption[];
    type: keyof IAddPLatformData; 
    onChange:  UseFormSetValue<IAddPLatformData>;
    single: boolean,
}

export const SelectOptions: FC<SelectOptionsProps> = ({title, text, defaultValue, options, type, onChange, single}) => {

    // const { t } = useTranslation();

    // return (
    //     <div className={styles.wrapper}>
    //         <div>
    //             <p>{t(title)}</p>
    //             <InfoIcon />
    //         </div>
    //         <MySelect 
    //             onChange={(e) => {
    //                 const selectedValue = e.target.value;
    //                 console.log("Selected value:", selectedValue);
    //                 onChange(type, selectedValue) }} 
    //             options={options} 
    //             defaultValue={defaultValue}/>
    //     </div>
    // );


  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
  const [selectedOption, setSelectedOption] = useState<(string | number)>('');
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleOptionsChange = (event: React.MouseEvent<HTMLLIElement | EventTarget> | React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue =
      event.target instanceof HTMLLIElement
        ? (event.target as HTMLLIElement).getAttribute('data-value')
        :  (event.target as HTMLInputElement).value;
    

    if (selectedValue) {
        const newOptions = selectedOptions.includes(selectedValue)
        ? selectedOptions.filter((value) => value !== selectedValue)
        : [...selectedOptions, selectedValue]
        setSelectedOptions(newOptions);
        console.log(newOptions)
        onChange(type, newOptions as [])
        }
  };

  const handleOptionChange = (event: React.MouseEvent<HTMLLIElement | EventTarget>) => {
    const selectedValue = Number( (event.target as HTMLLIElement).getAttribute('data-value'))
    setSelectedOption(selectedValue);
    onChange(type, selectedValue);
    closeMenu();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  };

  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
      <div className={styles.wrapper} ref={menuRef}>
        <div className={styles.left}>
            <p>{t(title)}</p>
            <InfoIcon />
        </div>

        <div>
            <button 
                type="button"
                onClick={handleButtonClick}>
              {
                single
                ?
                <>
                  {selectedOption === '' ? t(defaultValue) : selectedOption}
                </>
                :
                <>
                  {selectedOptions.length === 0 ? t(defaultValue) : <>{t('add_platform.choosed')}: {selectedOptions.length} {t('add_platform.from')} {options.length}</>}
                </>
              }
              
            </button>

            {isMenuOpen && 
                <div  className={styles.menu}>
                    <ul className={options.length > 5 ? styles.scroll : ''}>

                    {
                      single 
                      ?
                      <>
                        {options.map((option) => (
                            <li
                              key={option.value}
                              onClick={handleOptionChange}
                              data-value={option.value}
                              className={selectedOption == option.value ? styles.active : ''}
                              >
                                {option.label}
                            </li>
                            ))}
                      
                      </>
                      :
                      <>
                        {options.map((option) => (
                          <li
                            key={option.value}
                            onClick={handleOptionsChange}
                            data-value={option.value}
                            className={selectedOptions.includes(option.value) ? styles.active : ''}
                            >
                              {option.label}
                              <input
                                  type="checkbox"
                                  value={option.value}
                                  onChange={handleOptionsChange}
                                  checked={selectedOptions.includes(option.value)}
                                  />
                          </li>
                          ))}
                      </>

                    }
                    
                    </ul>
                </div>
            }
        </div>

      </div>
    )
};