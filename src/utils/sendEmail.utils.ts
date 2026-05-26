import ENV_CONFIG from "../config/env.config";
import transporter from "../config/nodemailer.config";

const sendEmail = async () => {
  try {
    await transporter.sendMail({
      to: "gymanagementsystem@gmail.com",
      from: `Project Ecommerce <${ENV_CONFIG.smtp_user}>`,
      subject: "Welcome to Ecom",
      text: "Login Successful. Welcome to Ecom",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default sendEmail;
