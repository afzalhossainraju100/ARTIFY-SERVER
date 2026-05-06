// encode.js
const fs = require("fs");
const key = fs.readFileSync("./artify-af9c3-firebase-adminsdk-fbsvc.json", "utf8");
const base64 = Buffer.from(key).toString("base64");
console.log(base64);
