import { useEffect, useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { MenuIcon } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../Firebase/firebase.config";
import { motion } from "framer-motion";
import {
	FaHome,
	FaBook,
	FaHandHoldingHeart,
	FaDonate,
	FaSearch,
	FaSignInAlt,
	FaUserPlus,
	FaUser,
	FaTachometerAlt,
	FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
	const { user, logOut } = useAuth();
	const [showDisplayName, setShowDisplayName] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const { pathname } = useLocation();

	const handleEvent = () => {
		logOut(auth).then(() => {
			console.log("logout");
		});
	};

	// Add scroll event listener
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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
		<motion.div
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className={`fixed top-0 left-0 right-0 z-50 flex h-20 w-full items-center px-4 md:px-6 transition-all duration-300 ${
				scrolled
					? "bg-white shadow-md"
					: "bg-gradient-to-r from-red-50 to-white"
			}`}
		>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="lg:hidden hover:bg-red-50 border-red-200 transition-all"
					>
						<MenuIcon className="h-6 w-6 text-red-600" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="bg-white shadow-lg rounded-lg border-r-2 border-red-100"
				>
					<div className="flex justify-center mb-8 mt-4">
						<img
							src="https://i.ibb.co.com/k2Q5f2fz/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donatio.png"
							alt="Logo"
							className="w-12 h-12"
						/>
						<span className="text-2xl font-bold text-red-600 ml-2 self-center">
							Blood Donation
						</span>
					</div>
					<div className="grid gap-4 py-6">
						<Link
							to="/"
							className={`flex items-center py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
								isActive("/")
									? "bg-red-100 text-red-700"
									: "text-gray-700 hover:bg-red-50 hover:text-red-600"
							}`}
						>
							<FaHome className="mr-3" /> Home
						</Link>
						<Link
							to="/blog"
							className={`flex items-center py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
								isActive("/blog")
									? "bg-red-100 text-red-700"
									: "text-gray-700 hover:bg-red-50 hover:text-red-600"
							}`}
						>
							<FaBook className="mr-3" /> Blog
						</Link>
						<Link
							to="/donation-requests"
							className={`flex items-center py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
								isActive("/donation-requests")
									? "bg-red-100 text-red-700"
									: "text-gray-700 hover:bg-red-50 hover:text-red-600"
							}`}
						>
							<FaHandHoldingHeart className="mr-3" /> Donation Requests
						</Link>
						{user ? (
							<>
								<Link
									to="/funding"
									className={`flex items-center py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
										isActive("/funding")
											? "bg-red-100 text-red-700"
											: "text-gray-700 hover:bg-red-50 hover:text-red-600"
									}`}
								>
									<FaDonate className="mr-3" /> Funding
								</Link>
								<Link
									to={`/dashboard/profile/${user.email}`}
									className={`flex items-center py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
										pathname.includes("/dashboard")
											? "bg-red-100 text-red-700"
											: "text-gray-700 hover:bg-red-50 hover:text-red-600"
									}`}
								>
									<FaUser className="mr-3" /> Dashboard
								</Link>
								<hr className="my-2 border-t border-gray-200" />
								<button
									className="flex items-center py-3 px-4 text-lg font-medium rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left"
									onClick={handleEvent}
								>
									<FaSignOutAlt className="mr-3" /> Log Out
								</button>
							</>
						) : (
							<>
								<Link
									to="/login"
									className={`flex items-center py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
										isActive("/login")
											? "bg-red-100 text-red-700"
											: "text-gray-700 hover:bg-red-50 hover:text-red-600"
									}`}
								>
									<FaSignInAlt className="mr-3" /> Log In
								</Link>
								<Link
									to="/register"
									className={`flex items-center py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
										isActive("/register")
											? "bg-red-100 text-red-700"
											: "text-gray-700 hover:bg-red-50 hover:text-red-600"
									}`}
								>
									<FaUserPlus className="mr-3" /> Register
								</Link>
							</>
						)}
					</div>
				</SheetContent>
			</Sheet>

			<Link to="/" className="flex items-center">
				<img
					src="https://i.ibb.co.com/k2Q5f2fz/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donatio.png"
					alt="Logo"
					className="w-12 h-12 mr-3"
				/>
				<span
					className={`text-2xl font-bold ${
						scrolled ? "text-red-600" : "text-red-600"
					} tracking-tight`}
				>
					Blood Donation
				</span>
			</Link>

			<motion.div className="ml-auto hidden lg:flex items-center gap-6">
				<Link
					to="/"
					className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-colors ${
						isActive("/")
							? "bg-red-600 text-white"
							: "text-gray-700 hover:bg-red-50 hover:text-red-600"
					}`}
				>
					<FaHome className="text-lg" /> Home
				</Link>
				<Link
					to="/blog"
					className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-colors ${
						isActive("/blog")
							? "bg-red-600 text-white"
							: "text-gray-700 hover:bg-red-50 hover:text-red-600"
					}`}
				>
					<FaBook className="text-lg" /> Blog
				</Link>
				<Link
					to="/donation-requests"
					className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-colors ${
						isActive("/donation-requests")
							? "bg-red-600 text-white"
							: "text-gray-700 hover:bg-red-50 hover:text-red-600"
					}`}
				>
					<FaHandHoldingHeart className="text-lg" /> Donation Requests
				</Link>
				<Link
					to="/search"
					className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-colors ${
						isActive("/search")
							? "bg-red-600 text-white"
							: "text-gray-700 hover:bg-red-50 hover:text-red-600"
					}`}
				>
					<FaSearch className="text-lg" /> Find Donors
				</Link>

				{user ? (
					<>
						<Link
							to="/funding"
							className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-colors ${
								isActive("/funding")
									? "bg-red-600 text-white"
									: "text-gray-700 hover:bg-red-50 hover:text-red-600"
							}`}
						>
							<FaDonate className="text-lg" /> Funding
						</Link>
						<div className="relative">
							<div
								className="flex items-center gap-2 cursor-pointer"
								onMouseEnter={() => setShowDisplayName(true)}
								onMouseLeave={() => setShowDisplayName(false)}
								onClick={() => setDropdownOpen(!dropdownOpen)}
							>
								<div className="relative">
									{user.photoURL ? (
										<img
											src={user.photoURL}
											alt="User Avatar"
											className="h-10 w-10 rounded-full object-cover border-2 border-red-400 hover:border-red-600 transition-all duration-300"
										/>
									) : (
										<div className="h-10 w-10 rounded-full bg-red-200 flex items-center justify-center border-2 border-red-400 text-red-600 font-semibold">
											{user.displayName?.charAt(0) || user.email?.charAt(0)}
										</div>
									)}
									<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
								</div>
								{showDisplayName && (
									<motion.span
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="absolute top-full right-0 mt-2 bg-white text-gray-800 text-sm py-1 px-3 rounded-lg shadow-lg z-10 border border-gray-200"
									>
										{user.displayName}
									</motion.span>
								)}
							</div>
							{dropdownOpen && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden"
								>
									<div className="px-4 py-3 border-b border-gray-200">
										<p className="text-sm font-medium text-gray-900">
											{user.displayName}
										</p>
										<p className="text-xs text-gray-500 truncate">
											{user.email}
										</p>
									</div>

									<div className="py-2">
										<Link
											to={`/dashboard/profile/${user.email}`}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
										>
											<div className="flex items-center">
												<FaUser className="mr-2" />
												Your Profile
											</div>
										</Link>
										<Link
											to="/dashboard"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
										>
											<div className="flex items-center">
												<FaTachometerAlt className="mr-2" />
												Dashboard
											</div>
										</Link>
									</div>

									<div className="py-2 border-t border-gray-200">
										<button
											className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
											onClick={handleEvent}
										>
											<div className="flex items-center">
												<FaSignOutAlt className="mr-2" />
												Log Out
											</div>
										</button>
									</div>
								</motion.div>
							)}
						</div>
					</>
				) : (
					<>
						<Link
							to="/login"
							className="flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow-sm"
						>
							<FaSignInAlt /> Log In
						</Link>
						<Link
							to="/register"
							className="flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
						>
							<FaUserPlus /> Register
						</Link>
					</>
				)}
			</motion.div>
		</motion.div>
	);
};

export default Navbar;
