import { PlatformIdentification } from "@widgets/platformIdentification";
import { PlatformInfo } from "@widgets/platformInfo";
import { PlatformTop } from "@widgets/platformTop";
import { FC } from "react";


export const AddPlatformPage: FC = () => {
  return (
    <>
      <PlatformTop />
      <PlatformIdentification />
      <PlatformInfo />
    </>
  );
};


// import {FC,  useState } from "react";
// import { useForm, SubmitHandler, useFieldArray, UseFormRegister } from 'react-hook-form';

// type Platform = 'instagram' | 'telegram' | 'youtube';

// interface FormData {
//   platform: Platform;
//   link: string;
// }


// export const AddPlatformPage: FC = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<FormData>();

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Выберите платформу:</label>
//         <div>
//           <button {...register('platform', { value: 'instagram' })}>Инстаграм</button>
//           <button {...register('platform', { value: 'telegram' })}>Телеграм</button>
//           <button {...register('platform', { value: 'youtube' })}>YouTube</button>
//         </div>
//       </div>

//       <div>
//         <label>Ссылка на площадку:</label>
//         <input {...register('link', { required: 'Это поле обязательно' })} />
//         {errors.link && <span>{errors.link.message}</span>}
//       </div>

//       <div>
//         <button type="submit">Подтвердить</button>
//       </div>
//     </form>
//   );
// };