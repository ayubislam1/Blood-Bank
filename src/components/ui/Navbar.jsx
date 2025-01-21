import { useEffect, useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router"; 
import { MenuIcon } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../Firebase/firebase.config";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showDisplayName, setShowDisplayName] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { pathname } = useLocation(); 

  const handleEvent = () => {
    logOut(auth).then(() => {
      console.log("logout");
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6 border-b bg-gradient-to-r  -mb-2">
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden hover:bg-opacity-80 transition-all ">
            <MenuIcon className="h-6 w-6 text-black bg-red" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-white shadow-lg rounded-lg transition-transform ease-in-out">
          <div className="grid gap-2 py-6">
            <Link
              to="/"
              className={`flex w-full text-red-500 items-center py-2 text-lg font-semibold  hover:text-red-500 transition-colors `}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className={`flex w-full items-center py-2 text-lg font-semibold text-red-500 hover:text-red-500 transition-colors `}
            >
              Blog
            </Link>
            <Link
              to="/donation-requests"
              className={`flex w-full items-center py-2 text-lg font-semibold text-red-500 hover:text-red-500 transition-colors`}
            >
              Donation Requests
            </Link>
            {user ? (
              <>
                <Link
                  to="/funding"
                  className={`flex w-full items-center py-2 text-lg font-semibold text-red-500 hover:text-red-500 transition-colors `}
                >
                  Funding
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold text-red-500 hover:text-red-500 transition-colors"
                  onClick={handleEvent}
                >
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex w-full items-center py-2 text-lg font-semibold text-red-500 hover:text-red-500 transition-colors `}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className={`flex w-full items-center py-2 text-lg font-semibold text-red-500 hover:text-red-500 transition-colors `}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>


      <Link href="#" className="mr-6 hidden lg:flex items-center">
        <img src="https://w7.pngwing.com/pngs/2/954/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donation-thumbnail.png" alt="Logo" className="w-10 h-10 mr-1 rounded-lg shadow-md" />
        <span className="text-3xl bg-none text-red-500 font-semibold tracking-wider">
          <i>Blood Donation</i>
        </span>
      </Link>

    
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          to="/"
          className={`group inline-flex h-9 px-4 texy py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-colors ${isActive('/') ? 'bg-red-500 text-white' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/blog"
          className={`group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-colors ${isActive('/blog') ? 'bg-red-500 text-white' : ''}`}
        >
          Blog
        </Link>
        <Link
          to="/donation-requests"
          className={`group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-colors ${isActive('/donation-requests') ? 'bg-red-500 text-white' : ''}`}
        >
          Donation Requests
        </Link>
        {user ? (
          <>
            <Link
              to="/funding"
              className={`group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-colors ${isActive('/funding') ? 'bg-red-500 text-white' : ''}`}
            >
              Funding
            </Link>
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setShowDisplayName(true)}
                onMouseLeave={() => setShowDisplayName(false)}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={user.photoURL || 'path_to_default_avatar'}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full border-2 border-white hover:ring-2 ring-red-400"
                />
                {showDisplayName && (
                  <span className="absolute  top-full mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded-md shadow-md z-10 transition-all ease-in-out">
                    {user.displayName}
                  </span>
                )}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-50 border border-red-300">
                  {user && (
                    <Link
                      to={`/dashboard/profile/${user.email}`}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 "
                    >
                      Dashboard
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-400 hover:text-white transition-all"
                    onClick={handleEvent}
                  >
                    Log Out
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-colors ${isActive('/login') ? 'bg-red-500 text-white' : ''}`}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className={`group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-colors ${isActive('/register') ? 'bg-red-500 text-white' : ''}`}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
