import { useEffect, useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { MenuIcon } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../Firebase/firebase.config";

const Navbar = () => {
	const { user, logOut } = useAuth();
	const [showDisplayName, setShowDisplayName] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

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

	return (
		<header className="flex h-20 w-full items-center px-4 md:px-6 border-b bg-gradient-to-r from-red-500 to-pink-500 shadow-lg">
		
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="lg:hidden">
						<MenuIcon className="h-6 w-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="bg-white shadow-lg">
					<div className="grid gap-2 py-6">
						<Link
							to="/"
							className="flex w-full items-center py-2 text-lg font-semibold text-gray-800 hover:text-red-500 transition-colors"
						>
							Home
						</Link>
						<Link
							to="/blog"
							className="flex w-full items-center py-2 text-lg font-semibold text-gray-800 hover:text-red-500 transition-colors"
						>
							Blog
						</Link>
						<Link
							to="/donation-requests"
							className="flex w-full items-center py-2 text-lg font-semibold text-gray-800 hover:text-red-500 transition-colors"
						>
							Donation Requests
						</Link>
						{user ? (
							<>
								<Link
									to="/funding"
									className="flex w-full items-center py-2 text-lg font-semibold text-gray-800 hover:text-red-500 transition-colors"
								>
									Funding
								</Link>
								<Link
									className="flex w-full items-center py-2 text-lg font-semibold text-gray-800 hover:text-red-500 transition-colors"
									onClick={handleEvent}
								>
									Log Out
								</Link>
							</>
						) : (
							<>
								<Link
									to="/login"
									className="flex w-full items-center py-2 text-lg font-semibold text-gray-800 hover:text-red-500 transition-colors"
								>
									Log In
								</Link>
								<Link
									to="/register"
									className="flex w-full items-center py-2 text-lg font-semibold text-gray-800 hover:text-red-500 transition-colors"
								>
									Register
								</Link>
							</>
						)}
					</div>
				</SheetContent>
			</Sheet>

		
			<Link
				href="#"
				className="mr-6 hidden lg:flex items-center"
				prefetch={false}
			>
				<img src="" className="w-10 h-10 mr-1" alt="Logo" />
				<span className="text-3xl text-white font-semibold">
					<i>Blood Donation</i>
				</span>
			</Link>

			
			<nav className="ml-auto hidden lg:flex gap-6">
				<Link
					to="/"
					className="group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-red-500 hover:text-white transition-colors"
				>
					Home
				</Link>
				<Link
					to="/blog"
					className="group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-red-500 hover:text-white transition-colors"
				>
					Blog
				</Link>
				<Link
					to="/donation-requests"
					className="group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-red-500 hover:text-white transition-colors"
				>
					Donation Requests
				</Link>
				{user ? (
					<>
						<Link
							to="/funding"
							className="group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-red-500 hover:text-white transition-colors"
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
									src={user.photoURL}
									alt="User Avatar"
									className="h-10 w-10 rounded-full border-2 border-white"
								/>
								{showDisplayName && (
									<span className="absolute top-full mt-1 bg-blue-400 text-white text-sm py-1 px-2 rounded-md shadow-md z-10">
										{user.displayName}
									</span>
								)}
							</div>
							{dropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-50">
									{user && (
										<Link
											to={`/dashboard/profile/${user.email}`}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Dashboard
										</Link>
									)}
									<Button
										variant="ghost"
										className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-400"
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
							className="group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-red-500 hover:text-white transition-colors"
						>
							Log In
						</Link>
						<Link
							to="/register"
							className="group inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-red-500 hover:text-white transition-colors"
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
