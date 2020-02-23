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
exports.update = async (req, res) => {
  const token = req.headers.authorization;
  const idUser = jwtDecode(token);
  const idPayment = req.params.id;

  const userData = await User.findOne({ where: { id: idUser.userId } });
  if (userData.role == "admin") {
    // if user admin can be modify status
    Payment.update(req.body, { where: { id: idPayment } }).then(result => {
      if (result > 0) {
        Payment.findOne({
          where: { id: idPayment },
          attributes: ["no_rek", "proof_of_transfer", "status"],
          include: {
            model: User
          }
        }).then(result => {
          res.status(200).send(result);
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "not found"
        });
      }
    });
  } else {
    res.send("not admin");
  }
};
