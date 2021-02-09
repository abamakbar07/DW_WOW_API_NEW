const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const checkEmail = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (checkEmail) {
      return res.status(400).send({
        status: "Failed",
        message: `Email already exsited`,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await Users.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
    });

    const privateKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        id: user.id,
      },
      privateKey
    );

    res.send({
      status: "success",
      message: "You succesfully registered",
      data: {
        fullname: user.fullname,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
