export enum profileData {
  type_legal = "type_legal",
  name = "name",
  address = "address",
  INN = "INN",
  checking_account = "checking_account",
  bank_name = "bank_name",
  bank_mfo = "bank_mfo",
  phone = "phone",
  email = "email",
  PNFL = "PNFL",
  registration_number = "registration_number",
  registration_date = "registration_date",
  transit_account = "transit_account",
  card_number = "card_number",
  card_date = "card_date",
}

export const selfEmployed = {
  title: "add_profile.basic_info.basic_info",
  parameters: [
    {
      label: "add_profile.basic_info.name",
      type: profileData.name,
      validate: { required: "add_profile.basic_info.name.error.required" },
    },
    {
      label: "add_profile.basic_info.registration_number",
      type: profileData.registration_number,
      validate: {
        required: "add_profile.basic_info.registration_number.error.required",
      },
    },
    {
      label: "add_profile.basic_info.registration_date",
      type: profileData.registration_date,
      validate: {
        required: "add_profile.basic_info.registration_date.error.required",
      },
    },
    {
      label: "add_profile.basic_info.PNFL",
      type: profileData.PNFL,
      validate: { required: "add_profile.basic_info.PNFL.error.required" },
    },
  ],
};

export const entity = {
  title: "add_profile.basic_info.basic_info",
  parameters: [
    {
      label: "add_profile.basic_info.entity",
      type: profileData.name,
      validate: { required: "add_profile.basic_info.entity.error.required" },
    },
    {
      label: "add_profile.basic_info.address",
      type: profileData.registration_date,
      validate: {
        required: "add_profile.basic_info.registration_date.error.required",
      },
    },
    {
      label: "add_profile.basic_info.INN",
      type: profileData.INN,
      validate: { required: "add_profile.basic_info.INN.error.required" },
    },
  ],
};

export const individual = {
  title: "add_profile.basic_info.basic_info",
  parameters: [
    {
      label: "add_profile.basic_info.individual",
      type: profileData.name,
      validate: {
        required: "add_profile.basic_info.individual.error.required",
      },
    },
    {
      label: "add_profile.basic_info.address",
      type: profileData.address,
      validate: {
        required: "add_profile.basic_info.registration_date.error.required",
      },
    },
    {
      label: "add_profile.basic_info.INN",
      type: profileData.INN,
      validate: { required: "add_profile.basic_info.INN.error.required" },
    },
  ],
};

export const bank = {
  title: "add_profile.bank_data.bank_data",
  parameters: [
    {
      label: "add_profile.bank_data.bank_name",
      type: profileData.bank_name,
      validate: { required: "add_profile.bank_data.bank_name.error.required" },
    },
    {
      label: "add_profile.bank_data.bank_mfo",
      type: profileData.bank_mfo,
      validate: { required: "add_profile.bank_data.bank_mfo.error.required" },
    },
    {
      label: "add_profile.bank_data.checking_account",
      type: profileData.checking_account,
      validate: {
        required: "add_profile.bank_data.checking_account.error.required",
      },
    },
  ],
};

export const bankCard = {
  title: "add_profile.bank_data.bank_data",
  parameters: [
    {
      label: "add_profile.bank_data.bank_name",
      type: profileData.bank_name,
      validate: { required: "add_profile.bank_data.bank_name.error.required" },
    },
    {
      label: "add_profile.bank_data.bank_mfo",
      type: profileData.bank_mfo,
      validate: {
        required: "add_profile.bank_data.bank_mfo.error.required",
      },
    },
    {
      label: "add_profile.bank_data.transit_account",
      type: profileData.transit_account,
      validate: {
        required: "add_profile.bank_data.transit_account.error.required",
      },
    },
    {
      label: "add_profile.bank_data.card_number",
      type: profileData.card_number,
      validate: {
        required: "add_profile.bank_data.card_number.error.required",
      },
    },
    {
      label: "add_profile.bank_data.card_date",
      type: profileData.card_date,
      validate: {
        required: "add_profile.bank_data.card_date.error.required",
      },
    },
  ],
};

export const contact = {
  title: "add_profile.contact.contact",
  parameters: [
    {
      label: "add_profile.contact.phone",
      type: profileData.phone,
      validate: { required: "add_profile.contact.phone.error.required" },
    },
    {
      label: "add_profile.contact.email",
      type: profileData.email,
      validate: { required: "add_profile.contact.email.error.required" },
    },
  ],
};

export const SelfEmployedData = [selfEmployed, bank, contact];

export const SelfEmployedCardData = [selfEmployed, bankCard, contact];

export const EntityData = [entity, bank, contact];

export const IndividualData = [individual, bank, contact];
