const jwt = require("jsonwebtoken");

exports.transactionAuth = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(400).send({
      message: "Access Denied",
    });

  try {
    const adminKey = process.env.IS_ADMIN;
    const userKey = process.env.IS_USER;
    const verified = jwt.verify(token, (adminKey || userKey));

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};

exports.adminAuth = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(400).send({
      message: "Access Denied",
    });

  try {
    const adminKey = process.env.IS_ADMIN;
    const verified = jwt.verify(token, adminKey);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};
