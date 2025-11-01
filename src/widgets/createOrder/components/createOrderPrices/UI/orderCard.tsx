import { FC } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { OrderPrice } from "../components";
import { ICreatePostForm, IOrderPrice } from "@entities/project";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";

interface OrderCardProps {
  order: IOrderPrice;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
}

export const OrderCard: FC<OrderCardProps> = ({
  order,
  setValue,
  getValues,
}) => {
  const onChangePrice = (price: number) => {
    const prices = getValues("prices") || [];
    const newPrices = prices?.map((item) => {
      if (item?.order_id === order?.order_id) {
        return {
          ...item,
          selected_format: {
            ...item?.selected_format,
            price: price,
          },
        };
      }
      return item;
    });
    setValue("prices", newPrices);
  };

  return (
    <div className="bg-[var(--Personal-colors-White)] rounded-[14px] p-2.5 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.16)] grid lg:grid-cols-[1fr_5px_1fr] grid-cols-1 lg:grid-rows-1 grid-rows-[1fr_1fr] gap-4 items-center justify-center">
      <div className="grid grid-cols-[auto_1fr] md:gap-4 gap-2 items-start justify-center">
        <div className="rounded-full overflow-hidden md:size-[60px] size-[50px]">
          <img
            src={order.avatar}
            alt={order?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="md:text-base text-sm font-semibold text-[var(--Personal-colors-main)] truncate">
            {order?.name}
          </p>
          <p className="md:text-sm text-xs font-medium text-gray-500 truncate">
            {order?.category}
          </p>
          <Link
            to={order?.url}
            target="_blank"
            className="flex items-start gap-1 text-[var(--URL)] md:text-sm text-xs font-normal break-words break-all"
          >
            <SquareArrowOutUpRight className="size-3 md:mt-1 mt-0.5" />{" "}
            {order?.url}
          </Link>
        </div>
      </div>
      <div className="lg:block hidden h-full w-[2px] bg-[var(--Card-separator)]"></div>
      <div className="grid grid-cols-[1fr_1fr] md:gap-4 gap-2 items-start justify-center">
        <div>
          <p className="text-black font-semibold md:text-base text-sm">
            Формат:
          </p>
          <p className="text-[var(--Sub-text)] font-medium md:text-sm text-xs tracking-wide">
            {order.selected_format?.format_name?.big}
          </p>
        </div>
        <OrderPrice
          order_price={order?.selected_format?.price || 0}
          price={order?.selected_format?.price || 0}
          setPrice={(price) => onChangePrice(price)}
        />
      </div>
    </div>
  );
};
