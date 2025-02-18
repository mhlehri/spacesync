import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { DButton } from "../components/AnimatedButton";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { TUser } from "@/types/user";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUser>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const onSubmit = async (data: TUser) => {
    data.role = "user";
    // console.log("data =>", data);
    try {
      const res = await signup(data);
      if (res.error) {
        // @ts-expect-error - error is not null
        throw new Error(res.error.data.message);
      }
      toast.success("Account created successfully", {
        richColors: true,
        position: "top-center",
      });
      navigate("/login", {
        state: { message: "Account created successfully. Please log in." },
      });
    } catch (err) {
      // console.log((err as Error).message);
      if ((err as Error).message.includes("E11000 duplicate key")) {
        setError("Email already exists. Please use a different email.");
        return;
      }
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register("phone", {
                required: "Phone number is required",
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <DButton disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "Submitting.." : "Sign Up"}
          </DButton>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
        <p className="mt-4 text-gray-400">
          Already have an account?{" "}
          <Link className="text-black underline font-bold" to={`/login`}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
