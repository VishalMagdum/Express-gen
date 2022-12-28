const express = require('express')
var router = express.Router()

let students = [
    {
        name: "Vishal",
        email: "vishal@gmail.com",
        mobile: "9146450564",
        batch: "B40WD",
        mentor: "Nagarajan"
    },
    {
        name: "Rohit",
        email: "rohit@gmail.com.com",
        mobile: "8805158006",
        batch: "B40WD",
        mentor: "Nagarajan"
    },
    {
        name: "Suresh",
        email: "suresh@gmail.com.com",
        mobile: "8932458925",
        batch: "B40WD",
        mentor: "Nagarajan"
    }
]


router.get('/', (req, res) => {
    res.send(students)
})

router.get('/:id', (req, res) => {
    // console.log(req.params)
    // res.send(students[req.params.id])

    if (req.params.id < students.length)
        res.status(200).send(students[req.params.id])
    else
        res.status(400).send({
            massage: "Invalid ID"
        })
})

router.post('/', (req, res) => {
    // console.log(req.body)
    if (req.body.name && req.body.email && req.body.mobile) {
        let student = students.filter((e) => e.email === req.body.email)
        // console.log(student)

        if (student.length === 0) {
            students.push(req.body)
            res.status(200).send({
                massage: "Student Added Successfully"
            })
        } else {
            res.status(400).send({
                massage: `${req.body.email} already exists`
            })
        }
    } else {
        res.status(400).send({
            massage: "Name, Email and Mobile are mandatory"
        })
    }
})
router.put('/:id', (req, res) => {
    if (req.params.id < students.length) {
        students.splice(req.params.id, 1, req.body)
        res.status(200).send({
            massage: "Info Updated"
        })
    } else {
        res.status(400).send({
            massage: "Invalid Id"
        })
    }
})

router.delete('/:id', (req, res) => {
    if (req.params.id < students.length) {
        let deleteData = students.splice(req.params.id, 1)
        res.status(200).send({
            massage: "studend info Deleted",
            data: deleteData
        })
    } else {
        res.status(400).send({
            massage: "Invalid Id"
        })
    }
})

module.exports = router; 