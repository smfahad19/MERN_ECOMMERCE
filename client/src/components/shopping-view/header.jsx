import { House, LogOut, Menu, ShoppingCart, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home"
        ? {
            category: [getCurrentMenuItem.id]
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-3 lg:mb-0 lg:items-center">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer text-gray-300 hover:text-white transition-transform transform hover:scale-105"
          key={menuItem.id}
          to={menuItem.path}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="flex gap-4 lg:gap-6 items-center">
      {/* Cart Button */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="p-2 rounded-full border border-gray-600 hover:border-gray-400 transition duration-300"
        >
          <ShoppingCart className="h-6 w-6 text-gray-300 hover:text-white transition-transform transform hover:scale-110" />
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer border border-gray-600 hover:border-blue-500 transition duration-300 rounded-full">
            <AvatarFallback
              className="bg-black text-white font-extrabold flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12"
            >
              {user?.userName ? user.userName[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="w-64 p-2 bg-white mt-2 drop-shadow-lg rounded-lg border border-gray-200"
        >
          <DropdownMenuLabel className="font-semibold text-gray-800">
            Logged in as {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="flex items-center cursor-pointer gap-2 text-gray-600 hover:bg-gray-100 p-2 rounded-md transition duration-300"
          >
            <UserRound className="h-5 w-5" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-red-50 p-2 rounded-md transition duration-300"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-gray-900">
      <div className="flex h-16 items-center justify-between px-6 md:px-8">
        <Link to="/shop/home" className="flex items-center gap-2 text-white hover:text-gray-400 transition duration-300">
          <House className="h-8 w-8" />
          <span className="font-bold text-xl">FM-SWX</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden p-2 rounded-full hover:bg-gray-700 transition duration-300">
              <Menu className="h-7 w-7 text-white" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-gray-800 text-white">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:flex lg:items-center gap-6">
          <MenuItems />
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
