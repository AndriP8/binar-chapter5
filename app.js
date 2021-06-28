const express = require("express");
const app = express();
const router = require("./router/index");
const { check, body, validationResult } = require("express-validator");
const { addUser, cekDuplikatUser, cekDuplikatEmail, dataUsersJson } = require("./utils/users");
let dataUsers = require("./data/users.json");

const port = 3000;

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger); // application level middleware
app.set("view engine", "ejs"); // third-party level middleware
app.use(express.static("public")); // built-in middleware
app.use(express.urlencoded({ extended: true })); // built-in middleware
app.use(express.json());
app.use(router); // router level middleware


app.get("/", (req, res) => {
  res.render("signUp", {
    title: "Halaman Sign up",
    formTitle: "FORM SIGN UP",
  });
});

app.post(
  "/",
  [
    body("username").custom((value) => {
      const duplikat = cekDuplikatUser(value);
      if (duplikat) {
        throw new Error("Username sudah ada");
      }
      return true;
    }),
    body("email").custom((value) => {
      const duplikat = cekDuplikatEmail(value);
      if (duplikat) {
        throw new Error("Email sudah ada");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("password", "password harus lebih dari 5 karakter").isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("signUp", {
        title: "Halaman Sign up",
        formTitle: "FORM SIGN UP",
        errors: errors.array(),
      });
    } else {
      addUser(req.body);
      res.redirect("/login");
    }
  }
);

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Halaman Login",
    formTitle: "FORM LOGIN",
  });
});

app.post(
  "/login",
  [
    body("email").custom((value) => {
      const duplikat = cekDuplikatEmail(value);
      if (duplikat) {
        return true;
      }
    }),
    check("email", "email tidak valid").isEmail(),
    check("password", "password harus lebih dari 5 karakter").isLength({ min: 5 }),
  ],
  (req, res) => {
    const cekEmail = dataUsersJson();
    cekEmail.map((i) => {
      let { email, password } = req.body;
      if (i.email === email && i.password === password) {
        res.status(201).redirect("/homepage");
      } 
    });
  }
);

app.get("/api/v1/posts", (req, res) => {
  res.status(200).json(dataUsers);
});

app.get("/api/v1/posts/:username", (req, res) => {
  const dataApi = dataUsers.find((data) => data.username === req.params.username);
  if (dataApi) {
    res.json(dataApi);
  } else {
    res.json({
      error: "username yang dimasukan tidak ada",
    });
  }
});

app.post("/api/v1/posts", (req, res) => {
  const { username, email, password } = req.body;
  const user = {
    username,
    email,
    password,
  };
  for (const data of dataUsers) {
    if (username === data.username && email === data.email && password === data.password) {
      return res.status(200).json({
        status: "data sudah ada",
      });
    } else {
      dataUsers.push(user);
      return res.status(201).json(user);
    }
  }
});

app.put("/api/v1/posts/:username", (req, res) => {
  let user = dataUsers.find((data) => data.username === req.params.username);
  const params = { 
    email: req.body.email, 
    password: req.body.password 
  } 
  user = { ...user, ...params };
  dataUsers = dataUsers.map((i) => (i.username === user.username ? user : i));
  res.status(200).json(user);
});

app.put("/api/v1/posts/:username", (req, res) => {
  let post = dataUsers.find((i) => i.username === +req.params.username);
  // menghindari parameter yg tidak di inginkan
  const params = { email: req.body.email, password: req.body.password }
   post = { ...post, ...params };

  dataUsers = dataUsers.map((i) => (i.username === post.username ? post : i));
  res.status(200).json(post);
});

app.delete("/api/v1/posts/:username", (req, res) => {
  dataUsers = dataUsers.find((data) => {
    if (data.username === +req.params.username) {
      data
    }
  })
  res.status(200).json({
    message: `Sukses delete ${req.params.username}`
  })
});

// error handling middleware
app.use((req, res) => {
  res.status(404);
  res.render("notFound");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
