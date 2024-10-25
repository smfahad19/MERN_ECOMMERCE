import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700 shadow-lg">
      {/* Toggle Menu Button */}
      <Button 
        onClick={() => setOpen(true)} 
        className="lg:hidden sm:block flex items-center justify-center p-2 rounded-full hover:bg-gray-700 transition duration-300"
      >
        <AlignJustify className="text-white" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      {/* Logout Button */}
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          <LogOut className="text-white" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
