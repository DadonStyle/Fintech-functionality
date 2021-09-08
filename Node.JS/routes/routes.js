const express = require("express");
const {
  addUser,
  deleteUser,
  currencyUserLogs,
} = require("../controllers/userController");

const router = express.Router();

router.put("/savedlogs/:uid", currencyUserLogs);

router.post("/create/:uid", addUser);

router.delete("/user/:uid", deleteUser);

module.exports = router;
