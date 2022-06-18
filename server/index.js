// IMPORTS FROM PACKAGES
const express = require('express');
const mongoose = require('mongoose');

//IMPORTS FROM OTHER FILES
const authRouter = require('./routes/auth');

// INIT
const PORT = 3000;
const app = express();
const DB = "mongodb+srv://ggueojjing:12903478@cluster0.10zt5hu.mongodb.net/?retryWrites=true&w=majority"

// middleware
// CLIENT -> SERVER -> CLIENT
app.use(express.json());
app.use(authRouter);

// Connections
// g_u_o_j_n_
// 1_9_3_7_
mongoose.connect(DB)
    .then(() => {
        console.log('Connection Successful');
    })
    .catch((e) => {
        console.log(e);
    })

app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at ${PORT}`);
});