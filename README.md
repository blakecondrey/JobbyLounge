# JobbyLounge

#### Track Your Job Search

#### Setup React App

- create <b>client</b> folder
- open terminal
- cd client
- npx create-react-app .
- npm start (from package.json -> scripts -> "start")
- set edtor/browser side by side
- copy/paste assets from complete project

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
- saves times on the setup
- less lines of css
- speeds up the development
- normalize.css
- small CSS file that provides cross-browser consistency in the default styling of HTML elements.
- [normalize docs](https://necolas.github.io/normalize.css/)

- npm install normalize.css

- import 'normalize.css' in index.js
- SET BEFORE 'index.css'
- replace contents of index.css

#### Landing Page

- zoom level 175%
- markdown preview extension
- get something on the screen
- react router and styled components right after
- create pages directory in the source
- for now Landing.js
- create component (snippets extension)
- setup basic return

Landing Page

- import logo.svg and main.svg
- import Landing in App.js and render

#### Styled Components

- CSS in JS
- Styled Components
- have logic and styles in component
- no name collisions
- apply javascript logic
- npm install styled-components
- import styled from 'styled-components'
- vscode-styled-components extension
- colors and bugs
- style entire react component
- only responsible for styling
- styles maintained in pages/components respective folder

#### Logo and Images

- logo built in Figma
- [Cool Images](https://undraw.co/)

#### Logo

- create components folder in source
- create Logo.js
- move import and image logic
- export as default
- utilize index.js

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

TO-DO:

#### Register Page - Setup

#### Error Boundary

#### Spinner
