import { transport } from "../config/nodemailer";
import path from "path";
import expressHandlebars from "nodemailer-express-handlebars";

type EmailType = {
  name: string;
  email: string;
  token: string;
};

transport.use("compile", expressHandlebars({
  viewEngine: {
    extname: ".hbs",
    partialsDir: path.resolve("./src/emails/partials"),
    layoutsDir: path.resolve("./src/emails/templates"),
  },
  viewPath: path.resolve("./src/emails/templates"),
  extName: ".hbs",
}));

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "WalleTrack <admin@walletrack.com>",
      to: user.email,
      subject: "Confirma tu cuenta en WalleTrack",
      template: "confirmation",
      context: {
        name: user.name,
        token: user.token,
      },
    } as any);

    console.log("Confirmation email sent: ", (email as any).messageId);
  };

  static sendPasswordResetToken = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "WalleTrack <admin@walletrack.com>",
      to: user.email,
      subject: "Restablece tu contraseña en WalleTrack",
      template: "password-reset",
      context: {
        name: user.name,
        token: user.token,
      },
    } as any);

    console.log("Password reset email sent: ", (email as any).messageId);
  };
}
