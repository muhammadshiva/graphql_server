require('dotenv/config');
const mongoose = require("mongoose");
const {graphqlUploadExpress} = require("graphql-upload");
const express = require('express');

const app = require("./app");
const apolloServer = require("./apollo");

async function startServer() {
    app.use(graphqlUploadExpress());
    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    app.use("/images", express.static('Upload'));
    app.use('/', (req, res) => {
        res.send("Welcome to Graphql Upload!")
    })
};

startServer();

mongoose.connect('mongodb://127.0.0.1:27017/server-graphql')
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log("MongoDB Connection Failed!"));

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
    console.log(`Graphql EndPoint Path: ${apolloServer.graphqlPath}`);
})