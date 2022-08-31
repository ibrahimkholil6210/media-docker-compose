const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models").User;
const { registerValidator, loginValidator } = require("../helper/validator");

exports.CreateUser = async (req, res) => {
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ where: { email: req.body.email } });
  if (emailExists)
    return res
      .status(400)
      .send("A User account with this email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    userName: req?.body?.userName,
    email: req?.body?.email,
    password: hashedPassword,
  };

  User.create(newUser)
    .then((savedUser) => {
      res.status(200).json({ status: "Success", new_user_id: savedUser.id });
    })
    .catch((err) => res.status(500).send(err.message));
};

exports.LoginUser = async (req, res) => {
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send("Email is not correct");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign(
      {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 10,
      },
      process.env.TOKEN_SECRET
    );

    res.header("authorization", token).send(token);
  } catch (err) {
    res.status(500).send("Internal Server error");
  }
};
