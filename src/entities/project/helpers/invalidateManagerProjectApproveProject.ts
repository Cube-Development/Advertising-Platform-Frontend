// import { AppDispatch } from "@app/providers/store";
// import { dateSortingTypes } from "@entities/platform";
// import { MANAGER_ORDERS, VIEWS_MANAGER } from "@shared/api";
// import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
// import { getManagerProjectsCardReq, managerProjectsAPI } from "../api";
// import { managerProjectStatusFilter, projectStatus } from "../config";
// import { IManagerProjects } from "../types";
// import { ENUM_ROLES } from "@entities/user";

// interface Props {
//   dispatch: AppDispatch;
//   language: ILanguage;
//   project_id: string;
//   role: ENUM_ROLES
// }

// export const invalidateManagerProjectApproveProject = async ({
//   dispatch,
//   language =  USER_LANGUAGES_LIST[0],
//   project_id,
//   role
// }: Props) => {

//   if (role !== ENUM_ROLES.MANAGER) return;

//   try {

//     const params = {
//         language: language?.id,
//         date_sort: dateSortingTypes.decrease,
//         status: managerProjectStatusFilter.request_approve,
//     };

//     // 1. Обновляем общий кэш, сравнивая первые N элементов
//     dispatch(
//         managerProjectsAPI.util.updateQueryData(
//         "getManagerProjects",
//         params as getManagerProjectsCardReq,
//         (draft: IManagerProjects) => {
//           if (!draft?.projects) return;

//           draft.projects = draft.projects.map((el) => {
//             if (el.project_id === project_id) {
//               el.is_request_approve = projectStatus.approved
//             }
//             return el;
//         });

//         },
//         ),
//     );

//     // 2. Обновляем кэш кружочков и связанных ордеров
//     dispatch(managerProjectsAPI.util.invalidateTags([MANAGER_ORDERS, VIEWS_MANAGER]));
//     } catch (err) {
//     console.error("ERROR: INVALIDATE MANAGER PROJECT APPROVE PROJECT - ", err);
//     }
// };
