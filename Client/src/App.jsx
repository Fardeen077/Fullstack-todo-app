import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Avatar from "./pages/Avatar";

function App() {
  const { getUser, isLoading } = useAuthStore();
  useEffect(() => {
   getUser();
  }, []);
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/*  default router */}
        <Route path="/" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>
        } />
           <Route path="/avatar" element={<ProtectedRoute>
          <Avatar />
        </ProtectedRoute> }/>

        <Route path="/login" element={<PublicRoute>
          <Login />
        </PublicRoute>
        } />

        <Route path="/register" element={<PublicRoute>
          <Register />
        </PublicRoute>
        } />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
