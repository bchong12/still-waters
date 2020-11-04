const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const result = await db.get_user({ username });
    if (!result[0]) {
      return res.status(400).send("Username does not exist");
    }

    const isAuthenticated = await bcrypt.compareSync(
      password,
      result[0].password
    );

    if (!isAuthenticated) {
      return res.status(400).send("Username and Password do not match");
    }

    delete result[0].password;

    req.session.user = result[0];

    res.status(202).send(req.session.user);
  },

  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .send("Password and confirmed password do not match");
    }

    const foundUser = await db.get_user({ username });

    if (foundUser[0]) {
      return res.status(400).send("Username already exists");
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const newUser = await db.add_user({ username, hash });

    req.session.user = newUser[0];
    res.status(201).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();

    res.sendStatus(200);
  },
  me: (req, res) => {
    res.send(req.session.user);
  },
};
