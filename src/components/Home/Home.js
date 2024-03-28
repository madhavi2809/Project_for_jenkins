import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home(props) {
  return (
    <div className={styles.home}>
      <br />
      <div>
        <h1>
          <Link to="/login">Login</Link>
        </h1>
      </div>
      <br />
      <h2>{props.name ? `Welcome - ${props.name}` : "Please Login to your account using the above link"}</h2>
    </div>
  );
}

export default Home;