const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password, isAdmin } = req.body;
    const result = await db.get_user([username]);
    const existingUser = result[0];
    if (existingUser) {
     return res.status(400).send("USER ALREADY EXISSTSS");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredUser = await db.register_user([isAdmin, username, hash]);

    const user = registeredUser[0];

    req.session.user = {
      isAdmin: user.is_admin,
      username: user.username,
      id: user.id
    };
    return res.status(201).send(req.session.user);
  },

  login: async (req,res) => {
    const {username,password} = req.body;
    const db = req.app.get('db')
    const result = await db.get_user([username])
    const foundUser = result[0]
    const user = foundUser
    if(!user){
      return res.status(401).send('user not found, please register as a new use before logging in')
    } 
      const isAuthenicated = bcrypt.compareSync(password, user.hash)
      if(isAuthenicated === false){
      return  res.status(403).send('unauthorized')
      }
        req.session.user = {
          isAdmin: user.is_admin,
        username: user.username,
        id: user.id
        }
       return res.status(200).send(req.session.user)
      

  },
  logout: async (req,res) => {
    req.session.destroy()
    res.sendStatus(200)
  } 
};


