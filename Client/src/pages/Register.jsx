import { useState } from "react"
import useAuthStore from "../store/useAuthStore"
import { Link, useNavigate } from "react-router-dom"

function Register() {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {

      setError(null);
      await register(formData);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Registration failed. Please try again.");
    }
  }
  return (
    <div className="flex bg-gray-100 w-80 items-center justify-center mt-40 rounded-2xl mx-auto shadow-2xl">
      <form onSubmit={handleRegisterUser} className="flex flex-col gap-6 p-6 w-full">
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="username"
          onChange={(e) =>
            setformData({ ...formData, username: e.target.value })
          }
          className="bg-gray-200 p-2 rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={(e) =>
            setformData({ ...formData, email: e.target.value })
          }
          className="bg-gray-200 p-2 rounded"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={(e) =>
            setformData({ ...formData, password: e.target.value })
          }
          className="bg-gray-200 p-2 rounded"
        />

        <button type="submit" disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-400 text-white p-2 px-10 rounded transition-colors cursor-pointer">
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin inline mr-2" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        {error && <p className="text-red-400">{error}</p>}
        <p className="text-sm text-center text-gray-600 mt-4">
          you have already account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register