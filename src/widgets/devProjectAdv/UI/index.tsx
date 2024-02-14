import { AcceptPost } from '@features/acceptPost';
import { ChannelChat } from '@features/channelChat';
import { CheckPost } from '@features/checkPost';
import { Feedback } from '@features/feedback';
// import { DevProjectAdvCard } from '@features/devProjectAdvCard';
import { NewProject } from '@features/newProject';
import { RejectPost } from '@features/rejectPost';
import { SeePost } from '@features/seePost';
import { TurnkeyProject } from '@features/turnkeyProject';
import { ZeroProject } from '@features/zeroProject';
import { IItemCard } from '@shared/types/common';
import { FC } from 'react';

interface DevProjectAdvProps {
    cards: IItemCard[];
}

export const DevProjectAdv: FC<DevProjectAdvProps> = ({cards}) => {
    return (
        <div className='container'>
            {/* {cards.length === 0
            ?
            <ZeroProject NewProjectBtn={NewProject} TurnkeyProjectBtn={TurnkeyProject}/>
            :
            cards.map((card, index) =>
                <DevProjectAdvCard 
                    key={index} 
                    card={card} 
                />
            )
            } */}
        </div>
    );
};