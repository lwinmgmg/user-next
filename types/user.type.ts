export type UserData = {
    "code": string,
    "username": string,
    "is_authenticator": boolean,
    "is_2fa": boolean,
    "partner_data": {
        "first_name": string,
        "last_name": string,
        "email": string,
        "is_email_confirmed": boolean,
        "phone": string,
        "is_phone_confirmed": boolean,
        "code": string
    }
}
