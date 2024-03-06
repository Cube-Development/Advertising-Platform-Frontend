enum profileData {
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
  card_date_year = "card_date_year",
  card_date_month = "card_date_month",
}

export const selfEmployed = {
  title: "add_profile.basic_info.basic_info",
  parameters: [
    { data: "add_profile.basic_info.name", type: profileData.name },
    {
      data: "add_profile.basic_info.registration_number",
      type: profileData.registration_number,
    },
    {
      data: "add_profile.basic_info.registration_date",
      type: profileData.registration_date,
    },
    { data: "add_profile.basic_info.PNFL", type: profileData.PNFL },
  ],
};

export const entity = {
  title: "add_profile.basic_info.basic_info",
  parameters: [
    { data: "add_profile.basic_info.entity", type: profileData.name },
    {
      data: "add_profile.basic_info.address",
      type: profileData.registration_date,
    },
    { data: "add_profile.basic_info.INN", type: profileData.INN },
  ],
};

export const individual = {
  title: "add_profile.basic_info.basic_info",
  parameters: [
    { data: "add_profile.basic_info.individual", type: profileData.name },
    {
      data: "add_profile.basic_info.address",
      type: profileData.registration_date,
    },
    { data: "add_profile.basic_info.INN", type: profileData.INN },
  ],
};

export const bank = {
  title: "add_profile.bank_data.bank_data",
  parameters: [
    { data: "add_profile.bank_data.bank_name", type: profileData.bank_name },
    { data: "add_profile.bank_data.bank_mfo", type: profileData.bank_mfo },
    {
      data: "add_profile.bank_data.checking_account",
      type: profileData.checking_account,
    },
  ],
};

export const bankCard = {
  title: "add_profile.bank_data.bank_data",
  parameters: [
    { data: "add_profile.bank_data.bank_name", type: profileData.bank_name },
    { data: "add_profile.bank_data.bank_mfo", type: profileData.bank_mfo },
    {
      data: "add_profile.bank_data.transit_account",
      type: profileData.transit_account,
    },
    { data: "add_profile.bank_data.card_data", type: profileData.card_number },
  ],
};

export const contact = {
  title: "add_profile.contact.contact",
  parameters: [
    { data: "add_profile.contact.phone", type: profileData.phone },
    { data: "add_profile.contact.email", type: profileData.email },
  ],
};

export const SelfEmployedData = [selfEmployed, bank, contact];

export const SelfEmployedCardData = [selfEmployed, bankCard, contact];

export const EntityData = [entity, bank, contact];

export const IndividualData = [individual, bank, contact];
