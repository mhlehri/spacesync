import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectCurrentToken } from "@/redux/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DButton } from "../components/AnimatedButton";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

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

  const [login, { data: MData }] = useLoginMutation();
  console.log(MData);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log(data);
      const res = await login(data);

      if (res.error) {
        // @ts-expect-error - error is not null
        throw new Error(res?.error?.data?.message);
      }
      console.log(res.data);
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
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
      </div>
    </div>
  );
}
