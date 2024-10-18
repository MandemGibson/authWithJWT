import { useState } from "react";
// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignIn = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser, setIsLoading } = useAuth();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const res = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log(data);

      setUser(data);
      navigate("/");
    } catch (error) {
      console.error("Error signing in: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id="siginin" className="container">
      <div className="signin_form">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleInput}
          ></input>
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInput}
          />
          <br />
          <button type="submit">Sign In</button>
          <p>
            Don't have an account yet?{" "}
            <span>
              <a href="signup">Register</a>
            </span>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
