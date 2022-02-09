# JobbyLounge

#### Track Your Job Search

#### Setup React App

- create <b>client</b> folder
- open terminal
- cd client
- npx create-react-app .
- npm start (from package.json -> scripts -> "start")

#### Spring Cleaning

- in src remove
- App.css
- App.test.js
- logo.svg
- reportWebVitals.js
- setupTests.js
- fix App.js and index.js

#### Title and Favicon

- change title in public/index.html
- replace favicon.ico in public
- resource [Generate Favicons](https://favicon.io/)

#### Normalize.css and Global Styles

- CSS in JS (styled-components)
- normalize.css
- small CSS file that provides cross-browser consistency in the default styling of HTML elements.
- [normalize docs](https://necolas.github.io/normalize.css/)

- npm install normalize.css

- import 'normalize.css' in index.js
- SET BEFORE 'index.css'
- replace contents of index.css

#### Landing Page

- create pages directory in the source
- for now landing.component.js
- create component (snippets extension)
- setup basic return

Landing Page

- import logo.svg and main.svg
- import LandingPage in App.js and render

```js
import main from "../../assets/images/main.svg";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
```

#### Styled Components

- CSS in JS
- Styled Components
- have logic and styles in component
- no name collisions
- apply javascript logic
- npm install styled-components
- import styled from 'styled-components'
- style entire react component
- styles maintained in respective folder of accompanying page/component
- e.g. folder: landing | files: landing.component.js / landing.styles.js

```js
import styled from "styled-components";

export const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
```

#### Logo and Images

- logo built in Figma
- [Cool Images](https://undraw.co/)

#### React Router

- Version 6
- [React Router Docs](https://reactrouter.com/docs/en/v6)

```sh
npm install history@5 react-router-dom@6
```

- import four components

```js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
```

- Connect to browser's URL with BrowserRouter
- Routes instead of Switch

```js

<BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Dashboard</div>} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<div>Error</div>}>
    </Routes>
</BrowserRouter>

```

```js
<nav>
  <Link to='/'>Dashboard</Link>
  <Link to='/register'>Register</Link>
  <Link to='/landing'>Home</Link>
</nav>
```

- go to landing.component.js

```js
import { Link } from "react-router-dom";

return (
  <Link to='/register' className='btn btn-hero'>
    Login / Register
  </Link>
);
```

#### Setup Pages

- create Error, Register, Dashboard pages
- basic return
- lazy load, suspense in App.js
- add to element={}
- remove temp navbar

#### Error Page

```js
import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/not-found.svg";
import ErrorWrapper from "./error.styles";

const ErrorPage = () => {
  return (
    <ErrorWrapper className='full-page'>
      <div>
        <img src={img} alt='not found' />
        <h3>Uh Oh! Page Not Found!</h3>
        <p>We can't seem to find the page you're looking for.</p>
        <Link to='/'>back to home.</Link>
      </div>
    </ErrorWrapper>
  );
};

export default ErrorPage;
```

#### Register Page - Setup

```js
import { useState, useEffect } from 'react'
import { Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
// global context and useNavigate later

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
// if possible prefer local state
// global state

function Register() {
  const [values, setValues] = useState(initialState)

  // global context and useNavigate later

  const handleChange = (e) => {
    console.log(e.target)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>

        {/* name field */}
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>

          <input
            type='text'
            value={values.name}
            name='name'
            onChange={handleChange}
            className='form-input'
          />
        </div>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
```

#### FormRow Component

- create FormRow.component.js in components
- setup one for email and password
- type, name, value

```js
import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  );
};

export default FormRow;
```

#### Alert Component

- create alert.component.js in <b>components</b>

```js
const Alert = () => {
  return <div className='alert alert-danger'>alert goes here</div>;
};

export default Alert;
```

- setup import/export
- alert-danger or alert-success
- eventually setup in global context
- showAlert in initialState (true || false)
- right after h3 login

```js
values.showAlert && <Alert />;
```

```js
const toggleMember = () => {
  setValues({ ...values, isMember: !values.isMember });
};

return (
  <Wrapper>
    {/* control h3 */}

    <h3>{values.isMember ? "Login" : "Register"}</h3>

    {/* toggle name */}

    {!values.isMember && (
      <FormRow
        type='text'
        name='name'
        value={values.name}
        handleChange={handleChange}
      />
    )}

    {/* right after submit btn */}
    {/* toggle button */}

    <p>
      {values.isMember ? "Not a member yet?" : "Already a member?"}

      <button type='button' onClick={toggleMember} className='member-btn'>
        {values.isMember ? "Register" : "Login"}
      </button>
    </p>
  </Wrapper>
);
```

#### Global Context

- in src create context directory
- actions.types.js
- reducer.js
- appContext.js

```js
import React, { useState, useReducer, useContext } from "react";

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use at bottom of file
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
```

- import AppProvider in App.js

```js
import { AppProvider } from "./context/appContext";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### useReducer

- [React Tutorial](https://youtu.be/iZhV0bILFb0)
- useReducer vs Redux
- multiple reducers vs one

#### Wire Up Reducer

```js
reducer.js;

const reducer = (state, action) => {
  throw new Error(`no such action :${action.type}`);
};
export default reducer;
```

```js
appContext.js;

import reducer from "./reducer";

const [state, dispatch] = useReducer(reducer, initialState);
```

#### Display Alert

```js
actions.types.js;
export const ActionTypes = {
  DISPLAY_ALERT: "SHOW_ALERT",
};
```

- setup imports (reducer and appContext)

```js
appContext.js;

const displayAlert = () => {
  dispatch({ type: ActionTypes.DISPLAY_ALERT });
};
```

```js
reducer.js
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };
    default:
      return state;
  }
```

```js
Alert.js in Components;

import { useAppContext } from "../context/appContext";

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
```

#### Display Alert

- [JS Nuggets - Dynamic Object Keys](https://youtu.be/_qxCYtWm0tw)

```js
register.component.js;

const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
};
```

- get displayAlert function

```js
register.component.js;

const onSubmit = (e) => {
  e.preventDefault();
  const { name, email, password, isMember } = values;
  if (!email || !password || (!isMember && !name)) {
    displayAlert();
    return;
  }
  console.log(values);
};
```

#### Clear Alert

- technically optional

```js
actions.types.js;

export const ActionTypes = {
  // ...
  CLEAR_ALERT: "CLEAR_ALERT",
};
```

- setup imports (reducer and appContext)

```js
reducer.js;

const reducer = (state, action) => {
  switch (action.type) {
    // ... other cases ....
    case ActionTypes.CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    default:
      return state;
  }
```

````js
appContext.js

  const displayAlert = () => {
    dispatch({ type: ActionTypes.DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: ActionTypes.CLEAR_ALERT });
    }, 3000);
  };

#### Setup Server

- stop the dev server in client
- cd ..
- start setting up our server
- setup package.json

```sh
npm init -y
````

- create server.js
- console.log('server running...')

```sh
node server
```

#### ES6 vs CommonJS

```js
ES6;

import express from "express";
const app = express();
```

- file extension .mjs

```js
package.json

"type":"module"
```

#### Nodemon and Basic Express Server

```sh
npm install nodemon --save-dev
```

```js
package.json

"start":"nodemon server"

```

```sh
npm install express
```

```js
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
```

#### Not Found Middleware

- in the root create middleware folder
- not-found.js
- setup function
- return 404 with message 'Route does not exist'
- import in server.js
- make sure to use .js extension
- place after home route

#### Error Middleware

- in the middleware create error-handler.js
- setup function
- accept 4 parameters (error, req, res, next)
- log error
- return 500
- json({msg:'there was an error'})
- import in the server.js
- make sure to use .js extension
- place it last
- eventually handle Mongoose Errors, just like in the node-express
- showcase with async errors

#### ENV Variables

```sh
npm install dotenv
```

- import dotenv from 'dotenv'
- dotenv.config()

- create .env
- PORT=4000
- .gitignore
- /node_modules
- .env

#### Connect to MongoDB

- switched back to PORT=5000
- remove Error from '/'

- existing MongoDB Atlas Account

```sh
npm install mongoose
```

- create DB folder
- create connect.js
- setup connectDB(url)
- in server.js create start() function
- get connection string
- setup as MONGO_URL in .env
- provide credentials and DB Name

#### Auth Controller and Route Structure

- create controllers
- authController.js
- create async functions

```js
export { register, login, updateUser };
```

- return res.send('function name')
- create routes folder
- authRoutes.js
- setup express router
- import functions from authController.js

```js
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(updateUser);

export default router;
```

- import authRouter in server.js

````js
app.use('/api/v1/auth', authRouter)

#### Jobs Controller and Route Structure

- jobsController.js
- create async functions

```js
export { createJob, deleteJob, getAllJobs, updateJob, showStats }
````

- return res.send('function name')

- jobsRoutes.js
- setup express router
- import functions from jobsController.js

```js
router.route("/").post(createJob).get(getAllJobs);
// place before :id
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
```

- in server.js jobsRouter

```js
app.use("/api/v1/jobs", jobsRouter);
```

#### Postman

- URL global var
- JOBBYLOUNGE Collection
- auth and jobs folders
- setup routes

#### User Model

- create models folder
- User.js
- setup schema
- name, email, password, lastName, location
- all {type:String}

```js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "My City, My State",
  },
});

