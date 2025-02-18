import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectCurrentToken } from "@/redux/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "@/components/ui/button";
import { DButton } from "@/components/AnimatedButton";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  const [login] = useLoginMutation();
  // console.log(MData);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFormData) => {
    try {
      // console.log(data);
      const res = await login(data);

      if (res.error) {
        // @ts-expect-error - error is not null
        throw new Error(res?.error?.data?.message);
      }
      // console.log(res.data);
      // Store the user info in localStorage or a global state management solution
      dispatch(setUser({ user: res.data.data, token: res.data.token }));
      // console.log(user);
      toast.success("Login successful", {
        richColors: true,
        position: "top-center",
      });
      navigate("/");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (token) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="py-10 flex justify-center items-center h-[80dvh] w-full">
      <div className="group mx-auto flex w-full max-w-xl border border-indigo-400 bg-white text-indigo-400 shadow-lg dark:bg-zinc-900">
        <div className="relative hidden min-h-[110%] w-1/3 overflow-hidden bg-indigo-400 sm:block">
          <h1 className="absolute bottom-3 right-3 text-right text-2xl font-semibold text-white">
            Hey! <br /> Welcome to
            <br /> SpaceSync
          </h1>
          <span className="absolute -left-8 -top-8 z-20 h-32 w-32 rounded-full bg-indigo-800/20 duration-500 group-hover:h-56 group-hover:w-56"></span>
          <span className="absolute -left-5 -top-5 z-10 h-36 w-36 rounded-full bg-indigo-800/50"></span>
        </div>
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          {location.state?.message && (
            <p className="text-green-500 text-sm mb-4 text-center">
              {location.state.message}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <DButton disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? "Loading..." : "Login"}
            </DButton>
          </form>
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
          <p className="mt-4 text-gray-400">
            Don't have an account?{" "}
            <Link
              className="text-indigo-500 underline font-bold"
              to={`/signup`}
            >
              Signup
            </Link>
          </p>
          <div className="mt-5 flex gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                onSubmit({
                  email: "user@gmail.com",
                  password: "user1234",
                });
              }}
            >
              login as user
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                onSubmit({
                  email: "admin@gmail.com",
                  password: "admin123",
                });
              }}
            >
              login as admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
