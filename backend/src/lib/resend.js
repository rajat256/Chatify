import {Resend} from "resend";
import "dotenv/config";


const resendApiKey = process.env.RESEND_API_KEY || process.env.Resend_API_KEY;
const senderEmail = process.env.EMAIL_FROM || process.env.Resend_Sender_Email;
const senderName = process.env.EMAIL_FROM_NAME || process.env.Resend_Sender_Name || "Chatify";

if (!senderEmail) {
    throw new Error("Missing email sender address. Set EMAIL_FROM in backend/.env.");
}

export const resendClient = new Resend(resendApiKey);

export const sender = {
    email: senderEmail.trim(),
    name: senderName.trim(),
};
