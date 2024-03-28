import {FC} from 'react';
import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next';
import { MyButton } from '@shared/ui';
import { ArrowIcon2 } from '@shared/assets';

interface PostGenerationProps {
}

export const PostGeneration: FC<PostGenerationProps> = () => {
    const { t } = useTranslation();
    return (
      <MyButton className={styles.button}>
        <div>
          {t(`create_order.create.generation`)}
          <ArrowIcon2 />
        </div>
      </MyButton>
    );
  };
  