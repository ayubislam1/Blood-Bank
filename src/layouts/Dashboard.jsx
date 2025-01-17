// Import required libraries and components
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <aside
                className={`fixed z-20 bg-gray-800 text-white min-h-full transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300 w-64`}
            >
                <div className="p-4 text-center font-bold text-xl border-b border-gray-700">
                    MyBlood
                </div>

                <nav className="flex-1 mt-4 space-y-2 px-2">
                    <NavLink
                        to={`/dashboard/profile/${user?.email}`}
                        end
                        
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition ${
                                isActive? "bg-primary text-white" : "hover:bg-gray-700"
                            }`
                        }
                    >
                        Profile
                    </NavLink>

                    <NavLink
                        to="/dashboard/other"
                        end
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition ${
                                isActive ? "bg-primary text-white" : "hover:bg-gray-700"
                            }`
                        }
                    >
                        Other Page
                    </NavLink>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition ${
                                isActive ? "bg-primary text-white" : "hover:bg-gray-700"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                </nav>

                <div className="p-4 text-sm border-t border-gray-700 text-center bottom-0">
                    &copy; 2025 MyBlood. All rights reserved.
                </div>
            </aside>

            <button
                className="absolute top-4 left-4 md:hidden text-xl  z-50 text-black-300 "
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "✖" : "☰"}
            </button>
            <div className="flex-1 ml-0 md:ml-64">
                <div className="p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
