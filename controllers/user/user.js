const model = require("../../models");
const User = model.user;

// --- get data by id
exports.show = (req, res) => {
  // const token = req.headers.authorization;
  const userId = req.params.id; //get id user
  User.findOne({
    where: { id: userId },
    attributes: [
      "breeder",
      "email",
      "password",
      "phone",
      "address",
      "createdAt",
      "updatedAt"
    ]
  }).then(result => {
    if (result) {
      res.status(200).send({
        status: 200,
        message: "success",
        result
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found"
      });
    }
  });
};
// --- end get data by id

// --- update data
exports.update = (req, res) => {
  const userId = req.params.id; //get id user
  const email = req.body.email;
  User.findOne({ where: { email } }).then(result => {
    if (result == null) {
      User.update(req.body, { where: { id: userId } }).then(result => {
        if (result) {
          User.findOne({ where: { id: userId } }).then(result => {
            res.status(200).send({
              status: 200,
              message: "success",
              result
            });
          });
        } else {
          res.status(404).send({
            status: 404,
            message: "not found"
          });
        }
      });
    } else {
      res.status(201).send({
        status: 201,
        userId,
        message: "email is already in use"
      });
    }
  });
};

// --- end update data user

// --- delete data user
exports.destroy = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id } }).then(result => {
    if (result) {
      res.status(200).send({
        status: 200,
        message: "success",
        result
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found",
        result
      });
    }
  });
};
// --- end delete data user
