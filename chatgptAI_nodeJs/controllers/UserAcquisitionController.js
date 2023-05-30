const generateUserAcquisitionUser = (processMessages) => async (req, res) => {
  const { message } = req.body;
  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: `Generate insights of this user acquisition activity of this data: ${message}.`,
    },
  ];

  const response = await processMessages(req, messages);
  console.log(response);
  res.json({ message: response });
};

module.exports = {
  generateUserAcquisitionUser,
};
