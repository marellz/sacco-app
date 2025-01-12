import transporter from "#config/mail.js";
import User from "#models/User.js";

const notify = async (recipientId, { subject, template, context }) => {
  try {
    const recipient = await User.findById(recipientId);
    transporter.sendMail(
      {
        from: `<admin@waweru-shg.com>`,
        to: recipient.email,
        subject: subject,
        template,
        context: {
          user: recipient.firstName,
          subject,
          ...context,
        },
      },
      (err, info) => {
        if (err) {
          console.error("Error in Mail transporter", err);
          return "Error: " + err;
        } else {
          console.log("Transported!", info);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export default notify;
