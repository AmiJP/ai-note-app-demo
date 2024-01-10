import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import { Profile } from "./Profile";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard } from "lucide-react";

export function Navbar() {
  const auth = useAuth();

  return (
    <div>
      <nav className="h-16 bg-slate-100 flex justify-between items-center px-4">
        <div>
          <Link to={auth.user ? "/dashboard" : "/"}>
            <h1 className="text-2xl font-bold text-slate-900">Ai Note</h1>
          </Link>
        </div>
        {(() => {
          if (auth.user == null) {
            return (
              <div className="flex gap-3">
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </div>
            );
          } else {
            return (
              <div className="flex justify-between items-center gap-5">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard size={30} /> Dashboard
                </Link>
                <Profile />
              </div>
            );
          }
        })()}
      </nav>
      <Outlet />
    </div>
  );
}
