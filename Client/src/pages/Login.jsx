import { useState } from "react"
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function Login() {

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [loginUser, setLoginUser] = useState(null);
  const { login , isAuth} = useAuthStore();
  const navigate = useNavigate();

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null)
      console.log(formData);
      await login(formData);
      navigate("/")
    } catch (error) {
      setError(error.message || "something went wrong");
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex bg-black w-80 items-center justify-center mt-10 rounded-2xl mx-auto">
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

        <button type="submit" disabled={isAuth}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-400 text-white p-2 px-10 rounded transition-colors mx-auto mt-4">
          {isAuth ? (
            <>
              <loading className="h-5 w-5 animate-spin" />
              Login Account...
            </>
          ) : (
            "Login"
          )}
        </button>

        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}

export default Login