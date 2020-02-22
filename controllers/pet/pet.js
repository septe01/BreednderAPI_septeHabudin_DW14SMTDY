const jwt = require("jsonwebtoken");
const model = require("../../models");
const Pet = model.pet;
const User = model.user;
const Spesies = model.spesies;
const Age = model.age;

// --- add pet
exports.store = (req, res) => {
  const userId = req.body.user.id;
  const spesiesId = req.body.spesies.id;
  const ageId = req.body.age.id;
  const data = {
    name: req.body.name,
    gender: req.body.gender,
    about_pet: req.body.about_pet,
    photo: req.body.photo,
    user_id: userId,
    spesies_id: spesiesId,
    age_id: ageId
  };

  // res.send(data);

  Pet.create(data).then(result => {
    res.send(result);
    User.findOne({ where: { id: userId } }).then(userData => {
      Spesies.findOne({ where: { id: spesiesId } }).then(spesiesData => {
        Age.findOne({ where: { id: ageId } }).then(ageData => {
          const resDataPet = {
            id: resPet.id,
            name: resPet.name,
            ageData,
            spesiesData,
            about_pet: resPet.about_pet,
            photo: resPet.photo,
            userData
          };
          res.status(200).send({
            status: 200,
            message: "success",
            resDataPet
          });
        });
      });
    });
  });
};
// !-- end add pet

// --- get all pet
exports.index = (req, res) => {
  Pet.findAll({
    attributes: [
      "id",
      "name",
      "gender",
      "about_pet",
      "photo",
      "createdAt",
      "updatedAt"
    ],
    include: [
      { model: Spesies, attributes: ["name"] },
      { model: Age, attributes: ["name"] },
      { model: User, attributes: ["id", "breeder", "address", "phone"] }
    ]
  }).then(pets => {
    if (pets) {
      res.send(pets);
    } else {
      res.status(400).send({
        error: true,
        message: "not found"
      });
    }
  });
};
// !--- end get all pet

// --- update pet
exports.update = (req, res) => {
  const id = req.params.id;
  Pet.update(req.body, { where: { id: id } }).then(dataPet => {
    Pet.findOne({
      where: { id: id },
      include: [
        { model: Spesies, attributes: ["id", "name"] },
        { model: Age, attributes: ["id", "name"] },
        { model: User, attributes: ["id", "breeder", "address", "phone"] }
      ]
    }).then(result => {
      if (result) {
        res.status(200).send({
          status: 200,
          message: "success",
          result
        });
      } else {
        res.status(404).send({ message: "not found" });
      }
    });
  });
};
// --- end update pet

// --- delete pet
exports.destroy = (req, res) => {
  const id = req.params.id;
  Pet.destroy({ where: { id: id } }).then(result => {
    if (result) {
      res.status(200).send({
        message: "success",
        data: result
      });
    } else {
      res.status(401).send({
        error: true,
        message: "Delete authorized"
      });
    }
  });
};
// --- end delete pet

// --- detail pet
exports.show = (req, res) => {
  const id = req.params.id;
  Pet.findOne({
    where: { id },
    include: [
      { model: Spesies, attributes: ["id", "name"] },
      { model: Age, attributes: ["id", "name"] },
      { model: User, attributes: ["id", "breeder", "address", "phone"] }
    ]
  }).then(result => {
    if (result) {
      res.status(200).send({
        status: 200,
        message: "seccess",
        result
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found",
        id
      });
    }
  });
};
// !--- end detail pet
