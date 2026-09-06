import { IAdminChannelData } from "@entities/admin-panel";
import { channelParameterData } from "@entities/channel";
import { FormatPrice, SelectPrice } from "@features/channel";
import { SelectDescription, SelectOptions, SelectSex } from "@features/other";
import { AccordionContent, AccordionItem } from "@shared/ui";
import { FC, MutableRefObject } from "react";
import { Link } from "react-router-dom";
import { useChannelData } from "../model";
import { useCheckUpdate, useSubcardData } from "../model";
import { CardButtons } from "./card-buttons";
import { CardContent } from "./card-content";
import { CardTrigger } from "./card-trigger";

interface ChannelCardProps {
  card: IAdminChannelData;
  accordionRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  index: number;
}

export const ChannelCard: FC<ChannelCardProps> = ({
  card,
  accordionRefs,
  index,
}) => {
  const {
    setValue,
    formState,
    categories,
    regions,
    languages,
    ages,
    formats,
    reset,
  } = useChannelData({ card });

  const { isSubcardOpen, setSubcardOpen, channel, isLoading, startData } =
    useSubcardData({
      card,
      reset,
    });

  const { isUpdate } = useCheckUpdate(formState, startData);

  return (
    <AccordionItem
      value={`item-adminChannel-${card?.channel?.id}`}
      className="overflow-hidden rounded-lg border bg-card shadow-sm"
      ref={(el) => (accordionRefs.current[index] = el)}
    >
      <CardTrigger
        card={card}
        isLoading={isLoading}
        isOpen={isSubcardOpen}
        onClick={() => setSubcardOpen(!isSubcardOpen)}
      />
      <AccordionContent className="grid grid-flow-row gap-4 px-4 pb-4 sm:px-6">
        {!!channel && (
          <>
            {channel?.url && (
              <Link
                to={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-sky-50 px-4 py-2 text-start text-sm font-medium text-[var(--URL)] transition-all duration-300 hover:scale-[1.01] hover:bg-sky-100"
              >
                {channel.url}
              </Link>
            )}
            <CardContent channel={channel} />
            <SelectDescription
              onChange={setValue}
              type={channelParameterData.description}
              title={"add_platform.description.description.title"}
              text={"add_platform.description.description.text"}
              placeholder={"add_platform.description.description.default_value"}
              defaultValues={formState?.description}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectOptions
                onChangeOption={setValue}
                options={categories?.contents || []}
                typeParameter={channelParameterData.category}
                textData={"add_platform.description.category"}
                isRow={true}
                defaultValue={[formState.category]}
                single={true}
                searchable={true}
              />
              <SelectOptions
                onChangeOption={setValue}
                options={ages?.contents || []}
                typeParameter={channelParameterData.age}
                textData={"add_platform.description.age"}
                defaultValue={formState.age}
                isRow={true}
              />
              <SelectOptions
                onChangeOption={setValue}
                options={languages?.contents || []}
                typeParameter={channelParameterData.language}
                textData={"add_platform.description.languages"}
                defaultValue={formState.language}
                isRow={true}
              />
              <SelectOptions
                onChangeOption={setValue}
                options={regions?.contents || []}
                typeParameter={channelParameterData.region}
                textData={"add_platform.description.region"}
                defaultValue={formState.region}
                isRow={true}
              />
              <div className="md:col-span-2">
                <SelectSex
                  onChange={setValue}
                  typeMan={channelParameterData.male}
                  typeWoman={channelParameterData.female}
                  title={"add_platform.description.sex.title"}
                  defaultValues={formState.male}
                  isRow={true}
                />
              </div>
              <div className="md:col-span-2">
                <SelectPrice
                  onChange={setValue}
                  formState={formState}
                  formats={formats}
                  AccommPrice={FormatPrice}
                  type={channelParameterData.format}
                  title={"add_platform.description.price.title"}
                  text={"add_platform.description.price.text"}
                  info={"add_platform.description.price.info"}
                  defaultValues={formState.format}
                />
              </div>
            </div>
            <CardButtons
              card={card}
              formState={formState}
              isEdited={isUpdate}
            />
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
