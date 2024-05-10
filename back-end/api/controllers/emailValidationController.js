const EmailValidator = require("email-deep-validator");

exports.validateEmails = async (req, res) => {
  const { emails } = req.body;

  try {
    const emailValidator = new EmailValidator({ timeout: 20000 }); //Timeout set to 20 seconds
    const invalidEmails = [];

    await Promise.all(
      emails.map(async (email) => {
        const { validDomain, validMailbox } =
          await emailValidator.verify(email);

        console.log("🚀 ~ emails.map ~ validMailbox:", validMailbox, email);
        console.log("🚀 ~ emails.map ~ validDomain:", validDomain, email);

        if (!validDomain) {
          //   if (!validMailbox) invalidEmails.push(email);
          // } else {
          invalidEmails.push(email);
        }

        // if (validDomain) {
        //   if (!validMailbox) invalidEmails.push(email);
        // } else {
        //   invalidEmails.push(email);
        // }
      })
    );

    if (invalidEmails.length > 0)
      return res.status(400).json({ invalidEmails });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong with validating with the emails" });
  }
};
