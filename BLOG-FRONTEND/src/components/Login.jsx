import { useForm } from "react-hook-form";
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  linkClass,
  loadingClass,
} from "../styles/common";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import {toast} from 'react-hot-toast'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  //get state from auth store
  const { login, currentUser, loading, error, isAuthenticated } = useAuth((state) => state);
  //on user login
  const onUserLogin = async (userCredObj) => {
    //call login() of auth store
    await login(userCredObj);
  };

  useEffect(() => {
    //navigation logic
    if (isAuthenticated === true) {
      if (currentUser.role === "USER") {
        //show cuccess toast
        toast.success("Login success and redirecting to User Profile",{duration:2000})
        navigate("/user-profile");
      }
      if (currentUser.role === "AUTHOR") {
         toast.success("Login success and redirecting to Author Profile",{duration:2000})
        navigate("/author-profile");
      }
      if (currentUser.role === "ADMIN") {
         toast.success("Login success and redirecting to Admin Profile",{duration:2000})
        navigate("/admin-profile");
      }
    }
  }, [currentUser?.role, isAuthenticated, navigate]);

  //deal with loading
  if (loading) {
    return <p className={loadingClass}>Loading....</p>;
  }

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <div className={formCard}>
        {/* Title */}
        <h2 className={formTitle}>Sign In</h2>

        {/* API error */}
        {error && <p className={errorClass}>{error}</p>}

        <form onSubmit={handleSubmit(onUserLogin)}>
          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={inputClass}
              {...register("email", {
                required: "Email is required",

                validate: (value) => value.trim().length > 0 || "Email cannot be empty",
              })}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={inputClass}
              {...register("password", {
                required: "Password is required",
                validate: (value) => value.trim().length > 0 || "Password cannot be empty",
              })}
            />
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          {/* Forgot password */}
          <div className="text-right -mt-2 mb-4">
            <a href="/forgot-password" className={`${linkClass} text-xs`}>
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button type="submit" className={submitBtn} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className={`${mutedText} text-center mt-5`}>
          Don't have an account?{" "}
          <NavLink to="/register" className={linkClass}>
            Create one
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
