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
  } catch (err) {
    next(err);
  }
};
