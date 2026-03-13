const express = require("express");
const router = express.Router();

const {
createAccount,
getAllAccounts,
getAccountById,
updateAccount,
deleteAccount,
depositMoney,
withdrawMoney
} = require("../controllers/accountController");


router.post("/", createAccount);

router.get("/", getAllAccounts);

router.get("/:id", getAccountById);

router.put("/:id", updateAccount);

router.delete("/:id", deleteAccount);

router.put("/deposit/:id", depositMoney);

router.put("/withdraw/:id", withdrawMoney);


module.exports = router;