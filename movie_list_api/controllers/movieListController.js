const printHello = async (req, res) => {
  try {
    res.status(200).send({ message: "Hello world" });
  } catch (error) {
    res.status(500).send({ message: "Error: " + error });
  }
};

module.exports = printHello;
