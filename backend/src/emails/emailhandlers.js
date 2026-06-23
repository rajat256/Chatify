import { resendClient,sender } from "../models/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailtemplate.js";

export const sendWelcomeEmail = async (email,name,clientURL)=>{
    const {data,error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject:"Welcome to chatify",   
        html:createWelcomeEmailTemplate(name,clientURL)
    })

    if(error){
        if (error.statusCode === 403 && error.message?.includes("testing emails")) {
            console.warn(
                `Welcome email skipped for ${email}: Resend testing mode only allows sending to your own account email. Verify a domain in Resend to email other users.`
            );
            return null;
        }

        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }

    console.log("Welcome email sent successfully:", data);
}
