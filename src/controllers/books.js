const { Books } = require("../../models");

exports.getBooks = async (req, res) => {
  try {
    const books = await Books.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        books,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getBookDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!book) {
      return res.status(400).send({
        status: "failed",
        message: `Book with id ${id} Not Existed`,
      });
    }

    res.send({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    await Books.create(req.body);

    const book = await Books.findOne({
      where: {
        title: req.body.title,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findOne({
      where: {
        id,
      },
    });

    if (!book) {
      return res.send({
        message: `Book with id ${id} Not Existed`,
      });
    }

    await Books.update(req.body, {
      where: {
        id,
      },
    });

    const bookUpdated = await Books.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        book: bookUpdated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const bookDetail = await Books.findOne({
      where: {
        id,
      }
    })

    const book = await Books.destroy({
      where: {
        id,
      },
    });

    if (!book) {
      return res.send({
        message: `Book with id ${id} Not Existed`,
      });
    }

    res.send({
      status: "success",
      message: `The book '${bookDetail.title}' with id ${bookDetail.id} successfuly deleted`
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
