import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./pages/protected-route.component";

const RegisterAndLoginPage = lazy(() =>
  import("./pages/register/register-and-login.component")
);
const LandingPage = lazy(() => import("./pages/landing/landing.component"));
const ErrorPage = lazy(() => import("./pages/error/error.component"));

const AddJob = lazy(() => import("./pages/dashboard/add-job.component"));
const AllJobs = lazy(() => import("./pages/dashboard/all-jobs.component"));
const Profile = lazy(() => import("./pages/dashboard/profile.component"));
const SharedLayout = lazy(() =>
  import("./pages/dashboard/shared-layout/shared-layout.component.js")
);
const Stats = lazy(() => import("./pages/dashboard/stats.component"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <nav>
            <Link to='/'>Dashboard</Link>
            <Link to='/register'>Register</Link>
            <Link to='/landing'>Landing</Link>
          </nav> */}

          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <SharedLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Stats />} />
              <Route path='add-job' element={<AddJob />} />
              <Route path='all-jobs' element={<AllJobs />} />
              <Route path='profile' element={<Profile />} />
            </Route>
            <Route path='/register' element={<RegisterAndLoginPage />} />
            <Route path='/landing' element={<LandingPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
