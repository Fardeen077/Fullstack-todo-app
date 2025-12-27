import { useState } from "react"
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {

    const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [loginUser, setLoginUser] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginUser = async () => {
    try {
      setLoading(true);
      setError(null)
      // console.log(formData);
      const data = await login(formData);
      console.log("User registered:", data);
      login(data.user, data.token);
      navigate("/")
    } catch (error) {
      setError(error.message || "something went wrong");
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex bg-black w-80 items-center justify-center mt-10 rounded-2xl mx-auto">
      <div className="flex flex-col gap-6 p-6 w-full">
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={(e) =>
            setformData({ ...formData, [e.target.name]: e.target.value })
          }
          className="bg-gray-200 p-2 rounded"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={(e) =>
            setformData({ ...formData, [e.target.name]: e.target.value })
          }
          className="bg-gray-200 p-2 rounded"
        />

        <button
          onClick={handleLoginUser}
          disabled={loading}
          className="bg-blue-400 text-white font-semibold py-2 rounded mb-4"
        >
          {loading ? "Login user..." : "Submit"}
        </button>

        {error && <p className="text-red-400">{error}</p>}
      </div>
    </div>
  );
}

export default Login