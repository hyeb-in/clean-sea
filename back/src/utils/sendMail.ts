import nodemailer from "nodemailer";

const { MAIL_APP_USER: user, MAIL_APP_PASS: pass } = process.env;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export const mailSender = async (to: string, subject: string, text: string) => {
  try {
    const info = await transport.sendMail({
      from: user,
      to,
      subject,
      text,
    });

    console.log(info);
  } catch (error) {
    throw new Error(error);
  }
};
