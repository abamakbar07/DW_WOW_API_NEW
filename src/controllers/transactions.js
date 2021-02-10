const { Transactions, Users } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transactions.create({
      users: req.body.userId,
      transferProof: req.body.transferProof,
      remainingActive: 30,
      userStatus: "Active",
      paymentStatus: "Approved",
    });

    const users = await Users.findOne({
      where: {
        id: req.body.userId,
      },
      attributes: {
        exclude: ["email", "createdAt", "updatedAt", "password"],
      },
    });

    await (transaction["users"] = users);

    res.send({
      status: "success",
      data: {
        transaction: transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transactions.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["userId", "UserId"],
      },
    });

    if (!transaction) {
      return res.send({
        message: `Transaction with id ${id} Not Existed`,
      });
    }

    await Transactions.update(req.body, {
      where: {
        id,
      },
    });

    const transactionUpdated = await Transactions.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });

    const users = await Users.findOne({
      where: {
        id: transactionUpdated.users,
      },
      attributes: {
        exclude: ["email", "createdAt", "updatedAt"],
      },
    });

    await (transactionUpdated["users"] = users);

    res.send({
      status: "success",
      data: {
        transaction: transactionUpdated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transactions.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });

    if (!transaction) {
      return res.status(400).send({
        message: `Transaction with id ${id} Not Existed`,
      });
    }

    const users = await Users.findOne({
      where: {
        id: transaction.users,
      },
      attributes: {
        exclude: ["email", "createdAt", "updatedAt", "password"],
      },
    });

    await (transaction["users"] = users);

    res.send({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transaction = await Transactions.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });

    // const users = await User.findOne({
    //   where: {
    //     id: transaction.users,
    //   },
    //   attributes: {
    //     exclude: ["email", "createdAt", "updatedAt"],
    //   },
    // });

    // await (transaction["users"] = users);

    for (i = 0; i < transaction.length; i++) {
      const user = await Users.findOne({
        where: {
          id: transaction[i].users,
        },
        attributes: {
          exclude: ["email", "createdAt", "updatedAt", "password"],
        },
      });
      transaction[i].users = user;
    }

    res.send({
      status: "success",
      data: {
        transactions: transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
