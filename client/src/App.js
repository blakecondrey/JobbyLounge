import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const DashboardPage = lazy(() =>
  import("./pages/dashboard/dashboard.component")
);
const RegisterPage = lazy(() => import("./pages/register/register.component"));
const LandingPage = lazy(() => import("./pages/landing/landing.component"));
const ErrorPage = lazy(() => import("./pages/error/error.component"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <nav>
            <Link to='/'>Dashboard</Link>
            <Link to='/register'>Register</Link>
            <Link to='/landing'>Landing</Link>
          </nav>

          <Routes>
            <Route exact path='/' element={<DashboardPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/landing' element={<LandingPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
