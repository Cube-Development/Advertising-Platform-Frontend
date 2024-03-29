import { profileData } from "@shared/config/profileData";
import { IProfileData } from "@shared/types/profile";

export function getInputLegalType(inputType: keyof IProfileData): string {
  switch (inputType) {
    case profileData.type_legal:
    case profileData.INN:
    case profileData.bank_mfo:
    case profileData.PNFL:
    case profileData.registration_number:
    case profileData.card_number:
    case profileData.card_date:
      return "number";
    case profileData.name:
    case profileData.address:
    case profileData.checking_account:
    case profileData.bank_name:
    case profileData.registration_date:
    case profileData.transit_account:
      return "text";
    case profileData.email:
      return "email";
    case profileData.phone:
      return "tel";
    default:
      return "text";
  }
}
