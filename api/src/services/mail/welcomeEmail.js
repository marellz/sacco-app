import transporter from "#config/mail.js";

export const sendWelcomeEmail = (to, name, password = null) => {
    try {
        transporter.sendMail(
          {
            from: `<admin@waweru-shg.com>`,
            to,
            subject: "Welcome to the SACCO",
            template: "welcome",
            context:{
                firstName: name,
                password,
            }
          },
          (err, info) => {
            if (err) {
              console.error("Error in Mail transporter", err);
              return "Error: " + err;
            } else {
              console.log("Mail transporter:", info);
              return info;
            }
          }
        );

    } catch (error) {
        console.error(error)
    }
}