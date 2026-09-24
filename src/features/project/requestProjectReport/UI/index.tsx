import {
  useGetProjectReportsQuery,

  useRequestCompletedReportMutation,
} from "@entities/project";

import { MyButton, useToast } from "@shared/ui";

import { Download, Loader } from "lucide-react";

import { FC, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";



const buttonClassName =

  "md:!text-sm !text-xs flex items-center justify-center w-full p-3 !text-start !h-auto md:shadow-none shadow-xl !font-medium";



interface RequestProjectReportProps {

  project_id: string;

}



export const RequestProjectReport: FC<RequestProjectReportProps> = ({

  project_id,

}) => {

  const { t } = useTranslation();

  const { toast } = useToast();

  const [isWaiting, setIsWaiting] = useState(false);

  const [requestCompletedReport, { isLoading }] =

    useRequestCompletedReportMutation();



  const { data } = useGetProjectReportsQuery(

    { project_id },

    {

      skip: !project_id || !isWaiting,

      pollingInterval: isWaiting ? 4000 : 0,

    },

  );



  useEffect(() => {

    if (!isWaiting || !data?.reports?.length) return;



    setIsWaiting(false);

  }, [data?.reports, isWaiting]);



  const handleRequest = async () => {

    try {

      await requestCompletedReport({ project_id }).unwrap();

      setIsWaiting(true);

    } catch {

      toast({

        variant: "error",

        title: t("order_btn.reportRequestError"),

      });

    }

  };



  const isGenerating = isLoading || isWaiting;



  return (

    <MyButton

      type="button"

      buttons_type="button__blue"

      className={buttonClassName}

      onClick={handleRequest}

      disabled={isGenerating || !project_id}

    >

      {isGenerating ? (

        <>

          <Loader

            className="animate-spin"

            stroke="#fff"

            width={22}

            height={22}

          />

          {t("order_btn.reportGenerating")}

        </>

      ) : (

        <>

          <Download className="min-w-[20px] size-5 stroke-[2px]" />

          {t("order_btn.requestReport")}

        </>

      )}

    </MyButton>

  );

};


