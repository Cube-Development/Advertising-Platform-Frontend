enum profileData{
    type_legal = 'type_legal',
    name = 'name',
    address = 'address',
    INN = 'INN',
    checking_account = 'checking_account',
    bank_name = 'bank_name',
    bank_mfo = 'bank_mfo',
    phone = 'phone',
    email = 'email',
    PNFL = 'PNFL',
    registration_number = 'registration_number',
    registration_date = 'registration_date',
    transit_account = 'transit_account',
    card_number = 'card_number',
    card_date_year = 'card_date_year',
    card_date_month = 'card_date_month',
} 



export const entityData = {
    title: "add_profile.basic_info.basic_info",
    parametr: [
    {data: "add_profile.basic_info.FIO", type: profileData.name},  
    {data: "add_profile.basic_info.registration_number", type: profileData.registration_number},  
]}

export const selfEmployed = {
    title: "add_profile.basic_info.basic_info",
    parametr: [
        {data: "add_profile.basic_info.name", type: profileData.name},  
        {data: "add_profile.basic_info.registration_number", type: profileData.registration_number},  
        {data: "add_profile.basic_info.registration_date", type: profileData.registration_date},  
        {data: "add_profile.basic_info.PNFL", type: profileData.PNFL},  
]}


export const bank = {
    title: "add_profile.bank_data.bank_data",
    parametr: [
        {data: "add_profile.bank_data.bank_name", type: profileData.bank_name},  
        {data: "add_profile.bank_data.bank_mfo", type: profileData.bank_mfo},  
        {data: "add_profile.bank_data.checking_account", type: profileData.checking_account},  
]}

export const contact = {
    title: "add_profile.contact.contact",
    parametr: [
        {data: "add_profile.contact.phone", type: profileData.phone},  
        {data: "add_profile.contact.email", type: profileData.email},  
    ]
}


export const SelfEmployedData = [
    selfEmployed,
    bank,
    contact
]