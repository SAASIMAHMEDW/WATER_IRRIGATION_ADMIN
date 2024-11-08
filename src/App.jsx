import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

// Import components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Requests from "./pages/Requests"; // Requests component
import Users from "./pages/Users";      // Users component
import Dashboard from "./pages/Dashboard";        // Data component
import AUser from "./pages/AUser";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Define routes with nested routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated === null ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <Home />
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        {
          path: "home",
          // element: <Home />,
          children: [
            {
              path: "requests",
              element: <Requests />,
            },
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path:"user/:uid",
              element : <AUser/>
            }
          ],
        },
      ],
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "*",
      element: <h1>NO PAGE FOUND</h1>,
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
