require("dotenv").config();
var mysql = require("mysql");

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

pool.getConnection(function (err, connection) {
  if (!err) {
    console.log("Databse connected sucessfully");
  } else {
    console.log("Databse connection Unsucessfull");
  }
});

let registration = `CREATE TABLE if not exists registration(
    user_id int auto_increment,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id)
    )`;
let profile = `CREATE TABLE if not exists profile(
    user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,        
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;
let question = `CREATE TABLE if not exists question(
    question_id int auto_increment,
    question varchar(255) not null,
    question_description varchar(255),
    question_code_block varchar(255),
    tags varchar(255),
    post_id varchar(255) not null,
    user_id int not null,
    PRIMARY KEY (question_id),
    UNIQUE KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;
let answer = `CREATE TABLE if not exists answer(
    answer_id int auto_increment,
    answer varchar(255) not null,
    answer_code_block varchar(255),
    user_id int not null,
    question_id int not null,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
)`;

pool.query(registration, (err, result) => {
  if (err) {
    console.log("Error creating registration table");
  } else {
    console.log("registration table created");
  }
});

pool.query(profile, (err, result) => {
  if (err) {
    console.log("Error creating profile table");
  } else {
    console.log("profile table created");
  }
});

pool.query(question, (err, result) => {
  if (err) {
    console.log("Error creating question table");
  } else {
    console.log("question table created");
  }
});

pool.query(answer, (err, result) => {
  if (err) {
    console.log("Error creating answer table");
  } else {
    console.log("answer table created");
  }
});

module.exports.pool = pool;
