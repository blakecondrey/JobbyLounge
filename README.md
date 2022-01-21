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
- for now Landing.js
- create component (snippets extension)
- setup basic return

Landing Page

- import logo.svg and main.svg
- import Landing in App.js and render

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

- go to Landing.js

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

- create Alert.component.js in <b>components</b>

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

#### Error Boundary

- create error boundary for routing

#### Spinner

- create HOC Spinner for loading

```

```

```

```
