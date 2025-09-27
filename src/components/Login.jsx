import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import bcrypt from "bcryptjs";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png"; 
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !user) {
        throw new Error("Invalid email or password.");
      }

      if (user.status === "Inactive") {
        throw new Error("Your account has been deactivated. Please contact the administrator.");
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid email or password.");
      }

      if (user.role === "Student") {
        throw new Error("Student accounts cannot log in here.");
      }

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      if (user.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "Teacher") {
        navigate("/teacher-dashboard");
      } else {
        throw new Error("Unauthorized role.");
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <aside className="login-left">
        <img src={logo} alt="LearnFusion Logo" className="logo" />
        <h2 className="tagline">ELEVATE YOUR SKILLS WITH LEARNFUSION</h2>
      </aside>

      <main className="login-right">
        <div className="login-form-wrapper">
          <h1 className="brand-title">
            <span className="highlight">Learn</span>
            <span className="fusion">Fusion</span>
          </h1>

          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              required
            />

            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                required
              />
              <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="password-toggle-btn" aria-label={isPasswordVisible ? "Hide password" : "Show password"}>
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>

            <div className="button-container">
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            {error && <p className="login-error-message">{error}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
