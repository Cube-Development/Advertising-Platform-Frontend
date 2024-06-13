export const MAIN_PAGE_ANIMATION = {
  animationLeft: {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.05 },
    }),
  },
  animationRight: {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.05 },
    }),
  },
  animationUp: {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.05 },
    }),
  },
  animationDown: {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.05 },
    }),
  },

  animationVision: {
    hidden: {
      opacity: 0,
    },
    visible: (custom: number) => ({
      opacity: 1,
      transition: { delay: custom * 0.05 },
    }),
  },
  viewport: { amount: 0.05, once: true },
};
