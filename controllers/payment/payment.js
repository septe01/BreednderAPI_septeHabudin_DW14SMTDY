const Payment = require("../../models").payment;
const jwtDecode = require("jwt-decode");

exports.store = async (req, res) => {
  // res.send(req.headers.authorization);
  const decoded = jwtDecode(req.headers.authorization).userId;
  const data = {
    no_rek: req.body.no_rek,
    proof_of_transfer: req.body.proof_of_transfer,
    user_id: decoded
  };

  const insertData = await Payment.create(data);

  res.send(insertData);
};

// {
//   "Authorization" : "Bearer {token}"
// }
// ```

// >**request body** =

// >_Note: status is enum with value free and premium_

// >```json
// {
//   "no_rek": 1021691010,
//   "proof_of_transfer": "https://buktitransfer.jpg",
//   "status": "free"
// }
// ```

// >**response body** =

// >```json
// {
//   "no_rek": 1021691010,
//   "proof_of_transfer": "https://buktitransfer.jpg",
//   "users": {
//     "id": 1,
//     "name": "Spiderman",
//     "address": "Permata Bintaro Residence",
//     "phone": "083896831233",
//     "createdAt": "12-12-2019",
//     "updatedAt": "12-12-2019"
//   },
//   "status": "free"
// }
