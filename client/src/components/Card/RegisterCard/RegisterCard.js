import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./RegisterCard.css";
import { supabase } from "../../../lib/supabase";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const RegisterCard = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 1. Added new state
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [errors, setErrors] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  // --- Validate Username with Debounce + Loader ---
  useEffect(() => {
    // do nothing if not touched
    if (!usernameTouched) return;

    if (!username) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
      return;
    }

    // basic pattern validation first
    if (!/^[A-Za-z0-9_]*$/.test(username)) {
      setErrors((prev) => ({
        ...prev,
        username: "Username can only contain letters, numbers, and underscores",
      }));
      return;
    }

    if (username.length < 3) {
      setErrors((prev) => ({
        ...prev,
        username: "Username must be at least 3 characters long",
      }));
      return;
    }

    // Debounce logic
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setIsChecking(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/check-username?username=${username}`
        );

        if (res.data.exists) {
          setErrors((prev) => ({
            ...prev,
            username: "This username is already taken",
          }));
        } else {
          setErrors((prev) => ({ ...prev, username: "" }));
        }
      } catch (err) {
        console.error("Error validating username:", err);
        setErrors((prev) => ({
          ...prev,
          username: "Could not validate username, try again",
        }));
      } finally {
        setIsChecking(false);
      }
    }, 600);
  }, [username]);

  // --- Validation Functions ---
  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) ? true : "Enter a valid email address";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return true;
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) return "Passwords do not match";
    return "";
  };

  // --- Handle Change with Validation ---
  const handleChange = async (field, value) => {
    if (field === "username") setUsername(value);
    if (field === "email") {
      setEmail(value);
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
    if (field === "password") {
      setPassword(value);
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
    if (field === "confirmPassword") {
      setConfirmPassword(value);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(value),
      }));
    }
  };

  // --- Password Strength Function ---
  const passwordEdgeCases = (pwd) => {
    let score = 0;
    if (pwd.trim().length >= 6) score++;
    if (/\d/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++;
    return score;
  };

  // --- Password Strength Logic ---
  const strengthLevels = [
    { level: "Very Weak", color: "red" },
    { level: "Weak", color: "orange" },
    { level: "Medium", color: "yellow" },
    { level: "Strong", color: "green" },
    { level: "Very Strong", color: "emerald" },
  ];

  const handlePasswordChange = (value) => {
    setPassword(value);
    const score = passwordEdgeCases(value);
    setPasswordStrength(strengthLevels[score - 1] || strengthLevels[0]);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // 3. Added validation check
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return; // Stop submission if passwords don't match
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
        { username, email, password }
      );

      // Store JWT token
      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("storage"));

      alert("Registration successful! Logged in.");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data.message || error.message;
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  const handleOAuthRegister = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });

    if (error) {
      console.error("OAuth error:", error.message);
      alert("OAuth sign-in failed");
    }
  };

  return (
    <div className="register__card__container">
      <div className="register__card">
        <div className="oauth__icon__row">
          <button
            className="oauth-icon-btn"
            onClick={() => handleOAuthRegister("google")}
          >
            <FcGoogle size={28} />
          </button>
          <button
            className="oauth-icon-btn"
            onClick={() => handleOAuthRegister("github")}
          >
            <FaGithub size={28} />
          </button>
        </div>

        <div className="oauth__divider">
          <span>---------------- OR ----------------</span>
        </div>

        <form onSubmit={handleRegister}>
          <div className="register__inputs">
            <div className="reg__input__container">
              <label className="input__label">Username</label>
              <div className="input-with-loader">
                <input
                  type="text"
                  className="register__input"
                  value={username}
                  onFocus={() => setUsernameTouched(true)}
                  onChange={(e) => handleChange("username", e.target.value)}
                  required
                />
                {/* Loader */}
                {isChecking && <div className="loader"></div>}
              </div>
              {errors.username && (
                <p className="error-message">{errors.username}</p>
              )}
            </div>

            <div className="reg__input__container">
              <label className="input__label">Email</label>
              <input
                type="email"
                className="register__input"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="example@gmail.com"
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="reg__input__container">
              <label className="input__label">Password</label>
              <input
                type="password"
                className="register__input"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Password"
                required
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
              {password && passwordStrength && (
                <p className={`strength-text ${passwordStrength.color}`}>
                  {passwordStrength.level}
                </p>
              )}
            </div>

            {/* 2. Added Confirm Password Field */}
            <div className="reg__input__container">
              <label className="input__label">Confirm Password</label>
              <input
                type="password"
                className="register__input"
                value={confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm password"
                required
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="register__button__container">
              <button type="submit" className="register__button">
                Create Account
              </button>
            </div>
          </div>
        </form>

        <div className="register__other__actions">
          <div className="register__login__account">
            Already have an account? <Link to="/account/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
