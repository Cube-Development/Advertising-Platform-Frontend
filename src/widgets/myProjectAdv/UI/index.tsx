import { MyProjectAdvCard } from '@features/myProjectAdvCard';
import { IItemCard } from '@shared/types/common';
import { FC } from 'react';

interface MyProjectAdvProps {
    cards: IItemCard[];
}

export const MyProjectAdv: FC<MyProjectAdvProps> = ({cards}) => {
    return (
        <div>
            {cards.map((card, index) =>
                <MyProjectAdvCard key={index} card={card}/>
            )}
        </div>
    );
};