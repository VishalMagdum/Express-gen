var express = require('express');
const mongoose = require('mongoose')
var router = express.Router();
const { mongodb, dbUrl } = require('./../config/dbConfig')
const { userModel } = require('./../dbSchema/UsersSchema')

mongoose.connect(dbUrl)

/* Using Mongoose connection */
router.get('/', async (req, res) => {
  try {
    let user = await userModel.find()
    res.status(200).send({ data: user })
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error })
  }
});

router.get('/:id', async (req, res) => {
  try {
    let user = await userModel.findById({ _id: req.params.id })
    res.status(200).send({ data: user })
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error })

  }
})

router.post('/', async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email })
    if (!user) {
      await userModel.create(req.body)
      res.status(201).send({ message: "User Created Successdully" })
    } else {
      res.status(400).send({ message: `User with email ${req.body.email} already exist` })
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error })
  }
})

router.put('/:id', async (req, res) => {
  try {
    let user = await userModel.findById({ _id: req.params.id })
    if (user) {
      await userModel.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
      res.status(201).send({ message: "Data Updated Successfully" })
    } else {
      res.status(400).send({ message: "Invalid Id" })
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let user = await userModel.findById({ _id: req.params.id })
    if (user) {
      await userModel.deleteOne({ _id: req.params.id })
      res.status(200).send({ message: "User Deleted Successfully" })
    } else {
      res.status(400).send({ message: "Invalid Id" })
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error })
  }
})
module.exports = router;
