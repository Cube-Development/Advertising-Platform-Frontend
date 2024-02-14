export enum orderStatus  {
    rejected = 0,
    completed = 1,
    posted = 2,
    accepted = 3,
    moderation = 4,
    waiting = 5,
}

export const chating = [orderStatus.posted, orderStatus.accepted]
