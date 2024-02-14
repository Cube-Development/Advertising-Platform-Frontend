import { AcceptPost } from '@features/acceptPost';
import { ChannelChat } from '@features/channelChat';
import { CheckPost } from '@features/checkPost';
import { Feedback } from '@features/feedback';
import { MyProjectAdvCard } from '@features/myProjectAdvCard';
import { NewProject } from '@features/newProject';
import { RejectPost } from '@features/rejectPost';
import { SeePost } from '@features/seePost';
import { TurnkeyProject } from '@features/turnkeyProject';
import { ZeroProject } from '@features/zeroProject';
import { IItemCard } from '@shared/types/common';
import { FC } from 'react';

interface MyProjectAdvProps {
    cards: IItemCard[];
}

export const MyProjectAdv: FC<MyProjectAdvProps> = ({cards}) => {
    return (
        <div className='container'>
            {cards.length === 0
            ?
            <ZeroProject NewProjectBtn={NewProject} TurnkeyProjectBtn={TurnkeyProject}/>
            :
            cards.map((card, index) =>
                <MyProjectAdvCard 
                    key={index} 
                    card={card} 
                    FeedbackBtn={Feedback}
                    AcceptBtn={AcceptPost}
                    RejectBtn={RejectPost}
                    CheckBtn={CheckPost}
                    SeeBtn={SeePost} 
                    ChannelChatBtn={ChannelChat} 
                />
            )
            }
        </div>
    );
};