
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Topbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-end items-center py-4 px-6 bg-white border-b sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <div className="hidden md:flex flex-col items-end text-right mr-4">
              <span className="font-medium text-sm">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
            <Button
              variant="destructive"
              className="flex items-center gap-2 py-2 px-4"
              onClick={handleLogout}
            >
              <LogOut className="mr-1 h-5 w-5" />
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Topbar;
