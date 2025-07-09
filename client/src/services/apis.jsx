

const BASE_URL = import.meta.env.VITE_BASE_URL;


// Auth Apis
export const authApis = {
    SENDOTP_API : BASE_URL + "/auth/sendOtp",
    LOGIN_API : BASE_URL + "/auth/login",
    SIGNUP_API : BASE_URL + "/auth/signup",
}


// USER APIS
export const userApis = {
    GET_USER_PROFILE_API : BASE_URL + "/user/profile",
    UPDATE_PROFILE_API : BASE_URL + "/user/updateProfileImage",
    DELETE_USER_API : BASE_URL + "/user/deleteAccount",
    LOGOUT_API : BASE_URL + "/user/logout",
    GET_USER_API : BASE_URL + "/user/getUser",
    REMOVE_LINKED_EMAIL_API : BASE_URL + "/user/remove-email"

}

// Gmail Apis
export const gmailApis = {
    CONNECT_GMAIL_API : BASE_URL + "/integrations/gmail/connect",
    GMAIL_CALLBACK_API : BASE_URL + "/integrations/gmail/callback",
}


// Email Apis
export const emailApis = {
    FETCH_GMAIL_INBOX_API : BASE_URL + "/integrations/gmail/emails",
    ADD_NEW_EMAIL_ACCOUNT_API : BASE_URL + "/integrations/gmail/add",
    MARK_EMAIL_AS_READ_API : BASE_URL + "/integrations/gmail/mark-read"
}
