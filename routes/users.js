var express = require('express');
var router = express.Router();
const { mongodb, MongoClient, dbName, dbUrl } = require('./../config/dbConfig')

/* Using mongodb connection */
router.get('/', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = await client.db(dbName)
    const collection = await db.collection('users')
    let users = await collection.find().toArray()
    res.status(200).send({
      data: users
    })

  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error
    })
  }
  finally {
    client.close()
  }
});

router.get('/:id', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = await client.db(dbName)
    const collection = await db.collection('users')
    let user = await collection.findOne({ _id: mongodb.ObjectId(req.params.id) })
    if (user) {
      res.status(200).send({
        data: user
      })
    } else {
      res.status(400).send({
        massage: "Invaild Id"
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error
    })
  }
  finally {
    client.close()
  }
})

router.post('/signup', async (req, res) => {

  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = await client.db(dbName)
    const collection = await db.collection('users')
    let user = await collection.findOne({ email: req.body.email })
    // console.log(user)
    if (!user) {
      let user = await collection.insertOne(req.body)
      res.status(201).send({
        message: "User Added Successfully",
        data: user
      })
    } else {
      res.status(400).send({
        massage: `User with ${req.body.email} already exists`
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error
    })
  }
  finally {
    client.close()
  }
})

router.put('/edit-user/:id', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = await client.db(dbName)
    const collection = await db.collection('users')
    const user = await collection.findOne({ _id: mongodb.ObjectId(req.params.id) })
    if (user) {
      let user = await collection.updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })
      res.status(200).send({ massage: "User Updated Succesfully" })
    } else {
      res.status(400).send({ massage: "Invalid Id" })
    }
  } catch (error) {
    res.status(500).send({ massage: "Internal Server Error", error })
  } finally {
    client.close()
  }
})

// router.delete('/delete-user/:id', async (req, res) => {
//   const client = new MongoClient(dbUrl)
//   await client.connect()
//   try {
//     const db = await client.db(dbName)
//     const collection = await db.collection('users')
//     let user = await collection.findOne({ _id: mongodb.ObjectId(req.params.id) })
//     // console.log(user)
//     if (user) {
//       let deleteData = collection.deleteOne({ _id: mongodb.ObjectId(req.params.id) })
//       res.status(200).send({
//         message: "User Deleted Succssefully",

//       })
//     } else {
//       res.status(400).send({ massage: "User not Exist" })
//     }

//   } catch (error) {
//     res.status(400).send({
//       massage: `error`
//     })
//   }
//   finally {
//     client.close()
//   }
// })

router.delete('/delete-user/:id', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = await client.db(dbName)
    const collection = await db.collection('users')
    let user = await collection.findOne({ _id: mongodb.ObjectId(req.params.id) })
    if (user) {
      let user = await collection.deleteOne({ _id: mongodb.ObjectId(req.params.id) })
      res.status(200).send({
        massage: "User Deleted successfully"
      })
    } else {
      res.status(400).send({ massage: "Invalid Id" })
    }
  } catch (erroe) {
    res.status(500).send({ massage: "Internal Server Error", error })
  } finally {
    client.close()
  }
})
module.exports = router;
