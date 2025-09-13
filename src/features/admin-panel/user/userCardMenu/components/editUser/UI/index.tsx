// import { IAdminUserInfo, IAdminUserData } from "@entities/admin";
// import { CancelIcon2 } from "@shared/assets";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogTrigger,
//   MyButton,
// } from "@shared/ui";
// import { FC, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import styles from "./styles.module.scss";

// interface EditUserProps {
//   card: IAdminUserData;
//   UpdateBtn: FC<{ user: IAdminUserInfo }>;
//   isOpen?: boolean;
//   setDialogOpen?: (e: boolean) => void;
// }

// export const EditUser: FC<EditUserProps> = ({
//   card,
//   UpdateBtn,
//   isOpen,
//   setDialogOpen,
// }) => {
//   const { t } = useTranslation();
//   const { setValue, watch } = useForm<IAdminUserInfo>({
//     defaultValues: {
//       name: card?.name || "",
//       email: card?.email || "",
//       // phone: card?.phone || "",
//       // location: card?.location || "",
//       password: "",
//       // telegram: card?.telegram || "",
//     },
//   });
//   const formState = watch();

//   // const [dialogOpen, setDialogOpen] = useState(isOpen);

//   // useEffect(() => {
//   //   setDialogOpen(isOpen);
//   // }, [isOpen]);

//   return (
//     <AlertDialog open={isOpen} onOpenChange={setDialogOpen}>
//       {/* <AlertDialog> */}
//       {/* <AlertDialogTrigger asChild>
//         <span>{t("admin_panel.users.card.menu.edit")}</span>
//       </AlertDialogTrigger> */}
//       <AlertDialogContent className={styles.content}>
//         <div className={styles.top}>
//           <p>{t("admin_panel.users.card.menu.editing.title")}</p>
//           <div className={styles.close}>
//             <AlertDialogCancel>
//               <CancelIcon2 />
//             </AlertDialogCancel>
//           </div>
//         </div>
//         <div className={styles.bottom}>
//           <div className={styles.avatar}></div>
//           <div className={styles.info}>
//             <div className={styles.input__wrapper}>
//               <span>{t("admin_panel.users.card.menu.editing.username")}</span>
//               <input
//                 value={formState?.name}
//                 onChange={(e) => setValue("name", e.target.value)}
//               />
//             </div>
//             <div className={styles.input__wrapper}>
//               <span>{t("admin_panel.users.card.menu.editing.email")}</span>
//               <input
//                 value={formState?.email}
//                 onChange={(e) => setValue("email", e.target.value)}
//               />
//             </div>
//             <div className={styles.input__wrapper}>
//               <span>{t("admin_panel.users.card.menu.editing.phone")}</span>
//               <input
//                 value={formState?.phone}
//                 onChange={(e) => setValue("phone", e.target.value)}
//               />
//             </div>
//             <div className={styles.input__wrapper}>
//               <span>{t("admin_panel.users.card.menu.editing.location")}</span>
//               <input
//                 value={formState?.location}
//                 onChange={(e) => setValue("location", e.target.value)}
//               />
//             </div>
//             <div className={styles.input__wrapper}>
//               <span>{t("admin_panel.users.card.menu.editing.password")}</span>
//               <input
//                 value={formState?.password}
//                 onChange={(e) => setValue("password", e.target.value)}
//               />
//             </div>
//             <div className={styles.input__wrapper}>
//               <span>{t("admin_panel.users.card.menu.editing.telegram")}</span>
//               <input
//                 value={formState?.telegram}
//                 onChange={(e) => setValue("telegram", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className={styles.buttons}>
//             <AlertDialogCancel asChild>
//               <MyButton buttons_type="button__white">
//                 {t("admin_panel.users.card.menu.editing.buttons.cancel")}
//               </MyButton>
//             </AlertDialogCancel>
//             <UpdateBtn user={formState} />
//           </div>
//         </div>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
