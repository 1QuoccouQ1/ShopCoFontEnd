import { Search, ShoppingCart, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartDropdown } from "./cart-dropdown";
import { SearchDropdown } from "./search-dropdown";
import { useEffect, useState } from "react";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showBanner, setShowBanner] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("jwt");

    if (storedUser && storedToken) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div
        className={`bg-white sticky top-0 z-50  ${
          isScrolled ? "shadow-md" : "shadow-none"
        } transition-shadow duration-300`}
      >
        {/* Promotional Banner */}
        {showBanner && !isLoggedIn && (
          <div className="bg-black text-white py-2 px-4 text-center justify-center flex text-sm">
            <div className="flex items-center justify-between gap-2 w-full tracking-wide max-w-7xl">
              <div></div>
              <div>
                <span>Sign up and get 20% off to your first order. </span>
                <button className="underline hover:no-underline cursor-pointer">
                  <Link to="/login">Sign Up Now</Link>
                </button>
              </div>
              <button
                className="cursor-pointer"
                onClick={() => setShowBanner(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="border-b border-gray-200 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-black text-black ">
              <Link to="/">SHOP.CO</Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {/* Wrapper */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-700 hover:text-black py-2">
                  <span className="font-medium">Shop</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute size-14 top-0 left-0"></div>

                {/* Dropdown */}
                <div
                  className="absolute left-0 top-full mt-2 w-[900px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-6
      grid grid-cols-4 gap-8
      opacity-0 translate-y-2 scale-95 invisible
      group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:visible
      transition-all duration-300 ease-out"
                >
                  <div>
                    <h3 className="font-semibold mb-3">Featured</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <a href="#" className="hover:text-black">
                          New & Upcoming
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-black">
                          Bestsellers
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-black">
                          Jordan
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Trending</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <a href="#" className="hover:text-black">
                          Summer Essentials
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-black">
                          Retro Running
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Shop Icons</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <a href="#" className="hover:text-black">
                          Air Force 1
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-black">
                          Air Max
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Shop by Sport</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <a href="#" className="hover:text-black">
                          Running
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-black">
                          Football
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-black">
                          Basketball
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <a href="#" className="text-gray-700 hover:text-black">
                On Sale
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                New Arrivals
              </a>
              <a href="/FindOrder" className="text-gray-700 hover:text-black">
                Find Order
              </a> 
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <SearchDropdown />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <CartDropdown />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 border-slate-200"
                >
                  {isLoggedIn ? (
                    <>
                      <div className="px-2 py-3">
                        <p className="text-sm font-medium">
                          {" "}
                          {user?.firstName
                            ? `${user.firstName} ${user.lastName || ""}`
                            : user?.username || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/Profile" className="w-full">
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/Orders" className="w-full">
                          View Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={handleLogout}
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <div className="px-2 py-3">
                        <p className="text-sm font-medium">
                          Welcome to SHOP.CO
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Sign in to access your account
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/login" className="w-full font-medium">
                          Login
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/register" className="w-full">
                          Create Account
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/Orders" className="w-full">
                          Tracking Order
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Nav;
