const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ error: "el usuario ya existe" })
    }
    const hashed_password = await bcrypt.hash(password, 10)

    user = new User({
      name,
      email,
      password: hashed_password
    })

    await user.save()
    return res.status(200).json({ message: "Usuario creado exitosamente" })

  } catch (error) {
    console.log(error)
  }
})

//login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: "Los datos ingresados son invalidos" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: "Los datos ingresados son invalidos" })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresdI: '1h' })

    return res.json(token);
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router