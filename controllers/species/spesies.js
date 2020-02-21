const Species = require("../../models").spesies;

exports.index = async (req, res) => {
  try {
    const getAll = await Species.findAll();
    if (getAll.length > 0) {
      res.status(200).send({
        status: 200,
        message: "success",
        getAll
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found"
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "Bad Request"
    });
  }
};

exports.store = async (req, res) => {
  try {
    const addSpecies = await Species.create(req.body);
    res.status(200).send({
      status: 200,
      message: "success",
      addSpecies
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "Bad Request"
    });
  }
};
