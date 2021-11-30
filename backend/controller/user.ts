const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

module.exports.createUser = async (req: any, res: any, next: any) => {
  try {
    const { body } = req;

    body.password = bcrypt.hashSync(body.password, 10);

    const createdUser: User = await User.create(body);

    delete body.password;

    const { id } = createdUser;

    if (!id) {
      return res.status(400).send({ error: "Error when creating a user" });
    }

    res.status(201).send({ token: jwt.sign({ data: body }, "secret", { expiresIn: "3d" }) });
  } catch (err: any) {
    if (err.original.constraint === "users_user_name_key") {
      return res.status(409).send({ error: "The specified username is already taken" });
    }

    if (err.original.constraint === "users_email_key") {
      return res.status(400).send({ error: "The specified mail is already registered" });
    }

    next(err);
  }
};

module.exports.checkUser = async (req: any, res: any, next: any) => {
  try {
    const { body } = req;

    const checkUser: User = await User.findOne({ where: { email: body.email } });

    if (!checkUser) {
      return res.status(404).send({ error: "User with this email address was not found" });
    }

    const match = await bcrypt.compare(body.password, checkUser.password);

    if (match) {
      return res.status(201).send({ token: jwt.sign({ data: body }, "secret", { expiresIn: "3d" }) });
    }

    res.status(401).send({ error: "Password mismatch" });
  } catch (err) {
    next(err);
  }
};
