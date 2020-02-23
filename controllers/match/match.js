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

// ### 2. Logic, Create and Update Match

// > #### Logic Provisions
// 1. If process **Check Match** give a _response empty or 204_, then create match with the value pet_id is your pet, pet_id_liked is the pet that you like, and status is false.
// 2. If process **Check Match** give a _response object with status is false_, then update status to true, and create match with the value status is true too.
// 3. If process **Check Match** give a _response object with status is true_, then do nothing

// > #### Create Match

// >>**url** = {your_host}/api/v1/match
// **method** = POST
// **request header** =

// >>```json
// {
//   "Authorization" : "Bearer {Token}"
// }
// ```

// >>**request body** =

// >>```json
// {
//   "pet_id" : "1",
//   "pet_id_liked" : "2",
//   "status" : false
// }
// ```

// >>**response body** =

// >>```json
// {
//   "id": "30",
//   "status" : false,
//   "pet": {
//     "id": "1",
//     "name": "Jon Snow",
//     "gender": "Male",
//     "spesies": {
//       "id": 1,
//       "name": "dog"
//     },
//     "age": "Adult",
//     "user": {
//       "id": 2,
//       "name": "Spiderman",
//       "address": "Permata Bintaro Residence",
//       "Phone": "083896831233"
//     },
//     "about_pet": "Pet ini sangat indah sekali dan ganteng sekali",
//     "photo": "https://dog.jpg",
//   },
//   "pet_liked": {
//     "id": "2",
//     "name": "Jon o",
//     "gender": "Female",
//     "spesies": {
//       "id": 1,
//       "name": "dog"
//     },
//     "age": "Adult",
//     "user": {
//       "id": "3",
//       "name": "Spiderman",
//       "address": "Permata Bintaro Residence",
//       "Phone": "083896831233"
//     },
//     "about_pet": "Pet ini sangat indah sekali dan ganteng sekali",
//     "photo": "https://dog.jpg",
//   },
//   "createdAt": "12-12-2019",
//   "updatedAt": "12-12-2019"
// }
// ```
