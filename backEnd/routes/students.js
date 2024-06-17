const router = require("express").Router();
let student = require("../models/student");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;

  const newStudent = new student({
    name,
    age,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.route("/").get((req, res) => {
  student
    .find()
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { name, age, gender } = req.body; //destructuring

  const updateStudent = {
    name,
    age,
    gender,
  };

  const update = await student
    .findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User Updated" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ status: "Error with updating data", error: error.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await student
    .findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(500)
        .send({ status: "Error with delete user", error: error.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  const user = await student
    .findById(userId)
    .then((getOneUser) => {
      res.status(200).send({ status: "User fetched", getOneUser });
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: error.message });
    });
});

module.exports = router;
