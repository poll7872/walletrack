import { transport } from "../config/nodemailer";

type EmailType = {
  name: string;
  email: string;
  token: string;
};

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "WalleTrack <admin@walletrack.com>",
      to: user.email,
      subject: "Confirma tu cuenta en WalleTrack",
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirma tu cuenta en WalleTrack</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 0;
                    padding: 20px;
                    min-height: 100vh;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 40px 30px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 32px;
                    font-weight: 300;
                    letter-spacing: 2px;
                }
                .header .logo {
                    font-size: 48px;
                    margin-bottom: 10px;
                }
                .content {
                    padding: 40px 30px;
                    text-align: center;
                }
                .welcome-text {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 20px;
                    font-weight: 300;
                }
                .instructions {
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 30px;
                }
                .btn {
                    display: inline-block;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    padding: 15px 40px;
                    border-radius: 50px;
                    font-size: 18px;
                    font-weight: 500;
                    margin: 20px 0;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
                }
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
                }
                .token-box {
                    background: #f8f9fa;
                    border: 2px dashed #667eea;
                    border-radius: 10px;
                    padding: 20px;
                    margin: 30px 0;
                    text-align: center;
                }
                .token-label {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .token-code {
                    font-size: 28px;
                    font-weight: bold;
                    color: #667eea;
                    letter-spacing: 3px;
                    font-family: 'Courier New', monospace;
                }
                .footer {
                    background: #f8f9fa;
                    padding: 30px;
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                }
                .security-note {
                    background: #fff3cd;
                    border-left: 4px solid #ffc107;
                    padding: 15px;
                    margin: 20px 0;
                    text-align: left;
                    border-radius: 5px;
                }
                .security-note strong {
                    color: #856404;
                }
                @media (max-width: 600px) {
                    .container {
                        margin: 10px;
                        border-radius: 10px;
                    }
                    .header {
                        padding: 30px 20px;
                    }
                    .header h1 {
                        font-size: 28px;
                    }
                    .content {
                        padding: 30px 20px;
                    }
                    .btn {
                        padding: 12px 30px;
                        font-size: 16px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🚀</div>
                    <h1>WALLETRACK</h1>
                </div>
                <div class="content">
                    <h2 class="welcome-text">¡Bienvenido a WalleTrack, ${user.name}!</h2>
                    <p class="instructions">
                        Estamos emocionados de tenerte a bordo. Para comenzar a usar tu cuenta y acceder a todas nuestras funciones, 
                        solo necesitas confirmar tu dirección de correo electrónico.
                    </p>
                    
                    <a href="#" class="btn">Confirmar mi cuenta</a>
                    
                    <div class="security-note">
                        <strong>🔒 Nota de seguridad:</strong> Si no creaste esta cuenta, puedes ignorar este correo de forma segura.
                    </div>
                    
                    <div class="token-box">
                        <div class="token-label">Código de confirmación</div>
                        <div class="token-code">${user.token}</div>
                    </div>
                    
                    <p class="instructions">
                        También puedes usar el código de arriba para confirmar tu cuenta manualmente en la aplicación.
                    </p>
                </div>
                <div class="footer">
                    <p>Este enlace expirará en 24 horas por razones de seguridad.</p>
                    <p>© 2026 WalleTrack. Todos los derechos reservados.</p>
                    <p>Si tienes problemas, contáctanos en soporte@walletrack.com</p>
                </div>
            </div>
        </body>
        </html>
      `,
    });

    console.log("Message sent: ", email.messageId);
  };
}
