const db = require("./connection/connection");
const menuQuestion = require("./app/app");

db.connect((err) => {
    if (err) throw err;
});

menuQuestion();
