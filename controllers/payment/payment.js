const Payment = require("../../models").payment;
const User = require("../../models").user;
const jwtDecode = require("jwt-decode");

// task
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
  try {
    const token = req.headers.authorization;
    const idUser = jwtDecode(token);
    const idPayment = req.params.id;

    const userData = await User.findOne({ where: { id: idUser.userId } });
    if (userData.role == "admin") {
      // res.send(userData);
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
      res.status(403).send({
        status: 403,
        message: "no access"
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
//  !--- end Update data Paymnt

// end task

//  --- show data Paymnt
exports.show = async (req, res) => {
  try {
    const result = await Payment.findOne({
      where: { id: req.params.id },
      attributes: ["id", "no_rek", "proof_of_transfer", "status"],
      include: [
        {
          model: User,
          attributes: ["breeder", "email", "role"]
        }
      ]
    });
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
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
//  --- end show data Paymnt

//  --- show all data Paymnt
exports.index = async (req, res) => {
  try {
    const result = await Payment.findAll();
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
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
//  !--- end show all data Paymnt
