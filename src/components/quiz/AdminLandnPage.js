import React from "react";
import "./QuizLandnPg.css";
import { Link } from "react-router-dom";
import { logUserout } from "../redux/features/user/userSlice";
import "./QuizLandnPg.css";
import { useDispatch } from "react-redux";

const AdminLandnPage = () => {
  const dispatch = useDispatch();
  return (
    <div className="wlkm__area">
      <div className="abc411">
        <h2 className="wlkm_phr">WELCOME !</h2>

        <h4 className="quiz__lnk">
          Click{" "}
          <Link to="/admin" style={{ color: "rgba(6, 6, 158, 0.562)" }}>
            Here
          </Link>{" "}
          To Set Quiz
        </h4>

        <h6>All Done?</h6>
      </div>

      <button
        style={{ marginTop: "20px" }}
        className="logout__btn"
        onClick={() => {
          dispatch(logUserout());
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminLandnPage;
