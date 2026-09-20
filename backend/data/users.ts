import bcrypt from "bcryptjs";

export const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Adam Brown",
    email: "abrown@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Marin Muru",
    email: "muruboss@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];
