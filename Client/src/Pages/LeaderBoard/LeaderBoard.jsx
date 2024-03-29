import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentData } from "../../Redux/student/action";
import axios from "axios";
import badge1 from "./badge.png";
import badge2 from "./silver-medal.png";
import badge3 from "./medal.png";

//component imports
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import LeaderboardRow from "../../Components/Table/LeaderboardRow";

//css imports
import "./LeaderBoard.css";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDet, setUserDet] = useState(null);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(null);
  const [points, setPoints] = useState(0);
  const [name, setName] = useState("");

  //redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { students } = useSelector((store) => store.student);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = localStorage.getItem("user");
        const res = await axios.get(`http://localhost:4500/student/${user}`);
        setName(res.data.name);
        setUserDet(res);
        setPoints(res.data.totalPoints);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    dispatch(getStudentData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  var count2;
  function getBadges() {
    console.log(userDet.data.courses);
    count2 = 0;
    userDet.data.courses.map((course) => {
      if (course.completed === "true") {
        count2++;
      }
    });
    console.log(count2);
    setCount(count2);
    console.log(count);
  }

  function handleClick() {
    getBadges();
    setOpen(!open);
    if (count > 0 && count <= 2) {
      setImg(badge1);
    } else if (count > 0 && count <= 4) {
      setImg(badge2);
    } else if (count > 0 && count <= 6) {
      setImg(badge3);
    }
  }
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "26px",
    // width: '300px',
    textAlign: "center",
    margin: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "32%",
  };

  const imgStyle = {
    borderRadius: "50%",
    width: "180px",
    height: "180px",
    objectFit: "cover",
    marginBottom: "8px",
  };

  const badgeStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 8px",
    borderRadius: "4px",
  };

  return (
    <Navbar>
      {/* header  */}
      <div className="leaderboard">
        <Header Title={"Ranking"} Address={"Leaderboard"} />
      </div>

      <div className="leaderboardData">
        {/* table */}
        <section
          className="tableAndBadgeContainer"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <div className="tableContainer" style={{ width: "68%" }}>
            <table
              className=""
              style={{ padding: "20px", paddingLeft: "40px" }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Quiz attended</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .sort((a, b) => (a.totalPoints > b.totalPoints ? -1 : 1))
                  .map((data, i) => (
                    <LeaderboardRow key={i} data={data} />
                  ))}
              </tbody>
            </table>
          </div>
          <hr style={{ marginRight: "40px" }}></hr>
          {/* <div style={{ width: "50%" }}>
            <center style={{ marginTop: "3%" }}>
              <button onClick={handleClick} className="viewBadgesButton">
                {open ? "Close" : "View Badges"}
              </button>
            </center>
     
            {open && (
              <div style={{width: "100%", border:"1px solid black", marginTop:"15px", borderRadius:"8px"}}>
                <img
                  src={img}
                  alt="Badge"
                  style={{
                    height: "100px",
                    marginTop: "2%",
                    marginLeft: "10px",
                  }}
                />
              </div>
            )}
            {open && img === badge1 ? "Bronze medal" : ""}
          
          </div> */}
          <div style={cardStyle}>
            <img
              src="https://freesvg.org/img/abstract-user-flat-4.png"
              alt="Profile"
              style={imgStyle}
            />
            <h2 style={{ margin: "8px 0" }}>{name}</h2>
            <p style={{ marginTop: "10px", marginBottom: "10px" }}>
              Image Score: {points}
            </p>
            {open && (
              <div style={badgeStyle}>
                {open && img === badge1 ? "Bronze medal" : ""}
                {open && img === badge2 ? "Silver medal" : ""}
                {open && img === badge3 ? "Gold medal" : ""}
              </div>
            )}
            {/* <div style={{width: "100%", border:"1px solid black", marginTop:"15px", borderRadius:"8px" , backgroundColor:"lightblue"}}>
                <img
                  src={img}
                  alt="Badge"
                  style={{
                    height: "120px",
                    marginTop: "2%",
                    marginLeft: "10px",
                  }}
                />
              </div> */}
            <div>
              <center style={{ marginTop: "3%" }}>
                {open && (
                  <button
                    onClick={handleClick}
                    className="viewBadgesButton"
                    style={{ backgroundColor: "white", color: "gray" }}
                  >
                    {open ? "x" : "View Badges"}
                  </button>
                )}
              </center>
              {!open && (
                <button onClick={handleClick} className="viewBadgesButton">
                  {open ? "x" : "View Badges"}
                </button>
              )}

              {open && (
                <div
                  style={{
                    width: "100%",
                    border: "1px solid black",
                    marginTop: "15px",
                    borderRadius: "8px",
                    backgroundColor: "lightblue",
                  }}
                >
                  <img
                    src={img}
                    alt="Badge"
                    style={{
                      height: "120px",
                      marginTop: "2%",
                      marginLeft: "10px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Navbar>
  );
};

export default LeaderBoard;
