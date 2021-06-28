const fs = require("fs");

// buat folder data jika belum ada
const dirPath = "../data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// buat file users.json jika belum ada
const dataUsersPath = "../data/users.json";
if (!fs.existsSync(dataUsersPath)) {
  fs.writeFileSync(dataUsersPath, "[]", "utf-8");
}

// ambil semua data di users.json
const dataUsersJson = () => {
  const file = fs.readFileSync("./data/users.json", "utf-8");
  const users = JSON.parse(file);
  return users;
};

// tulis data user dari request
const saveDataUser = (users) => {
  fs.writeFileSync("data/users.json", JSON.stringify(users));
};

// tambahkan data user dari request
const addUser = (user) => {
  const users = dataUsersJson();
  users.push(user);
  saveDataUser(users);
};

const cekDuplikatUser = (username) => {
  const users = dataUsersJson();
  return users.find((user) => user.username === username);
};

const cekDuplikatEmail = (email) => {
  const users = dataUsersJson();
  return users.find((user) => user.email === email);
};

const cekDuplikatPassword = (password) => {
  const users = dataUsersJson();
  return users.find((user) => user.password === password);
};

module.exports = { dataUsersJson, addUser, cekDuplikatUser, cekDuplikatEmail, cekDuplikatPassword };
