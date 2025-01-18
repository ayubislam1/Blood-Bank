
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row min-h-full">
            <aside
                className={`fixed z-20 bg-gradient-to-b from-red-600 to-red-800 text-white min-h-full transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300 w-68 shadow-lg`}
            >
                <div className="p-6 text-center font-bold text-2xl border-b border-red-700">
                    MyBlood
                </div>

                <nav className="flex-1 mt-6 space-y-4 px-4">
                    <NavLink
                        to={`/dashboard/profile/${user?.email}`}
                        end
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg text-lg font-medium transition ${
                                isActive ? "bg-white text-red-700 shadow-md" : "hover:bg-red-700"
                            }`
                        }
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin"
                        end
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg text-lg font-medium transition ${
                                isActive ? "bg-white text-red-700 shadow-md" : "hover:bg-red-700"
                            }`
                        }
                    >
                        Admin Home
                    </NavLink>

                    <NavLink
                        to="/dashboard/donorHome"
                        end
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg text-lg font-medium transition ${
                                isActive ? "bg-white text-red-700 shadow-md" : "hover:bg-red-700"
                            }`
                        }
                    >
                        Donor Home
                    </NavLink>

                    <NavLink
                        to={`/dashboard/myRequest`}
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg text-lg font-medium transition ${
                                isActive ? "bg-white text-red-700 shadow-md" : "hover:bg-red-700"
                            }`
                        }
                    >
                        My Donation Requests
                    </NavLink>

                    <NavLink
                        to="/dashboard/createRequest"
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg text-lg font-medium transition ${
                                isActive ? "bg-white text-red-700 shadow-md" : "hover:bg-red-700"
                            }`
                        }
                    >
                        Create Donation Request
                    </NavLink>

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg text-lg font-medium transition ${
                                isActive ? "bg-white text-red-700 shadow-md" : "hover:bg-red-700"
                            }`
                        }
                    >
                        Home
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
                {isOpen ? "✖" : "☰"}
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