import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/protected-route.component";
import Spinner from "./components/spinner/spinner.component";

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

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RegisterAndLoginPage from "./pages/register/register-and-login.component";
// import LandingPage from "./pages/landing/landing.component";
// import ErrorPage from "./pages/error/error.component";
// import AddJob from "./pages/dashboard/add-job.component";
// import AllJobs from "./pages/dashboard/all-jobs.component";
// import Profile from "./pages/dashboard/profile.component";
// import SharedLayout from "./pages/dashboard/shared-layout/shared-layout.component";
// import Stats from "./pages/dashboard/stats.component";
// import ProtectedRoute from "./pages/protected-route.component";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path='/'
//           element={
//             <ProtectedRoute>
//               <SharedLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Stats />} />
//           <Route path='all-jobs' element={<AllJobs />} />
//           <Route path='add-job' element={<AddJob />} />
//           <Route path='profile' element={<Profile />} />
//         </Route>
//         <Route path='/register' element={<RegisterAndLoginPage />} />
//         <Route path='/landing' element={<LandingPage />} />
//         <Route path='*' element={<ErrorPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