export default mongoose.model("User", UserSchema);
```

#### Validate Email

```js
validate:{
  validator:(field)=> {return 2 > 1},
  message:'Please provide valid email'
  }
```

- [Validator Package](https://www.npmjs.com/package/validator)

```sh
npm install validator
```

- import in User.js

#### Register User - Initial Setup

- authController
- import User model
- setup temporary try/catch
- await User.create(req.body)
- if success 201 with json({user}) (temp)
- if error 500 with json({msg:'there was an error'})

```js
const register = async (req, res, next) => {
  try {
    // requires registrant to provide all values -> await User.create(req.body)
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: "There was an error" });
  }
};
```

#### Pass Error to Error Handler

- next(error)

```js
const register = async (req, res, next) => {
  try {
    // requires registrant to provide all values -> await User.create(req.body)
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};
```

#### Express-Async-Errors Package

- remove try/catch
- [Express-Async-Errors](https://www.npmjs.com/package/express-async-errors)

```sh
npm install express-async-errors
```

- in server.js
- import 'express-async-errors'

- use throw Error('error') instead of next(error)

#### Http Status Codes

- constants for status codes
- personal preference
- provides consistency
- less bugs
- easier to read/manage

- [Http Status Codes](https://www.npmjs.com/package/http-status-codes)

```sh
npm install http-status-codes
```

- import/setup in authController and error-handler
- setup defaultError

#### Custom Errors

#### Refactor Errors

- create errors folder
- create custom-api, bad-request, not-found, index.js files
- add proper imports
- setup index.js just like in the front-end
- import {BadRequestError} in authController
- gotcha "errors/index.js

```js
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export default CustomAPIError;

// -----------------------------------
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;

// -----------------------------------
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
// -----------------------------------
import BadRequestError from "./bad-request.js";
import NotFoundError from "./not-found.js";

export { BadRequestError, NotFoundError };
```

- in auth.controller.js:

```js
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

import { BadRequestError } from "../errors/index.js";

const register = async (req, res, next) => {
  // requires registrant to provide all values -> await User.create(req.body)
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values.");
  }

  // unique variable testing to check for email in use instead
  // of relying on error message to check for existence
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use.");
  }

  const user = await User.create({ name, email, password });
  res.status(StatusCodes.OK).json({ user });
};

