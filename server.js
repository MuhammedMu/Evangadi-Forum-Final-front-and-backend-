require("dotenv").config();
const pool = require("./server/config/database");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const questionRouter = require("./server/api/questions/question.router");

const userRouter = require("./server/api/users/user.router");

const answerRouter=require("./server/api/answers/answer.router")


// app.get("/", function (req, res) {
//   res.end("Listening at port: " + port);
// });

app.use("/api/users", userRouter);

app.use("/api/question", questionRouter);

app.use("/api/answer", answerRouter);

app.listen({ port }, function () {
  console.log("Web server listening " + port);
});
