import { ShipWheel } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import videoCall from "../assets/videocallpanel.png";
import { SignInAPI } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useThemeStore } from "../store/useThemeStore";

export const LoginPage: React.FC = () => {
    const {theme} = useThemeStore();
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    try {
      const response = await SignInAPI(loginData);
      console.log("Sign-up successful:", response);

      if (response.status === 200) {
        console.log("Sign-up successful:", response.data);
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      console.error("Sign-up failed:", err);
      if (err.response) {
        setError(err.response.data.message || "An error occurred");
      } else {
        setError(err.message || "An error occurred");
      }
    }
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
     data-theme={theme}
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col ">
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheel className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary -tracking-wider">
              videoON
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4 text-white">
              <span>{error}</span>
            </div>
          )}

          <div className="w-full ">
            <form onSubmit={handleSignIn}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account and continue connecting with friends
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-10">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter strong password"
                    className="input input-bordered w-full"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <button className="btn btn-primary w-full mt-4" type="submit">
                  Sign In
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Don't have an account ?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src={videoCall}
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with loving partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
