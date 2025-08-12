import { Badge, Button, Card, CardContent, Slider } from "@shared/ui";
import { DollarSign, TrendingUp, Users } from "lucide-react";
import { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { ParameterBlock } from ".";
import {
  calculateProfit,
  CATEGORIES,
  FORMATS,
  IParameterOption,
  IProfitCalculator,
  PLATFORMS,
  POSTS_COUNT,
} from "../model";
import { AddChannel } from "@features/channel";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
import { ENUM_PATHS } from "@shared/routing";
import { addChannelQueries } from "@entities/channel";

function formatSubscribers(value: number) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}М`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}К`;
  }
  return value.toString();
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const ProfitCalculator: FC = () => {
  const startFormats = FORMATS?.filter(
    (f) => f.platformId === PLATFORMS[0]?.id,
  );
  const { watch, setValue } = useForm<IProfitCalculator>({
    defaultValues: {
      category: CATEGORIES[0],
      platform: PLATFORMS[0],
      format: startFormats[0],
      subscribers: 1000,
      posts_count: POSTS_COUNT[0],
    },
  });

  const formState = watch();

  const currentFormats = useMemo(() => {
    return FORMATS?.filter((f) => f.platformId === formState.platform?.id);
  }, [formState.platform?.id]);

  useEffect(() => {
    if (formState.platform) {
      setValue("format", currentFormats[0]);
    }
  }, [formState.platform]);

  // Динамический шаг для слайдера
  const sliderStep = useMemo(() => {
    const value = formState.subscribers;
    if (value < 10000) return 1000;
    if (value < 100000) return 5000;
    if (value < 1000000) return 10000;
    return 50000;
  }, [formState.subscribers]);

  const { postPrice, totalPrice } = calculateProfit(
    formState?.subscribers,
    formState?.category?.multiplier,
    formState?.platform?.multiplier,
    formState?.format?.multiplier,
    formState?.posts_count?.count || 1,
  );

  console.log(formState);
  return (
    <Card className="overflow-hidden border-orange-500 frame">
      <CardContent className="!p-0">
        <div className="grid grid-cols-1 gap-8">
          {/* Левая колонка - настройки */}
          <div className="grid gap-3 md:grid-cols-2">
            <ParameterBlock
              title="Категория"
              onChange={(value: IParameterOption) =>
                setValue("category", value)
              }
              options={CATEGORIES}
              defaultValue={[formState.category?.id]}
            />
            <ParameterBlock
              title="Платформа"
              onChange={(value: IParameterOption) =>
                setValue("platform", value)
              }
              options={PLATFORMS}
              defaultValue={[formState.platform?.id]}
            />
            <ParameterBlock
              title="Формат размещения"
              onChange={(value: IParameterOption) => setValue("format", value)}
              options={currentFormats}
              defaultValue={[formState.format?.id]}
            />
            <ParameterBlock
              title=" Количество постов в месяц"
              onChange={(value: IParameterOption) =>
                setValue("posts_count", value)
              }
              options={POSTS_COUNT}
              defaultValue={[formState.posts_count?.id]}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-orange-500 lg:text-sm">
                Количество подписчиков
              </label>
              <Badge
                variant="secondary"
                className="px-3 py-1 text-base  grid-cols-[max-content,1fr] grid gap-1"
              >
                <Users className="w-4 h-4 " />
                {formatSubscribers(formState.subscribers)}
              </Badge>
            </div>
            <div className="px-2">
              <Slider
                value={[formState.subscribers]}
                onValueChange={(value) => setValue("subscribers", value?.[0])}
                min={1000}
                max={5000000}
                step={sliderStep}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>1К</span>
                <span>5М</span>
              </div>
            </div>
          </div>

          {/* Правая колонка - результат */}
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 lg:text-lg">Доход в месяц</p>
              <div className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-6xl">
                {formatCurrency(totalPrice)}
              </div>
            </div>

            <AddChannel
              path={buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
                [queryParamKeys.addChannel]: addChannelQueries.main,
              })}
            />

            {/* Индикаторы */}
            <div className="grid w-full max-w-sm grid-cols-2 gap-2 text-sm lg:gap-4">
              <div className="p-1 rounded-lg bg-gray-50 lg:p-3">
                <div className="flex items-center justify-center gap-1 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <p className="text-xs lg:text-md">За пост</p>
                </div>
                <div className="font-semibold">{formatCurrency(postPrice)}</div>
              </div>
              <div className="p-1 rounded-lg bg-gray-50 lg:p-3">
                <div className="flex items-center justify-center gap-1 text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <p className="text-xs lg:text-md">CPM</p>
                </div>
                <div className="font-semibold">
                  {formatCurrency(
                    Math.round(postPrice / (formState.subscribers / 1000)),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
