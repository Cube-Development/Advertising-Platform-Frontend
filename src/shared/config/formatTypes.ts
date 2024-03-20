// export enum formatTypes {
//     telegram1h24 = 0,
//     telegram2h48 = 1,
//     instagramStoris = 2,
//     instagramLenta = 3,
//     youtube = 4,
// }

// export const formatsTelegram = [
//     {
//         label: "telegram1h24",
//         value: formatTypes.telegram1h24
//     },
//     {
//         label: "telegram2h48",
//         value: formatTypes.telegram2h48
//     },
// ]

// export const formatsInstagram = [
//     {
//         label: "instagramStoris",
//         value: formatTypes.instagramStoris
//     },
//     {
//         label: "instagramLenta",
//         value: formatTypes.instagramLenta
//     },
// ]

// export const formatsYoutube = [
//     {
//         label: "youtube",
//         value: formatTypes.youtube
//     },
// ]

// export interface IPlatformFormats{
//     label: string,
//     value: formatTypes
// }

export const platformFormats: { [key: number]: string } = {
  0: "telegram1h24",
  1: "telegram2h24",
  2: "telegram3h24",
  3: "telegram4h24",
  4: "telegram5h24",
};
