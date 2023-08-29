import { EmailSubjects, EmailTemplate } from "src/enum/enum";
export interface IMailOptions {
    mail : string;
    subject : EmailSubjects;
    template : EmailTemplate;
    name : string;
    generatePassword : string;
    expireTime : number
}

export interface IUpdatePassword {
    temporaryPassword?: string | null;
    isVerified?: boolean;
    isForgotPassword?: boolean;
    attemptedCount?: number;
    expiredTime?: string | null;
    updatedBy?: number;
    userId?: number;
    blockedTime?: string | null;
}