const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");

let data = {
    id: 10
}

let token = jwt.sign(data, "123abc")
console.log(token);

let decoded = jwt.verify(token, "123abc");
console.log(decoded);


// let msg = "user num 3";

// let hash = SHA256(msg).toString();

// console.log(msg);
// console.log(hash);

// let data = {
//     id: 4
// };
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data)+ "somesecret").toString();

// if (resultHash  === token.hash) {
//     console.log("Not changed data...")
// } else {
//     console.log("Data was changed..");
// }