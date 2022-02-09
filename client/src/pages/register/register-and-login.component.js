import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import RegisterWrapper from "./register.styles";
import FormRow from "../../components/form-row/formrow.component";
import Alert from "../../components//alert/alert.component";
import { useAppContext } from "../../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const RegisterAndLoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  // global state and useNavigate
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggler = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful. Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "/register",
        alertText: "User Created. Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <RegisterWrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        {/* <Logo /> */}
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type='button' onClick={toggler} className='member-btn'>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </RegisterWrapper>
  );
};

export default RegisterAndLoginPage;
