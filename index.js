const express = require('express');
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

//DB
mongoose.connect(process.env.MONGO_URI,
  () => console.log('mongo db conectado'))
  .catch(err => console.log(`ha ocurrido un error: ${err}`))

app.use(express.json())

app.use("/auth", require("./routes/user"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`escuchando en el puerto: ${PORT}`))