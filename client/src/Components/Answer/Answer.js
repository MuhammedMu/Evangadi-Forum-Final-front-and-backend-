import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";

import profile from "../../Resources/images/Default_pfp.jpg";

function Answer() {
  const [userData, setUserData] = useContext(UserContext);
  // console.log(userData)

  const [question, setQuestion] = useState();

  const navigate = useNavigate();

  // question id from home page
  const { id } = useParams();
  // console.log(id)


  // To get form data
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form.description);
  };

  // Axios to store answers
  useEffect(() => {
    const handleSubmit = async () => {
      // get question by id
      try {
        const questionAsk = await axios.get(
          `http://localhost:3001/api/question/${id}`
        );

        setQuestion(questionAsk?.data.data);

        // navigate("/home");
      } catch (err) {
        console.log("problem", err);
        // alert(err.response.data.msg);
      }
    };
    handleSubmit();
  }, []);
  // console.log(question)

  // Axios to give answer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questionAsk = await axios.post(
        "http://localhost:3001/api/answer/",
        {
          answer: form.description,
          questionId: id ,
          // answerCodeBlock: "first",
          id: userData.user.id,

          // answer: "first",
          answerCodeBlock: "first",
          // questionId: "13",
          // id: "23",
        }
      );

      navigate("/home");
    } catch (err) {
      console.log("problem", err);
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <div className="col-sm-9 col-md-8 col-lg-8 mx-auto mt-5 ">
        <h5 className="card-title fw-light fs-5 first-join fw-bold">
          Question <br />
          <br />
          <b>{question?.question} ?</b>
        </h5>

        {/* Main question list wraper  */}
        <div className="question-outer-wraper">
          <hr />
          <h4>Answer From The Community</h4>
        </div>
        <div className="question-outer-wraper">
          <hr />
          <div className="question-main-wraper  row">
            <div className="question-inner-wrapper col-1 ">
              <img className="profile" src={profile} alt="pic" />
              <p className="name">Misrak</p>
            </div>

            <div className="question-inner-wrapper2 py-5 col-9">
              {question?.question_description}
            </div>

            {/* Answer giving section  */}
            <section className="ask container row col-12 mb-5">
              <div className>
                <h5 className="title">Ask a public question</h5>
                <h6>Go to question page</h6>
                <form onSubmit={handleSubmit}>
                  <div className="form-group"></div>
                  <br />
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1 question"
                      rows={5}
                      name="description"
                      placeholder="Your Answer..."
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login post-question-button col-sm-4 col-md-4 my-3"
                      type="submit"
                    >
                      Post your Answer
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Answer;
