import { IAdminChannelData } from "@entities/admin-panel";
import { channelParameterData } from "@entities/channel";
import { FormatPrice, SelectPrice } from "@features/channel";
import { SelectDescription, SelectOptions, SelectSex } from "@features/other";
import { AccordionContent, AccordionItem } from "@shared/ui";
import { FC, MutableRefObject } from "react";
import { useChannelData } from "../model";
import { useCheckUpdate, useSubcardData } from "../model";
import { CardButtons } from "./card-buttons";
import { CardContent } from "./card-content";
import { CardTrigger } from "./card-trigger";
import styles from "./styles.module.scss";

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
      className={styles.wrapper}
      ref={(el) => (accordionRefs.current[index] = el)}
    >
      <CardTrigger
        card={card}
        isLoading={isLoading}
        isOpen={isSubcardOpen}
        onClick={() => setSubcardOpen(!isSubcardOpen)}
      />
      <AccordionContent className={styles.content}>
        {!!channel && (
          <>
            <CardContent channel={channel} />
            <SelectDescription
              onChange={setValue}
              type={channelParameterData.description}
              title={"add_platform.description.description.title"}
              text={"add_platform.description.description.text"}
              placeholder={"add_platform.description.description.default_value"}
              defaultValues={formState?.description}
            />
            <div className={styles.parameters}>
              <div className={styles.block}>
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
              </div>
              <div className={styles.block}>
                <SelectOptions
                  onChangeOption={setValue}
                  options={ages?.contents || []}
                  typeParameter={channelParameterData.age}
                  textData={"add_platform.description.age"}
                  defaultValue={formState.age}
                  isRow={true}
                />
              </div>

              <div className={styles.block}>
                <SelectOptions
                  onChangeOption={setValue}
                  options={languages?.contents || []}
                  typeParameter={channelParameterData.language}
                  textData={"add_platform.description.languages"}
                  defaultValue={formState.language}
                  isRow={true}
                />
              </div>
              <div className={styles.block}>
                <SelectOptions
                  onChangeOption={setValue}
                  options={regions?.contents || []}
                  typeParameter={channelParameterData.region}
                  textData={"add_platform.description.region"}
                  defaultValue={formState.region}
                  isRow={true}
                />
              </div>
              <div className={styles.block}>
                <SelectSex
                  onChange={setValue}
                  typeMan={channelParameterData.male}
                  typeWoman={channelParameterData.female}
                  title={"add_platform.description.sex.title"}
                  defaultValues={formState.male}
                  isRow={true}
                />
              </div>
              <div className={styles.block}>
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
