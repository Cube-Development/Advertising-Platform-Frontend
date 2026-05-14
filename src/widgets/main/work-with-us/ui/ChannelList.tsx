import React, { forwardRef } from "react";
import { UsersGroupRounded } from "@solar-icons/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  cn,
  AnimatedList,
  Button,
} from "@shared/ui";
import { CHANNELS, type ChannelNotification } from "../model/mock-data";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ENUM_PATHS } from "@shared/routing";

const NotificationItem = ({
  name,
  description,
  subscribers,
  icon,
  id,
}: ChannelNotification) => {
  return (
    <Link
      to={ENUM_PATHS.CHANNEL.replace(":id", id)}
      className="w-full"
      target="_blank"
    >
      <figure
        className={cn(
          "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-3",
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        )}
      >
        <div className="grid grid-cols-[40px_1fr] items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-2xl bg-gray-50/80">
            <span className="text-lg flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6">
              {icon}
            </span>
          </div>

          <div className="grid gap-1 overflow-hidden">
            <div className="text-sm font-medium text-gray-900 truncate">
              {name}
            </div>

            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-1.5 text-xs font-normal text-gray-500">
              <span>{description}</span>

              <span>·</span>

              <div className="flex items-center gap-1 whitespace-nowrap">
                <UsersGroupRounded weight={"Outline"} className="w-3 h-3" />
                <span>
                  {new Intl.NumberFormat("ru-RU", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(subscribers)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </Link>
  );
};

export const ChannelList = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Card>
>(({ className, ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <Card
      ref={ref}
      className={cn(
        " flex flex-col border-none overflow-hidden z-10 rounded-2xl",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        className,
      )}
      {...props}
    >
      <CardHeader className="pb-0">
        <CardTitle className="text-base lg:text-lg font-bold text-center text-gray-800">
          {t("main_advertiser.work_with_us.channelList.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex-1 p-0">
        <div className="relative flex h-[320px] w-full flex-col overflow-hidden p-4">
          <AnimatedList delay={1500}>
            {CHANNELS.map((item, idx) => (
              <NotificationItem {...item} key={idx} />
            ))}
          </AnimatedList>

          <div className="absolute inset-x-0 bottom-0 pointer-events-none h-1/4 bg-gradient-to-t from-white/90"></div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Link to={ENUM_PATHS.CATALOG} className="w-full">
          <Button variant={"primary"} size={"xl"} className="w-full">
            {t("main_advertiser.work_with_us.channelList.buttonText")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
});

ChannelList.displayName = "ChannelList";
