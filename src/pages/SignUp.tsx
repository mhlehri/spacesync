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
    <div className="py-10 flex justify-center items-center h-[80dvh] w-full ">
      <div className="flex w-full max-w-3xl border border-indigo-400 bg-white text-indigo-400 relative overflow-hidden">
        <span className="absolute -right-9 -top-8 z-20 h-32 w-32 rounded-full bg-indigo-600 duration-500 group-hover:h-56 group-hover:w-56"></span>
        <span className="absolute -right-6 -top-5 z-10 h-36 w-36 rounded-full bg-indigo-400"></span>
        <div className="p-10 bg-white rounded-lg shadow-xl w-full">
          <h1 className="text-2xl font-bold ">Sign Up</h1>
          <p className="mb-6 text-gray-400">
            Fill the form to create an account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between *:w-full flex-col md:flex-row gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
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
            </div>
            <div className="flex justify-between *:w-full flex-col md:flex-row gap-4">
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
              {isSubmitting ? "Submitting.." : "Complete"}
            </DButton>
          </form>
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
          <p className="mt-4 text-gray-400">
            Already have an account?{" "}
            <Link className="text-indigo-500 underline font-bold" to={`/login`}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
