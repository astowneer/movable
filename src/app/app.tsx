import { AppHeader } from "@/features/header";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <Outlet />
    </div>
  );
}
