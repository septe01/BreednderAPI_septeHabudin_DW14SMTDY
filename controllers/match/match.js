const mdl = require("../../models");
const Match = mdl.match;
const Pet = mdl.pet;
const Spesies = mdl.spesies;
const Age = mdl.age;
const User = mdl.user;

// --- show data match
exports.show = async (req, res) => {
  try {
    const { pet_id, pet_id_liked } = req.query;
    const resultMatch = await Match.findOne({
      where: { pet_id: pet_id, pet_id_liked: pet_id_liked }
    });
    if (resultMatch) {
      const pet = await Pet.findOne({
        where: { id: resultMatch.pet_id },
        attributes: ["id", "name", "gender", "about_pet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      });
      const pet_liked = await Pet.findOne({
        where: { id: resultMatch.pet_id_liked },
        attributes: ["id", "name", "gender", "about_pet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      });
      res.status(200).send({
        status: 200,
        message: "success",
        data: {
          id: resultMatch.id,
          status: resultMatch.status,
          pet,
          pet_liked,
          createdAt: resultMatch.createdAt,
          updatedAt: resultMatch.updatedAt
        }
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found"
      });
    }
  } catch (error) {}
  res.status(400).send({
    status: 400,
    message: "bad request"
  });
};
// !--- show data match

// --- Create data match
exports.store = async (req, res) => {
  try {
    const { pet_id, pet_id_liked } = req.body;
    if (pet_id != "" && pet_id_liked != "") {
      const storePet = await Match.create(req.body);
      if (storePet) {
        const pet = await Pet.findOne({
          where: { id: storePet.pet_id },
          attributes: ["id", "name", "gender", "about_pet", "photo"],
          include: [
            { model: Spesies, attributes: ["id", "name"] },
            { model: Age, attributes: ["name"] },
            { model: User, attributes: ["id", "breeder", "address", "phone"] }
          ]
        });
        const pet_liked = await Pet.findOne({
          where: { id: storePet.pet_id_liked },
          attributes: ["id", "name", "gender", "about_pet", "photo"],
          include: [
            { model: Spesies, attributes: ["id", "name"] },
            { model: Age, attributes: ["name"] },
            { model: User, attributes: ["id", "breeder", "address", "phone"] }
          ]
        });
        res.status(200).send({
          status: 200,
          message: "success",
          data: {
            id: storePet.id,
            status: storePet.status,
            pet,
            pet_liked,
            createdAt: storePet.createdAt,
            updatedAt: storePet.updatedAt
          }
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "not found",
          id
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
// !--- Create data match

// --- Update data match
exports.update = async (req, res) => {
  try {
    const matchId = req.params.id;
    const result = await Match.update(req.body, { where: { id: matchId } });
    if (result) {
      const resultMatch = await Match.findOne({
        where: { id: matchId }
      });

      const pet = await Pet.findOne({
        where: { id: resultMatch.pet_id },
        attributes: ["id", "name", "gender", "about_pet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      });
      const pet_liked = await Pet.findOne({
        where: { id: resultMatch.pet_id_liked },
        attributes: ["id", "name", "gender", "about_pet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      });
      res.status(200).send({
        status: 200,
        message: "success",
        data: {
          id: resultMatch.id,
          status: resultMatch.status,
          pet,
          pet_liked,
          createdAt: resultMatch.createdAt,
          updatedAt: resultMatch.updatedAt
        }
      });
    } else {
      res.status(204).send({
        status: 204,
        message: "no content"
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
// !--- end Update data match

//  --- data match by pet_id and status true
exports.matchTrue = async (req, res) => {
  try {
    const { pet_id, status } = req.query;
    const match = await Match.findAll({
      where: { pet_id: pet_id, status: status }
    });

    const pet = await Pet.findOne({
      where: { id: pet_id },
      attributes: ["id", "name", "gender", "about_pet", "photo"],
      include: [
        { model: Spesies, attributes: ["id", "name"] },
        { model: Age, attributes: ["name"] },
        { model: User, attributes: ["id", "breeder", "address", "phone"] }
      ]
    });

    const pet_liked = [];
    for (let i = 0; i < match.length; i++) {
      const liked = await Pet.findOne({
        where: { id: match[i].pet_id_liked },
        attributes: ["id", "name", "gender", "about_pet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      });
      pet_liked.push(liked);
    }

    const petMatch = [];
    match.map((e, i) => {
      data = {
        status: 200,
        message: "success",
        data: {
          id: e.id,
          status: e.status,
          pet,
          pet_liked,
          createdAt: e.createdAt,
          updatedAt: e.updatedAt
        }
      };
      petMatch.push(data);
    });

    res.status(200).send(petMatch); //sen response
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
//  !--- end data match by pet_id and status true
