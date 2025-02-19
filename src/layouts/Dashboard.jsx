import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useVolunteer from "../hooks/useVolunteer";
import useDonor from "../hooks/useDonor";
import { FaBars, FaTimes, FaHome, FaUsers, FaClipboardList, FaUser, FaTasks, FaDonate, FaFileAlt } from "react-icons/fa";

const Dashboard = () => {
	const { user } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [isAdmin] = useAdmin();
	const [isVolunteer] = useVolunteer();
	const [isDonor] = useDonor();

	return (
		<div className="flex flex-col md:flex-row min-h-full">
			<aside
				className={`fixed z-20 bg-gradient-to-b from-red-600 to-red-800 text-white min-h-full transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 transition-transform duration-300 w-68 shadow-lg`}
			>
				<nav className="flex-1 mt-6 space-y-4 px-4">
					<NavLink
						to={`/dashboard/profile/${user?.email}`}
						end
						className={({ isActive }) =>
							`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
								isActive
									? "bg-white text-red-700 shadow-md"
									: "hover:bg-red-700"
							}`
						}
					>
						<FaUser /> Profile
					</NavLink>
					{isAdmin && (
						<>
							<NavLink
								to="/dashboard/admin"
								end
								className={({ isActive }) =>
									`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
										isActive
											? "bg-white text-red-700 shadow-md"
											: "hover:bg-red-700"
									}`
								}
							>
								<FaHome /> Admin Home
							</NavLink>
							<NavLink
								to="/dashboard/allUsers"
								end
								className={({ isActive }) =>
									`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
										isActive
											? "bg-white text-red-700 shadow-md"
											: "hover:bg-red-700"
									}`
								}
							>
								<FaUsers /> All Users
							</NavLink>
							<NavLink
								to="/dashboard/all-donation-request"
								end
								className={({ isActive }) =>
									`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
										isActive
											? "bg-white text-red-700 shadow-md"
											: "hover:bg-red-700"
									}`
								}
							>
								<FaClipboardList /> All Donation Requests
							</NavLink>
						</>
					)}

					{isVolunteer && (
						<>
							<NavLink
								to="/dashboard/volunteer-home"
								end
								className={({ isActive }) =>
									`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
										isActive
											? "bg-white text-red-700 shadow-md"
											: "hover:bg-red-700"
									}`
								}
							>
								<FaTasks /> Volunteer Home
							</NavLink>
							<NavLink
								to="/dashboard/volunteer-donation-request"
								end
								className={({ isActive }) =>
									`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
										isActive
											? "bg-white text-red-700 shadow-md"
											: "hover:bg-red-700"
									}`
								}
							>
								<FaDonate /> Volunteer Donation Request
							</NavLink>
						</>
					)}
					{(isAdmin || isVolunteer) && (
						<NavLink
							to="/dashboard/content-management"
							end
							className={({ isActive }) =>
								`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
									isActive
										? "bg-white text-red-700 shadow-md"
										: "hover:bg-red-700"
								}`
							}
						>
							<FaFileAlt /> Content Management
						</NavLink>
					)}
					{isDonor && (
						<>
							<NavLink
								to="/dashboard/donorHome"
								end
								className={({ isActive }) =>
									`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
										isActive
											? "bg-white text-red-700 shadow-md"
											: "hover:bg-red-700"
									}`
								}
							>
								<FaHome /> Donor Home
							</NavLink>

							<NavLink
								to={`/dashboard/myRequest`}
								className={({ isActive }) =>
									`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
										isActive
											? "bg-white text-red-700 shadow-md"
											: "hover:bg-red-700"
									}`
								}
							>
								<FaClipboardList /> My Donation Requests
							</NavLink>

							<NavLink
								to="/dashboard/createRequest"
								className={({ isActive }) =>
									`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
										isActive
											? "bg-white text-red-700 shadow-md"
											: "hover:bg-red-700"
									}`
								}
							>
								<FaDonate /> Create Donation Request
							</NavLink>
						</>
					)}

					<NavLink
						to="/"
						className={({ isActive }) =>
							`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
								isActive
									? "bg-white text-red-700 shadow-md"
									: "hover:bg-red-700"
							}`
						}
					>
						<FaHome /> Home
					</NavLink>
				</nav>

				<div className="p-4 text-sm border-t border-red-700 text-center">
					&copy; 2025 MyBlood. All rights reserved.
				</div>
			</aside>

			<button
				className="absolute top-4 left-4 md:hidden text-2xl z-50 text-red-700"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <FaTimes /> : <FaBars />}
			</button>

			<div className="flex-1 ml-0 md:ml-64">
				<div className="p-6">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
