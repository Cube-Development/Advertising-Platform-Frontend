import { AcceptOffer } from '@features/acceptOffer';
import { BloggerOfferCard } from '@features/bloggerOfferCard';
import { RejectOffer } from '@features/rejectOffer';
import { SeeLink } from '@features/seeLink';
import { SeeReason } from '@features/seeReason';
import { SendLink } from '@features/sendLink';
import { ZeroPlatform } from '@features/zeroPlatform';
import { IBloggerOfferCard } from '@shared/types/common';
import {FC} from 'react';
import styles from './styles.module.scss'

interface BloggerOfferProps {
    cards: IBloggerOfferCard[];
}

export const BloggerOffer: FC<BloggerOfferProps> = ({
    cards,    
}) => {

    return (
        <div className='container sidebar'>
            {
            // cards.length === 0
            // ?
            // <ZeroPlatform AddPlatformBtn={AddPlatform}/>
            // :
            cards.map((card, index) =>
                <BloggerOfferCard 
                    key={index} 
                    card={card} 
                    SeeLinkBtn={SeeLink}
                    SendLinkBtn={SendLink}
                    AcceptOfferBtn={AcceptOffer}
                    RejectOfferBtn={RejectOffer}
                    SeeReasonBtn={SeeReason}
                />
            )
            }
        </div>
    );
};