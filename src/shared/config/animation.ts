export const PAGE_ANIMATION = {
  animationLeft: {
    hidden: {
      x: -10,
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
      x: 10,
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
      y: 10,
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
      y: -10,
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

  sideTransition: {
    hidden: { opacity: 1, x: "100%" },
    visible: { opacity: 1, x: "0%" },
    transition: { transition: { duration: 0.5 } },
  },

  dropdownTransition: {
    close: { opacity: 0, y: "-100%", x: "0%" },
    open: { opacity: 1, y: "0%", x: "0%" },
    transition: { transition: { duration: 0.5 } },
  },

  animationChat: {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.025 },
    }),
  },

  animationNotification: {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.025 },
    }),
  },
};
