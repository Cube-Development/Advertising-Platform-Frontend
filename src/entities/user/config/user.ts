export enum profileForm {
  id = "id",
  created = "created",
  current_password = "current_password",
  new_password = "new_password",
  accept_password = "accept_password",
  user_additional = "user_additional",
  user_events = "user_events",
}

export enum userForm {
  first_name = "first_name",
  surname = "surname",
  email = "email",
  phone = "phone",
  location = "location",
  language = "language",
}

export enum eventForm {
  system_events = "system_events",
  project_events = "project_events",
  promo_events = "promo_events",
}

export enum emailChangeForm {
  new_email = "new_email",
  password = "password",
  code = "code",
  isEmailChanged = "isEmailChanged",
  isDialogOpen = "isDialogOpen",
}
