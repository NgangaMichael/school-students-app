const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// mongoose schemas 
const stream = ["East", "West", "South", "North"]
const age = [13, 14, 15, 16, 17, 18, 19]
const form = ["One", "Two", "Three", "Four"]
const grade = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "E"]
const gender = ["Male", "Female"]

// mongodb connection 
let Students = require("./module/students");
mongoose.connect("mongodb://localhost:27017/JKUAT", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(results => console.log("Connected to DB"))
.catch(err => console.log("Err on connection route", err))

// home route 
app.get("/home", (req, res) => {
    res.render("students/home")
});

// add student route 
app.get("/addstudent", (req, res) => {
    res.render("students/addstudent", {stream, age, form, grade, gender})
});

// post student route 
app.post("/addstudent", (req, res) => {
    const student = Students(req.body)
    student.save()
    .then(results => res.redirect(`/${student.form}${student.stream}`))
    .catch(err => console.log(err))
});

// get student details route 
app.get("/details/:id", (req, res) => {
    const {id} = req.params;
    Students.findById(id)
    .then(results => res.render("students/details", {student: results}))
    .catch(err => console.log(err))
});

// edit route 
app.get("/details/:id/edit", (req, res) => {
    const {id} = req.params;
    Students.findById(id)
    .then(results => res.render("students/edit", {student: results, grade, stream, form, gender}))
    .catch(err => console.log(err))
});

// edit Router, editing student details 
app.patch("/details/:id", (req, res) => {
    const {id} = req.params;
    const {name, age, stream, gender, grade, form} = req.body;
    Students.findByIdAndUpdate(id, {
        "name": name,
        "age": age,
        "gender": gender,
        "grade": grade,
        "form": form,
        "stream": stream
    })
    .then(results => res.redirect(`/${form}${stream}`))
    .catch(err => console.log(err))
});

// confirm delete 
// app.get("/confirm", (req, res) => {
//     Students.find({form: "One"})
//     .then(results => res.render("students/confirm", {student: results}))
//     .catch(err => console.log(err))
// })

// delete Router, deleting a student 
app.delete("/details/:id", (req, res) => {
    const {id} = req.params;
    Students.findByIdAndDelete(id)
    .then(results => res.render("students/deleted", {student: results}))
    .catch(err => console.log(err))
});

// form routes from form one to four 
// form one route 
app.get("/formOne", (req, res) => {
    Students.find({form: "One"})
    .then(results => res.render("students/formOne", {students: results}))
    .catch(err => console.log(err))
});

// form two route 
app.get("/formTwo", (req, res) => {
    res.render("students/formTwo")
});

// form three route 
app.get("/formThree", (req, res) => {
    res.render("students/formThree")
});

// form four route 
app.get("/formFour", (req, res) => {
    res.render("students/formFour")
});

// form one routes 
// one east routes
app.get("/oneEast", (req, res) => {
    Students.find({form: "One", stream: "East"})
    .then(results => res.render("students/oneEast", {students: results}))
    .catch(err => console.log(err))
});

// one west students 
app.get("/oneWest", (req, res) => {
    Students.find({form: "One", stream: "West"})
    .then(results => res.render("students/oneWest", {students: results}))
    .catch(err => console.log(err))
});
// one south students 
app.get("/oneSouth", (req, res) => {
    Students.find({form: "One", stream: "South"})
    .then(results => res.render("students/oneSouth", {students: results}))
    .catch(err => console.log(err))
});
// one north students 
app.get("/oneNorth", (req, res) => {
    Students.find({form: "One", stream: "North"})
    .then(results => res.render("students/oneNorth", {students: results}))
    .catch(err => console.log(err))
});

// form two routes 
// two east routes
app.get("/twoEast", (req, res) => {
    Students.find({form: "Two", stream: "East"})
    .then(results => res.render("students/twoEast", {students: results}))
    .catch(err => console.log(err))
});

// two west students 
app.get("/twoWest", (req, res) => {
    Students.find({form: "Two", stream: "West"})
    .then(results => res.render("students/twoWest", {students: results}))
    .catch(err => console.log(err))
});
// two south students 
app.get("/twoSouth", (req, res) => {
    Students.find({form: "Two", stream: "South"})
    .then(results => res.render("students/twoSouth", {students: results}))
    .catch(err => console.log(err))
});
// two north students 
app.get("/twoNorth", (req, res) => {
    Students.find({form: "Two", stream: "North"})
    .then(results => res.render("students/twoNorth", {students: results}))
    .catch(err => console.log(err))
});

// form three routes 
// three east routes
app.get("/threeEast", (req, res) => {
    Students.find({form: "Three", stream: "East"})
    .then(results => res.render("students/threeEast", {students: results}))
    .catch(err => console.log(err))
});

// three west students 
app.get("/threeWest", (req, res) => {
    Students.find({form: "Three", stream: "West"})
    .then(results => res.render("students/threeWest", {students: results}))
    .catch(err => console.log(err))
});
// three south students 
app.get("/threeSouth", (req, res) => {
    Students.find({form: "Three", stream: "South"})
    .then(results => res.render("students/threeSouth", {students: results}))
    .catch(err => console.log(err))
});
// three north students 
app.get("/threeNorth", (req, res) => {
    Students.find({form: "Three", stream: "North"})
    .then(results => res.render("students/threeNorth", {students: results}))
    .catch(err => console.log(err))
});


// stream routes from form one to four 
// form four east route 
app.get("/fourEast", (req, res) => {
    Students.find({form: "Four", stream: "East"})
    .then(results => res.render("students/fourEast", {students: results}))
    .catch(err => console.log(err))
});
// form four west route 
app.get("/fourWest", (req, res) => {
    Students.find({form: "Four", stream: "West"})
    .then(results => res.render("students/fourWest", {students: results}))
    .catch(err => console.log(err))
});
// form four south route 
app.get("/fourSouth", (req, res) => {
    Students.find({form: "Four", stream: "South"})
    .then(results => res.render("students/fourSouth", {students: results}))
    .catch(err => console.log(err))
});
// form four north route 
app.get("/fourNorth", (req, res) => {
    Students.find({form: "Four", stream: "North"})
    .then(results => res.render("students/fourNorth", {students: results}))
    .catch(err => console.log(err))
});

// cathing all errors with * symbol 
app.get("*", (req, res) => {
    res.render("students/notfound")
});

// listening port for browser display 
app.listen(8000, () => {
    console.log("Connected to server")
});