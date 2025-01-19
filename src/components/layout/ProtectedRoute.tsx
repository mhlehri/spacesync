import { useAppSelector } from "@/redux/hook";
import { selectCurrentToken } from "@/redux/store";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector(selectCurrentToken);
  if (!token) {
    return <Navigate to={`/login`} replace />;
  }
  return <div>{children}</div>;
}
