import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";

const Activation = () => {
  const { active_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (active_token) {
      const activationEmail = async () => {
        await axios
          .post(
            `https://ecomserver-9b4w.onrender.com/api/user/activation/${active_token}`,
          )
          .then((res) => console.log(res))
          .catch((err) => {
            setError(true);
          });
      };

      activationEmail();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <>
          <p>Your accounr has been created successfully</p>
          <br />
          <Link to="/">
            <Button style={{ backgroundColor: "green", color: "white" }}>
              Go to Home
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Activation;
