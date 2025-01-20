import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/store";
import { Navigate } from "react-router-dom";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector(selectCurrentUser);
  if (!user || user.role !== "admin") {
    return <Navigate to={`/login`} replace />;
  }
  return <div>{children}</div>;
}