const login = async (req, res) => {
  res.send("Login User");
};
const updateUser = async (req, res) => {
  res.send("Update User");
};

export { register, login, updateUser };
```

#### Hash Passwords

- one way street, only compare hashed values
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)

```sh
npm install bcryptjs
```

- User Model
- import bcrypt from 'bcryptjs'
- await genSalt(10)
- await hash(password , salt)
- await compare(requestPassword , currentPassword)
- [mongoose middleware](https://mongoosejs.com/docs/middleware.html)

```js
// "pre" middlewares are executed prior to saving information to db
// utilizing pre and bcrypt allows us to hash password prior to db save
// "this" points to instance created by UserSchema
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

#### Mongoose - Custom Instance Methods

[Custom Instance Methods](https://mongoosejs.com/docs/guide.html#methods)

- UserSchema.methods.createJWT = function(){console.log(this)}
- register controller
- right after User.create()
- invoke user.createJWT()

- in User.js

```js
UserSchema.methods.createJWT = function () {
  console.log(this);
};
```

- in auth.controller

```js
  const user = await User.create({ name, email, password });
  user.createJWT(); //HERE IS WHAT WAS ADDED
  res.status(StatusCodes.OK).json({ user });
};;
```

#### JWT

- token
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

```sh
npm install jsonwebtoken
```

- User Model
- import jwt from 'jsonwebtoken'
- jwt.sign(payload,secret,options)
- createJWT

-- User.js

```js
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, "jwtSecret", { expiresIn: "1d" });
};
```

in auth.controller register function

```js
const user = await User.create({ name, email, password });
const token = user.createJWT();
res.status(StatusCodes.OK).json({ user, token });
```

```js
return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_LIFETIME,
});
```

#### JWT_SECRET and JWT_LIFETIME

- [Keys Generator](https://www.allkeysgenerator.com/)
- RESTART SERVER!!!!
- add JWT_SECRET and JWT_LIFETIME vars too .env
- update createJWT function

```js
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
```

#### Complete Register

- password : {select:false}
- complete response

```js
password: {
  type: String,
  required: [true, "Please provide password"],
  minLength: 6,
  select: false,
}
```

```js
const token = user.createJWT();
res.status(StatusCodes.OK).json({
  user: {
    email: user.email,
    lastname: user.lastName,
    location: user.location,
    name: user.name,
  },
  token,
  location: user.location,
});
```

#### Concurrently

- front-end and backend (server)
- run separate terminals
- [concurrently](https://www.npmjs.com/package/concurrently)

```sh
npm install concurrently --save-dev

```

- package.json

```js
// --kill-others switch, all commands are killed if one dies
// cd client && npm start
// escape quotes

  "scripts": {
    "client": "cd client && npm start",
    "server": "nodemon server --ignore client",
    "dev": "concurrently --kill-others-on-fail \"npm run server\" \" npm run client\""
  },
```

#### Cors Error

[Cors Error](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

- two fixes (cors package and proxy)

#### Proxy (Implemented Fix)

- access from anywhere
- don't want to use full url

[cra proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

```js
// in package.json / client
"proxy":"http://localhost:5000"
```

- my preference to remove trailing slash /
- restart app

#### Register User - Setup

```js
appContext.js;

const initialState = {
  user: null,
  token: null,
  userLocation: "",
};
```

- actions.js REGISTER_USER_BEGIN,SUCCESS,ERROR
- import reducer,appContext

```js
appContext.js;
const registerUser = async (currentUser) => {
  console.log(currentUser);
};
```

- import in register.component.js

```js
register.component.js;

const currentUser = { name, email, password };
if (isMember) {
  console.log("already a member");
} else {
  registerUser(currentUser);
}

return (
  <button type='submit' className='btn btn-block' disabled={isLoading}>
    submit
  </button>
);
```

#### Axios

- [axios docs](https://axios-http.com/docs/intro)
- stop app
- cd client

```sh
npm install axios
```

- cd ..
- restart app

#### Register User - Complete

```js
appContext.js;

import axios from "axios";

const registerUser = async (currentUser) => {
  dispatch({ type: ActionTypes.REGISTER_USER_BEGIN });
  try {
    const response = await axios.post("/api/v1/auth/register", currentUser);
    console.log(response);
    const { user, token, location } = response.data;
    dispatch({
      type: ActionTypes.REGISTER_USER_SUCCESS,
      payload: {
        user,
        token,
        location,
      },
    });

    // will add later
    // addUserToLocalStorage({
    //   user,
    //   token,
    //   location,
    // })
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: ActionTypes.REGISTER_USER_ERROR,
      payload: { msg: error.response.data.msg },
    });
  }
  clearAlert();
};
```

```js
reducer.js;
// ... switch ...
    case ActionTypes.REGISTER_USER_BEGIN:
      return { ...state, isLoading: true };
    case ActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "User Created. Redirecting...",
      };
    case ActionTypes.REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    default:
      return new Error(`No Such Action :${action.type}`);
```

#### Navigate To Dashboard

in register.component.js

```js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // callback function
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    // dependency array
    // invoked on initial render
  }, [user, navigate]);
};
```

#### Local Storage

```js
appContext.js;
const addUserToLocalStorage = ({ user, token, location }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  localStorage.setItem("location", location);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("location");
};

const registerUser = async (currentUser) => {
  // in try block
  addUserToLocalStorage({
    user,
    token,
    location,
  });
};

// set as default
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
};
```

#### Morgan Package

- http logger middleware for node.js
- [morgan docs](https://www.npmjs.com/package/morgan)

```sh
npm install morgan
```

```js
import morgan from "morgan";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
```

#### UnauthenticatedError

- unauthenticated.js in errors
- import/export

```js
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
```

#### Compare Password

```js
User.js in models;

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
```

```js
auth.controller.js;
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values.");
  }
  // password is currently hidden using "select: false"
  // override select: false with ".select("+password") to compare
  // password in isPasswordCorrect await function
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials.");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials.");
  }
  // recreate JWT
  const token = user.createJWT();
  // programmatically set visible and hashed password to undefined
  user.password = undefined;
  // set status to json excluding undefined password
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
```

- test in Postman:
  - Login User
  - select "raw"
  - change "Text" to "JSON"
  - input JSON of email and password and SEND
  - res should return user object body without password

#### Login User - Setup

- actions.types.js LOGIN_USER_BEGIN,SUCCESS,ERROR
- import reducer,appContext

```js
appContext.js;
const loginUser = async (currentUser) => {
  console.log(currentUser);
};
```

- import in register.component.js

```js
register.component.js;

if (isMember) {
  loginUser(currentUser);
} else {
  registerUser(currentUser);
}
```

#### Login User - Complete

```js
appContext.js;
const loginUser = async (currentUser) => {
  dispatch({ type: LOGIN_USER_BEGIN });
  try {
    const { data } = await axios.post("/api/v1/auth/login", currentUser);
    const { user, token, location } = data;

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: { user, token, location },
    });

    addUserToLocalStorage({ user, token, location });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: { msg: error.response.data.msg },
    });
  }
  clearAlert();
};
```

```js
reducer.js

    case ActionTypes.LOGIN_USER_START:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "Login Successful. Redirecting..."
      }
    case ActionTypes.LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      }
```

#### Refactor

- login and register have almost identical functionality
- condense for DRY

```js
actions.types.js
  SETUP_USER_START: "SETUP_USER_START",
  SETUP_USER_SUCCESS: "SETUP_USER_SUCCESS",
  SETUP_USER_ERROR: "SETUP_USER_ERROR",
```

```js
appContext.js;

const setupUser = async ({ currentUser, endPoint, alertText }) => {
  dispatch({ type: SETUP_USER_BEGIN });
  try {
    const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);

    const { user, token, location } = data;
    dispatch({
      type: SETUP_USER_SUCCESS,
      payload: { user, token, location, alertText },
    });
    addUserToLocalStorage({ user, token, location });
  } catch (error) {
    dispatch({
      type: SETUP_USER_ERROR,
      payload: { msg: error.response.data.msg },
    });
  }
  clearAlert();
};
```

```js
reducer.js;
    case ActionTypes.SETUP_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.alertText,
      };
    case ActionTypes.SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
```

```js
register.component.js;
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
```

#### Nested Pages in React Router 6

#### Dashboard pages

- delete Dashboard.js
- fix imports/exports
- replace in home route

```js
<Route path='/' element={<div>dashboard</div>} />
```

- create <b>dashboard</b> directory in pages
- create AddJob,AllJobs,Profile,Stats,SharedLayout, index.js
- setup basic returns

```js
return <h1>Add Job Page</h1>;
```

- export all with index.js (just like components)
- import all pages in App.js

```js
App.js

<Route path='/' >
  <Route path="stats" element={<Stats />} />
  <Route path='all-jobs' element={<AllJobs />}></Route>
  <Route path='add-job' element={<AddJob />}></Route>
  <Route path='profile' element={<Profile />}></Route>
</Route>
```

#### Shared Layout

```js
App.js

<Route path='/' element={<SharedLayout/>} >
```

```js
shared - layout.component.js;

import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>
        <Link to='all-jobs'>all jobs</Link>
        <Link to='add-job'>all jobs</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
};

export default SharedLayout;
```

```js
App.js

<Route index element={<Stats/>} >
```

#### Protected Route

- create protected-route.component.js in pages
- import/export
- wrap SharedLayout in App.js

```js
<Route
  path='/'
  element={
    <ProtectedRoute>
      <SharedLayout />
    </ProtectedRoute>
  }
/>
```

```js
protected - route.component.js;

import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
};
```

#### Navbar, SmallSidebar, BigSidebar

- create navbar, smallSidebar, big-sidebar in components
- simple return
- import/export

```js
shared - layout.component.js;

import { Outlet } from "react-router-dom";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";
import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = () => {
  const { user } = useAppContext();
  return (
    <>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default SharedLayout;
```

#### React Icons

[React Icons](https://react-icons.github.io/react-icons/)

```sh
cd client
npm install react-icons
```

```js
navbar.component.js;

import React from "react";
import NavbarContainer from "./navbar.styles";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <NavbarContainer>
      <h4>navbar</h4>
      <FaHome />
    </NavbarContainer>
  );
};

export default Navbar;
```

#### Navbar Setup

```js
navbar.component.js;

import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/Navbar";
const Navbar = () => {
  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          className='toggle-btn'
          onClick={() => console.log("toggle sidebar")}
        >
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>

        <div className='btn-container'>
          <button className='btn' onClick={() => console.log("show logout")}>
            <FaUserCircle />
            john
            <FaCaretDown />
          </button>
          <div className='dropdown show-dropdown'>
            <button
              onClick={() => console.log("logout user")}
              className='dropdown-btn'
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
```

#### Toggle Sidebar

```js
actions.type.js;

export const ActionTypes = {
  DISPLAY_ALERT: "SHOW_ALERT",
  CLEAR_ALERT: "CLEAR_ALERT",
  SETUP_USER_START: "SETUP_USER_START",
  SETUP_USER_SUCCESS: "SETUP_USER_SUCCESS",
  SETUP_USER_ERROR: "SETUP_USER_ERROR",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
};
```

- import/export

```js
appContext.js;

const initialState = {
  showSidebar: false,
};

const toggleSidebar = () => {
  dispatch({ type: ActionTypes.TOGGLE_SIDEBAR });
};
```

```js
reducer.js;

case ActionTypes.TOGGLE_SIDEBAR:
  return {
    ...state,
    showSidebar: !state.showSidebar,
  };
```

```js
navbar.component.js;
const Navbar = () => {
  const { toggleSidebar } = useAppContext();

  return (
    <button className='toggle-btn' onClick={toggleSidebar}>
      <FaAlignLeft />
    </button>
);
```

```js
appContext.js;
return (
  <AppContext.Provider
    value={{ ...state, displayAlert, setupUser, toggleSidebar }}
  >
    {children}
  </AppContext.Provider>
);
```

#### Toggle Dropdown

```js
navbar.component.js;

const [showLogout, setShowLogout] = useState(false)

<div className='btn-container'>
  <button className='btn' onClick={() => setShowLogout(!showLogout)}>
    <FaUserCircle />
      {user.name}
    <FaCaretDown />
  </button>
  <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
    <button onClick={() => logoutUser()} className='dropdown-btn'>
      logout
    </button>
  </div>
</div>

```

#### Logout User

```js
actions.types.js;

export const ActionTypes = {
  DISPLAY_ALERT: "SHOW_ALERT",
  CLEAR_ALERT: "CLEAR_ALERT",
  SETUP_USER_START: "SETUP_USER_START",
  SETUP_USER_SUCCESS: "SETUP_USER_SUCCESS",
  SETUP_USER_ERROR: "SETUP_USER_ERROR",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  LOGOUT_USER: "LOGOUT_USER",
};
```

- import/export

```js
appContext.js;

const logoutUser = () => {
  dispatch({ type: LOGOUT_USER });
  removeUserFromLocalStorage();
};

return (
  <AppContext.Provider
    value={{ ...state, displayAlert, setupUser, toggleSidebar, logoutUser }}
  >
    {children}
  </AppContext.Provider>
);
```

```js
reducer.js;
// at top, import initialState
import { initialState } from "./appContext";

case ActionTypes.LOGOUT_USER:
  return {
    ...initialState,
    user: null,
    token: null,
    userLocation: null,
    jobLocation: null,
  };
```

```js
navbar.component.js;

const { user, logoutUser, toggleSidebar } = useAppContext();

return (
  <div className='btn-container'>
    <button className='btn' onClick={() => setShowLogout(!showLogout)}>
      <FaUserCircle />
      {user?.name} // optional chaining
      <FaCaretDown />
    </button>
    <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
      <button onClick={logoutUser} className='dropdown-btn'>
        logout
      </button>
    </div>
  </div>
);
```

#### Setup Links

- create <b>utils</b>in the <b>src</b>
- setup links.js

```js
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "all jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "add job",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
```

#### Small Sidebar - Setup

```js
small - sidebar.component.js;

import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export const SmallSidebar = () => {
  return (
    <Wrapper>
      <div className='sidebar-container show-sidebar'>
        <div className='content'>
          <button className='close-btn' onClick={() => console.log("toggle")}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>nav links</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
```

#### Small Sidebar - Toggle

```js
small - sidebar.component.js;

const { showSidebar, toggleSidebar } = useAppContext();
```

```js
small - sidebar.component.js;

return (
  <div
    className={
      showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
    }
  ></div>
);
```

```js
SmallSidebar.js;

return (
  <button className='close-btn' onClick={toggleSidebar}>
    <FaTimes />
  </button>
);
```

#### Small Sidebar - Nav Links

```js
small - sidebar.component.js;

import { NavLink } from "react-router-dom";

return (
  <div className='nav-links'>
    {links.map((link) => {
      const { text, path, id, icon } = link;

      return (
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          key={id}
          onClick={toggleSidebar}
        >
          <span className='icon'>{icon}</span>
          {text}
        </NavLink>
      );
    })}
  </div>
);
```

#### Nav Links Component

- in <b>components</b> create NavLinks.js
- styles still set from Wrapper
- also can setup in links.js, preference

```js
import { NavLink } from "react-router-dom";
import links from "../utils/links";

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
```

```js
sidebar.component.js;
import React from "react";
import SmallSidebarContainer from "./small-sidebar.styles";
import { useAppContext } from "../../context/appContext";
import NavLinks from "../nav-links/nav-links.component";

import Logo from "../logo/logo.component";
import { FaTimes } from "react-icons/fa";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <SmallSidebarContainer>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </SmallSidebarContainer>
  );
};

export default SmallSidebar;
```

#### Big Sidebar

```js
big - sidebar.component.js;
import React from "react";
import { useAppContext } from "../../context/appContext";
import Logo from "../logo/logo.component";
import NavLinks from "../nav-links/nav-links.component";
import BigSidebarContainer from "./big-sidebar.styles";

const BidSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <BigSidebarContainer>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </BigSidebarContainer>
  );
};

export default BidSidebar;
```

#### Authenticate User Setup

- create auth.js in <b>middleware</b>

```js
const auth = async (req, res, next) => {
  console.log("authenticate user");
  next();
};

export default auth;
```

```js
authRoutes.js;

import authenticateUser from "../middleware/auth.js";

router.route("/updateUser").patch(authenticateUser, updateUser);
```

```js
server.js;

import authenticateUser from "./middleware/auth.js";
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
```

- Test in Postman -> Update User, Jobs -> get all jobs
- cponsole shjould return 'authenticate user' from console.log call in middleware/auth.js

#### Auth - Bearer Schema

```js
Postman

Headers

Authorization: Bearer <token>

```

```js
auth.js;

const auth = async (req, res, next) => {
  const headers = req.headers;
  const authHeader = req.headers.authorization;
  console.log(headers);
  console.log(authHeader);
  next();
};
```

#### Postman - Set Token Programmatically

- register and login routes
- Tests

```js
const jsonData = pm.response.json();
pm.globals.set("token", jsonData.token);

Type: Bearer;

Token: {
  {
    token;
  }
}
```

#### Unauthenticated Error

```js
auth.js;

import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // why, well is it 400 or 404?
    // actually 401
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  next();
};
```

#### Auth Middleware

```js
auth.js;
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // log payload
    // attach user req object
    // req.user = payload
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default auth;
```

#### Update User

- in Postman:
- ensure Authorization tab -> Type -> Bearer token is selected for use

```js
auth.controller.js;
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values.");
  }

  const user = await User.findOne({ _id: req.user.userId });
  console.log(req.user);

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  // await User.findOneAndUpdate would avoid the errors, however, this
  // is to showcase potential errors that could occur with password hashing
  // and salting as it currently contains { password: { select: false} }
  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};
```

#### Modified Paths

- user.save() vs User.findOneAndUpdate

- Work-around ->

```js
User.js;
// "pre" middlewares are executed prior to saving information to db
// utilizing pre and bcrypt allows us to hash password prior to db save
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

#### Profile Page

```js
appContext.js

const updateUser = async (currentUser) => {
  console.log(currentUser)
}

value={{updateUser}}
```

```js
profile.component.js;

import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import FormRow from "../../components/form-row/formrow.component";
import Alert from "../../components/alert/alert.component";
import DashboardFormContainer from "./dashboard-form.styles";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <DashboardFormContainer>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText='last name'
            type='text'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? "Please wait ..." : "Save changes"}
          </button>
        </div>
      </form>
    </DashboardFormContainer>
  );
};

export default Profile;
```

#### Bearer Token - Manual Approach

```js
appContext.js;

const updateUser = async (currentUser) => {
  try {
    // manual approach
    const { data } = await axios.patch("/api/v1/auth/update_user".currentUser, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
};
```

#### Axios - Global Setup

```js
appContext.js;

axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
```

#### Axios - Custom Instance

```js
appContext.js;

const authFetch = axios.create({
  baseURL: "/api/v1",
  headers: {
    Authorization: `Bearer ${state.token}`,
  },
});

const updateUser = async (currentUser) => {
  try {
    const { data } = await authFetch.patch("/auth/updateUser", currentUser);
  } catch (error) {
    console.log(error.response);
  }
};
```

#### Axios - Interceptors

- will use instance, but can use axios instead

```js
appContext.js;

// response interceptor
const authFetch = axios.create({
  baseURL: "/api/v1",
});

authFetch.interceptors.request.use(
  (config) => {
    config.headers.common["Authorization"] = `Bearer: ${state.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) logoutUser();
    return Promise.reject(error);
  }
);
```

#### Update User

```js
actions.types.js;
export const ActionTypes = {
  DISPLAY_ALERT: "SHOW_ALERT",
  CLEAR_ALERT: "CLEAR_ALERT",
  SETUP_USER_START: "SETUP_USER_START",
  SETUP_USER_SUCCESS: "SETUP_USER_SUCCESS",
  SETUP_USER_ERROR: "SETUP_USER_ERROR",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  LOGOUT_USER: "LOGOUT_USER",
  UPDATE_USER_BEGIN: "UPDATE_USER_BEGIN",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR: "UPDATE_USER_ERROR",
};
```

```js
appContext.js;

const updateUser = async (currentUser) => {
  dispatch({ type: UPDATE_USER_BEGIN });
  try {
    const { data } = await authFetch.patch("/auth/updateUser", currentUser);

    // no token
    const { user, location, token } = data;

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: { user, location, token },
    });

    addUserToLocalStorage({ user, location, token });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: { msg: error.response.data.msg },
    });
  }
  clearAlert();
};
```

```js
reducer.js
const reducer = (state, action) => {
  switch (action.type) {
    // other cases previously implemented
    // .......
    case ActionTypes.UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "User Profile Updated",
      };
    case ActionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
```

#### TO-DO

#### Error Boundary

- create error boundary for routing

#### Spinner

- create HOC Spinner for loading

```

```

```

```

```

```

```

```
