import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Login() {

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLoginUser = async (e) => {
    e.preventDefault();
    if(isLoading) return
    try {
      setError(null)
      await login(formData);
      navigate("/")
    } catch (error) {
      setError(error.message || "something went wrong");
    }
  }
  return (
    <div className="flex bg-gray-100 w-80 items-center justify-center mt-40 rounded-2xl mx-auto shadow-2xl">
      <form onSubmit={handleLoginUser} className="flex flex-col gap-6 p-6 w-full">
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
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-400 text-white p-2 px-10 rounded transition-colors mt-4 cursor-pointer">
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin inline mr-2" />
              Login Account...
            </>
          ) : (
            "Login"
          )}
        </button>

        {error && <p className="text-red-400">
          {error}</p>}
        <p className="text-sm text-center text-gray-600 mt-4">
          you don't have account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Login