import Mail from "nodemailer/lib/mailer";
import ENV_CONFIG from "../config/env.config";
import transporter from "../config/nodemailer.config";

type TEmailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: any[];
};

const sendEmail = async ({
  to,
  subject,
  text,
  html,
  cc,
  bcc,
  attachments,
}: TEmailOptions) => {
  try {
    const mailOptions: Mail.Options = {
      to: to,
      from: `Project Ecommerce <${ENV_CONFIG.smtp_user}>`,
      subject: subject,
      html: html,
    };
    if (text) {
      mailOptions["text"] = text;
    }
    if (cc) {
      mailOptions["cc"] = cc;
    }
    if (bcc) {
      mailOptions["bcc"] = bcc;
    }
    if (attachments) {
      mailOptions["attachments"] = attachments;
    }
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default sendEmail;
