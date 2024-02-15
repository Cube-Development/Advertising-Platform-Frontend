import { DevProjectAdvCard } from '@entities/devProjectAdvCard';
import { ContinueTemplate } from '@features/continueTemplate';
import { NewProject } from '@features/newProject';
import { TurnkeyProject } from '@features/turnkeyProject';
import { ZeroProject } from '@features/zeroProject';
import { IDevItemCard } from '@shared/types/common';
import { FC } from 'react';

interface DevProjectAdvProps {
    cards: IDevItemCard[];
}

export const DevProjectAdv: FC<DevProjectAdvProps> = ({cards}) => {
    return (
        <div className='container'>
            {cards.length === 0
            ?
            <ZeroProject NewProjectBtn={NewProject} TurnkeyProjectBtn={TurnkeyProject}/>
            :
            cards.map((card, index) =>
                <DevProjectAdvCard 
                    key={index} 
                    card={card} 
                    ContinueBtn={ContinueTemplate}
                />
            )
            }
        </div>
    );
};