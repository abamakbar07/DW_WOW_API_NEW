const {
  Users
} = require("../../models");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password
    } = req.body;

    const schema = Joi.object({
      fullname: Joi.string().min(3).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(4).required(),
    });

    const {
      error
    } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    const checkEmail = await Users.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).send({
        status: "Failed",
        message: `Email already exsited`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const privateKey = process.env.SECRET_KEY;

    const token = jwt.sign({
        id: user.id,
      },
      privateKey
    );

    res.send({
      status: "success",
      message: "You succesfully registered",
      data: {
        chanel: {
          email: user.email,
          token,
        }
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(4).required(),
    });

    const {
      error
    } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user)
      return res.status(400).send({
        message: "Your Credentials is not valid",
      });

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass)
      return res.status(400).send({
        message: "Your Credentials is not valid",
      });

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({
        id: user.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      message: "Login Success",
      data: {
        chanel: {
            email,
            token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};