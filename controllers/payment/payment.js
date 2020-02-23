const Payment = require("../../models").payment;
const User = require("../../models").user;
const jwtDecode = require("jwt-decode");

//  --- Store data Paymnt
exports.store = (req, res) => {
  const token = req.headers.authorization;
  var decoded = jwtDecode(token);

  const dataPayment = {
    no_rek: req.body.no_rek,
    proof_of_transfer: req.body.proof_of_transfer,
    status: req.body.status,
    user_id: decoded.userId
  };
  Payment.create(dataPayment).then(resultCreated => {
    Payment.findOne({
      where: { id: resultCreated.id },
      attributes: ["no_rek", "proof_of_transfer"],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "breeder",
            "address",
            "phone",
            "createdAt",
            "updatedAt"
          ]
        }
      ]
    }).then(result => {
      if (result) {
        res.status(200).send({
          status: 200,
          message: "success",
          result
        });
      } else {
        res.status(400).send({
          status: 400,
          message: "Bad Request"
        });
      }
    });
  });
};
//  !--- end Store data Paymnt

//  --- Update data Paymnt
exports.update = (req, res) => {
  const token = req.headers.authorization;
  const idUser = jwtDecode(token);
  const idPayment = req.params.id;

  // const token = req.headers.authorization;
  // var decoded = jwtDecode(token);
  res.send(idUser);
  // User.findOne({
  //   where: { id: idUser.userId }
  // }).then(result => {
  //   res.send(result);
  //   if (result) {
  //     res.status(200).send({
  //       status: 200,
  //       message: "access success"
  //     });
  //   } else {
  //     res.status(403).send({
  //       status: 403,
  //       message: "access denied"
  //     });
  //   }
  //   res.send(idPayment);
  // });
};
// >**url** = {your_host}/api/v1/payment/{payment_id}
// **method** = PUT
// **request header** =

// >```json
// {
//   "Authorization" : "Bearer {token}"
// }
// ```

// >**request body** =

// >```json
// {
//   "no_rek": 1021691010,
//   "proof_of_transfer": "https://buktitransfer.jpg",
//   "status": "premium"
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
//   "status": "premium"
// }
