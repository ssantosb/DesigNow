const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')

const userDB = require("./userModel");

app.use(express.json());
app.use(cors());

const DB = "mongodb+srv://TeamRocket:teamrocket202010@principal-dv0we.mongodb.net/users?retryWrites=true&w=majority";
app.get("/login", async (req, res, next) => {
    res.status(200).json({ status: "success", data: await userDB.find() });
});


app.post("/login", async (req, res, next) => {
    const userData = await userDB.findOne({ username: req.body.username }).select("+password");
    if (!userData) {
        res.status(400).json({ status: "fail", message: "No se encontró el usuario en la base de datos" });
        return;
    }

    else {
        if (userData.password === req.body.password) {
            userData.password = undefined;
            res.status(200).json({ status: "success", data: userData });
            return;
        }
        else {
            res.status(401).json({ status: "fail", message: "Contraseña incorrecta" });
            return;
        }
    }
});

app.get("/register", async (req, res, next) => {
    res.status(200).json({ status: "success", data: await userDB.find() });
});

app.post("/register", async (req, res, next) => {
    const userData1 = await userDB.findOne({ username: req.body.username }).select("+password");
    const userData2 = await userDB.findOne({ email: req.body.email }).select("+password");

    if (userData1 === null && userData2 === null) {
        res.status(200).json({ status: "success", data: req.body });
        return;
    }

    else {
        if (userData1 != null) {
            res.status(409).json({ status: "fail", message: "El nombre de usuario ya se encuentra registrado" });
            return;
        }

        if (userData2 != null) {
            res.status(409).json({ status: "fail", message: "El correo ingresado ya se encuentra en uso." });
            return;
        }
    }

});

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB conection succesful");
    });

app.listen(3000, () => { console.log("Conectado") });