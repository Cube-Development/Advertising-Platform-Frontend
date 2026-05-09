import React from "react";

// ─── Platform Cards ─────────────────────────────────────────

export interface PlatformData {
  name: string;
  count: string;
  label: string;
  icon: React.ReactNode;
  brandColor: string;
}

const TelegramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
      fill="#1CA1F1"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.42456 11.8708C8.58316 10.495 10.6896 9.58783 11.7437 9.14925C14.7523 7.89676 15.3783 7.67888 15.7869 7.67167C15.8767 7.67008 16.0772 7.69234 16.2087 7.80016C16.3196 7.89115 16.3503 8.01423 16.3644 8.08647C16.3785 8.1587 16.396 8.3229 16.3821 8.45115C16.2238 9.91494 15.5393 13.9576 15.1873 15.8236C15.0383 16.6133 14.747 16.8789 14.4651 16.9048C13.8524 16.9609 13.3868 16.4998 12.7937 16.1114C11.865 15.5031 11.3402 15.123 10.4385 14.529C9.39665 13.8427 10.0718 13.4651 10.6657 12.848C10.8213 12.6864 13.5231 10.2289 13.5755 10.0058C13.582 9.97793 13.5882 9.87413 13.5262 9.81896C13.4641 9.76378 13.3731 9.78263 13.3072 9.79758C13.2137 9.8188 11.7251 10.8016 8.84157 12.7483C8.41848 13.0392 8.03541 13.1809 7.69239 13.1735C7.31427 13.1654 6.58614 12.9596 6.04439 12.7834C5.3798 12.5672 4.85226 12.453 4.89823 12.0858C4.92218 11.8943 5.09761 11.7001 5.42456 11.8708Z"
      fill="white"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      fill="url(#ig-grad)"
    />
    <defs>
      <linearGradient
        id="ig-grad"
        x1="2.9"
        y1="21.1"
        x2="21.1"
        y2="2.9"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F58529" />
        <stop offset="0.2" stopColor="#FEDA77" />
        <stop offset="0.5" stopColor="#DD2A7B" />
        <stop offset="0.8" stopColor="#8134AF" />
        <stop offset="1" stopColor="#515BD4" />
      </linearGradient>
    </defs>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      fill="#FF0000"
    />
    <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white" />
  </svg>
);

export const PLATFORM_CARDS: PlatformData[] = [
  {
    name: "main_advertiser.work_with_us.platforms.platform_names.telegram",
    count: "615+",
    label: "main_advertiser.work_with_us.platforms.channels",
    icon: <TelegramIcon />,
    brandColor: "#26A5E4",
  },
  {
    name: "main_advertiser.work_with_us.platforms.platform_names.instagram",
    count: "330+",
    label: "main_advertiser.work_with_us.platforms.bloggers",
    icon: <InstagramIcon />,
    brandColor: "#E1306C",
  },
  {
    name: "main_advertiser.work_with_us.platforms.platform_names.youtube",
    count: "22+",
    label: "main_advertiser.work_with_us.platforms.channels",
    icon: <YouTubeIcon />,
    brandColor: "#FF0000",
  },
];

// ─── Channel Notifications (for AnimatedList) ───────────────

export interface ChannelNotification {
  name: string;
  description: string;
  subscribers: number;
  icon: React.ReactNode;
}

export const CHANNELS: ChannelNotification[] = [
  {
    name: "Tech Insights",
    description: "Telegram",
    subscribers: 145000,
    icon: <TelegramIcon />,
  },
  {
    name: "Design Daily",
    description: "Instagram",
    subscribers: 89000,
    icon: <InstagramIcon />,
  },
  {
    name: "Auto Reviews",
    description: "YouTube",
    subscribers: 320000,
    icon: <YouTubeIcon />,
  },
  {
    name: "Crypto News",
    description: "Telegram",
    subscribers: 56000,
    icon: <TelegramIcon />,
  },
  {
    name: "Travel Vlog",
    description: "YouTube",
    subscribers: 1200000,
    icon: <YouTubeIcon />,
  },
  {
    name: "Food & Recipes",
    description: "Instagram",
    subscribers: 210000,
    icon: <InstagramIcon />,
  },
];
