module.exports = {
  "messages": {
    "e404": "page not found",
    "e401": "authorization failed"
  },
  "defaultError": {
    "name": "somethingWentWrong",
    "message": "Something went wrong please try again later",
    "status": 500
  },
  "userNotExists": {
    "name": "UserNotExists",
    "message": "User with such id not exists",
    "status": 400
  },
  "userExists": {
    "name": "UserExists",
    "message": "User with email address already exists",
    "status": 409
  },
  "jwtNotExists": {
    "name": "jwtNotExists",
    "message": "jwt does not exists",
    "status": 401
  },
  "jsonWebTokenError": {
    "name": "JsonWebTokenError",
    "message": "jwt  is invalid",
    "status": 401
  },
  "tokenExpiredError": {
    "name": "TokenExpiredError",
    "message": "token is expired",
    "status": 401
  },
  "userNotFound": {
    "name": "userNotFound",
    "message": "User is not found",
    "status": 400
  },
  "emailOrPasswordNotFound": {
    "name": "emailOrPasswordNotFound",
    "message": "Invalid login or password",
    "status": 403
  },
  "emailDuplicationError": {
    "name": "emailDuplicationError",
    "message": "The email address is already registered",
    "status": 400
  },
  "nothingToUpdate": {
    "name": "NothingToUpdate",
    "message": "no data send for update",
    "status": 400
  },
  "wrongRefreshToken": {
    "name": "wrongRefreshToken",
    "message": "Refresh token not found",
    "status": 400
  },
  "invalidRefreshToken": {
    "name": "invalidRefreshToken",
    "message": "Refresh token is invalid",
    "status": 401
  },
  "bearerInvalid": {
    "name": "bearerInvalid",
    "message": "bearer is invalid",
    "status": 401
  },
  "accountIsAlreadyActivated": {
    "name": "accountIsAlreadyActivated",
    "message": "User account is already activated",
    "status": 400
  },
  "expiredToken": {
    "name": "expiredToken",
    "message": "User activation token is expired",
    "status": 400
  },
  "invalidToken": {
    "name": "invalidToken",
    "message": "User activation token is invalid",
    "status": 400
  },
  "fieldAlreadyExists": {
    "name": "FieldAlreadyExists",
    "message": "Field already exists",
    "status": 400
  },
  "contactNotFound": {
    "name": "contactNotFound",
    "message": "Contact is not found",
    "status": 400
  },
  "csvNotFound": {
    "name": "csvNotFound",
    "message": "Csv is not found",
    "status": 400
  },
  "csvValidationError": {
    "name": "csvValidationError",
    "message": "File type must be csv",
    "status": 400
  },
  "imageTypeValidationError": {
    "name": "imageTypeValidationError",
    "message": "File type must be jpg, jpeg or png",
    "status": 400
  },
  "imageSizeValidationError": {
    "name": "imageSizeValidationError",
    "message": "File Size must be less than 5mb",
    "status": 400
  },
  "getActivationLinkError": {
    "name": "getActivationLinkError",
    "message": "You can require a new activation link after 60 sec",
    "status": 400
  },
  "fieldDuplicationError": {
    "name": "fieldDuplicationError",
    "message": "This fields has already been registered",
    "status": 400
  },
  "contactFieldIsRequired": {
    "name": "contactFieldIsRequired",
    "message": "Please fill all the required fields",
    "status": 400
  },
  "actionNotFound": {
    "name": "actionNotFound",
    "message": "action is not found",
    "status": 400
  },
  "chatNotFound": {
    "name": "chatNotFound",
    "message": "Chat is not found",
    "status": 400
  },
  "companyNotFound": {
    "name": "companyNotFound",
    "message": "Company is not found",
    "status": 400
  },
  "achievementNotFound": {
    "name": "achievementNotFound",
    "message": "Achievement is not found",
    "status": 400
  },
  "achievementPermissionReviewDenied": {
    "name": "achievementPermissionReviewDenied",
    "message": "You have not permission to review the achievement",
    "status": 400
  },
  "achievementAlreadyCompleted": {
    "name": "achievementAlreadyCompleted",
    "message": "You completed this achievement already",
    "status": 400
  },
  "canNotSendConnectionRequest": {
    "name": "canNotSendConnectionRequest",
    "message": "You can't send connection request ",
    "status": 400
  },
  "canNotSendInvitationRequest": {
    "name": "canNotSendInvitationRequest",
    "message": "You can't send invitation request ",
    "status": 400
  },
  "canNotSendInvitation": {
    "name": "canNotSendInvitation",
    "message": "You can't send invitation",
    "status": 400
  },
  "userWithProvidedEmailDoseNotExist": {
    "name": "userWithProvidedEmailDoseNotExist",
    "message": "The user with the specified email address does not exist",
    "status": 400
  },
  "invalidVerifyCode": {
    "name": "invalidVerifyCode",
    "message": "Verify code  is invalid",
    "status": 400
  },
  "expiredVerifyCode": {
    "name": "expiredVerifyCode",
    "message": "Password reset code is expired",
    "status": 400
  },
  "wrongPasswordError": {
    "name": "wrongPasswordError",
    "message": "Wrong password",
    "status": 400
  },
  "reminderNotFound": {
    "name": "reminderNotFound",
    "message": "Reminder is not found",
    "status": 400
  },
  "thereIsNothingToUpdate": {
    "name": "thereIsNothingToUpdateError",
    "message": "There is nothing to update",
    "status": 400
  },
  "commentNotFound": {
    "name": "commentNotFound",
    "message": "Comment is not found",
    "status": 400
  },
};
