const { Users } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Users.destroy({
      where: {
        id: id,
      },
    });

    res.send({
      status: "success",
      data: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
