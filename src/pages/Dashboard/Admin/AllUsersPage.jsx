import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button } from "../../../components/ui/button";
import {
	Check,
	Eye,
	MoreVertical,
	Search,
	Shield,
	UserPlus,
	Activity,
	Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import {
	FaUser,
	FaUserMd,
	FaUserShield,
	FaUserTimes,
	FaEnvelope,
	FaIdBadge,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const AllUsersPage = () => {
	const [users, setUsers] = useState([]);
	const [openMenu, setOpenMenu] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [filteredUsers, setFilteredUsers] = useState([]);
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axiosSecure.get("/all-users");
				setUsers(response.data);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch users");
				setLoading(false);
				console.error(err);
			}
		};

		fetchUsers();
	}, [axiosSecure]);

	useEffect(() => {
		let results = users;

		if (searchTerm) {
			results = results.filter(
				(user) =>
					user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.email?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (roleFilter !== "all") {
			results = results.filter((user) => user.role === roleFilter);
		}

		if (statusFilter !== "all") {
			results = results.filter((user) => user.status === statusFilter);
		}

		setFilteredUsers(results);
	}, [users, searchTerm, roleFilter, statusFilter]);

	const handleMenuToggle = (userId) => {
		setOpenMenu(openMenu === userId ? null : userId);
	};

	const updateUserRole = async (email, role) => {
		try {
			const response = await axiosSecure.patch(`/users/role/${email}`, {
				role,
			});
			if (response.data.modifiedCount > 0) {
				setUsers(users.map((u) => (u.email === email ? { ...u, role } : u)));
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `User is now ${role}!`,
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateUserStatus = async (email, status) => {
		try {
			const response = await axiosSecure.patch(`/users/status/${email}`, {
				status,
			});
			if (response.data.modifiedCount > 0) {
				setUsers(users.map((u) => (u.email === email ? { ...u, status } : u)));
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `User is now ${status}!`,
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center text-red-600 p-4">
				<h2 className="text-xl">Error: {error}</h2>
			</div>
		);
	}

	// Get role icon
	const getRoleIcon = (role) => {
		switch (role) {
			case "admin":
				return <FaUserShield className="text-red-600" />;
			case "volunteer":
				return <FaUserMd className="text-blue-600" />;
			case "donor":
				return <FaUser className="text-green-600" />;
			default:
				return <FaUser className="text-gray-600" />;
		}
	};

	// Get status indicator
	const getStatusIndicator = (status) => {
		switch (status) {
			case "active":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
						<span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
						Active
					</span>
				);
			case "blocked":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
						<span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
						Blocked
					</span>
				);
			default:
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
						<span className="w-2 h-2 mr-1 bg-gray-500 rounded-full"></span>
						{status || "Unknown"}
					</span>
				);
		}
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className="container mx-auto px-4 py-6 max-w-7xl">
			{/* Page Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-8"
			>
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					User Management
				</h1>
				<p className="text-gray-600">
					Manage all users, their roles, and permissions from this dashboard.
				</p>
			</motion.div>

			{/* Filters and Search */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="bg-white rounded-xl shadow-md p-4 mb-6"
			>
				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex-1 relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Search by name or email..."
							className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 py-2.5"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					<div className="flex flex-wrap gap-3">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FaUserShield className="h-5 w-5 text-gray-400" />
							</div>
							<select
								className="pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 py-2.5 pr-8"
								value={roleFilter}
								onChange={(e) => setRoleFilter(e.target.value)}
							>
								<option value="all">All Roles</option>
								<option value="admin">Admin</option>
								<option value="volunteer">Volunteer</option>
								<option value="donor">Donor</option>
							</select>
						</div>

						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Activity className="h-5 w-5 text-gray-400" />
							</div>
							<select
								className="pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 py-2.5 pr-8"
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
							>
								<option value="all">All Status</option>
								<option value="active">Active</option>
								<option value="blocked">Blocked</option>
							</select>
						</div>
					</div>
				</div>
			</motion.div>

			{/* User Stats */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
			>
				<div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-red-600">
					<div className="flex items-center">
						<div className="bg-red-100 rounded-full p-3 mr-4">
							<FaUser className="text-red-600 text-xl" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Total Users</p>
							<p className="text-2xl font-bold">{users.length}</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-600">
					<div className="flex items-center">
						<div className="bg-blue-100 rounded-full p-3 mr-4">
							<FaUserShield className="text-blue-600 text-xl" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Admins</p>
							<p className="text-2xl font-bold">
								{users.filter((u) => u.role === "admin").length}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-600">
					<div className="flex items-center">
						<div className="bg-green-100 rounded-full p-3 mr-4">
							<FaUserMd className="text-green-600 text-xl" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Volunteers</p>
							<p className="text-2xl font-bold">
								{users.filter((u) => u.role === "volunteer").length}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-600">
					<div className="flex items-center">
						<div className="bg-yellow-100 rounded-full p-3 mr-4">
							<FaUser className="text-yellow-600 text-xl" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Donors</p>
							<p className="text-2xl font-bold">
								{users.filter((u) => u.role === "donor").length}
							</p>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Users Table */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
			>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									User
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Email
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Role
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredUsers.length > 0 ? (
								filteredUsers.map((user) => (
									<motion.tr
										key={user._id}
										variants={itemVariants}
										className="hover:bg-gray-50"
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												{user.photoUrl ? (
													<img
														src={user.photoUrl}
														alt={user.name || "User"}
														className="h-10 w-10 rounded-full object-cover"
													/>
												) : (
													<div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
														{user.name?.charAt(0) ||
															user.email?.charAt(0) ||
															"U"}
													</div>
												)}
												<div className="ml-4">
													<div className="text-sm font-medium text-gray-900">
														{user.name || "Unknown"}
													</div>
													<div className="text-xs text-gray-500">
														User ID: {user._id.substring(0, 8)}
													</div>
												</div>
											</div>
										</td>

										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center text-sm text-gray-600">
												<FaEnvelope className="mr-2 text-gray-400" />
												{user.email}
											</div>
										</td>

										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center text-sm">
												<div className="mr-2">{getRoleIcon(user.role)}</div>
												<span className="capitalize">
													{user.role || "User"}
												</span>
											</div>
										</td>

										<td className="px-6 py-4 whitespace-nowrap">
											{getStatusIndicator(user.status)}
										</td>

										<td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
											<div className="relative inline-block text-left">
												<Button
													className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 flex items-center justify-center"
													onClick={() => handleMenuToggle(user._id)}
												>
													<MoreVertical className="h-5 w-5" />
												</Button>

												{openMenu === user._id && (
													<div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
														<div
															className="py-1 divide-y divide-gray-100"
															role="menu"
														>
															<div className="px-3 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase">
																Manage Role
															</div>

															<a
																href="#"
																className={`group flex items-center px-4 py-2 text-sm ${
																	user.role === "admin"
																		? "bg-red-50 text-red-700"
																		: "text-gray-700 hover:bg-red-50 hover:text-red-700"
																}`}
																onClick={(e) => {
																	e.preventDefault();
																	updateUserRole(user.email, "admin");
																	setOpenMenu(null);
																}}
															>
																<Shield className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
																Make Admin
																{user.role === "admin" && (
																	<Check className="ml-auto h-5 w-5 text-red-500" />
																)}
															</a>

															<a
																href="#"
																className={`group flex items-center px-4 py-2 text-sm ${
																	user.role === "volunteer"
																		? "bg-blue-50 text-blue-700"
																		: "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
																}`}
																onClick={(e) => {
																	e.preventDefault();
																	updateUserRole(user.email, "volunteer");
																	setOpenMenu(null);
																}}
															>
																<UserPlus className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500" />
																Make Volunteer
																{user.role === "volunteer" && (
																	<Check className="ml-auto h-5 w-5 text-blue-500" />
																)}
															</a>

															<a
																href="#"
																className={`group flex items-center px-4 py-2 text-sm ${
																	user.role === "donor"
																		? "bg-green-50 text-green-700"
																		: "text-gray-700 hover:bg-green-50 hover:text-green-700"
																}`}
																onClick={(e) => {
																	e.preventDefault();
																	updateUserRole(user.email, "donor");
																	setOpenMenu(null);
																}}
															>
																<FaUser className="mr-3 h-5 w-5 text-gray-400 group-hover:text-green-500" />
																Make Donor
																{user.role === "donor" && (
																	<Check className="ml-auto h-5 w-5 text-green-500" />
																)}
															</a>

															<div className="px-3 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase mt-2">
																Manage Status
															</div>

															<a
																href="#"
																className={`group flex items-center px-4 py-2 text-sm ${
																	user.status === "active"
																		? "bg-green-50 text-green-700"
																		: "text-gray-700 hover:bg-green-50 hover:text-green-700"
																}`}
																onClick={(e) => {
																	e.preventDefault();
																	updateUserStatus(user.email, "active");
																	setOpenMenu(null);
																}}
															>
																<Activity className="mr-3 h-5 w-5 text-gray-400 group-hover:text-green-500" />
																Mark as Active
																{user.status === "active" && (
																	<Check className="ml-auto h-5 w-5 text-green-500" />
																)}
															</a>

															<a
																href="#"
																className={`group flex items-center px-4 py-2 text-sm ${
																	user.status === "blocked"
																		? "bg-red-50 text-red-700"
																		: "text-gray-700 hover:bg-red-50 hover:text-red-700"
																}`}
																onClick={(e) => {
																	e.preventDefault();
																	updateUserStatus(user.email, "blocked");
																	setOpenMenu(null);
																}}
															>
																<FaUserTimes className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
																Block User
																{user.status === "blocked" && (
																	<Check className="ml-auto h-5 w-5 text-red-500" />
																)}
															</a>
														</div>
													</div>
												)}
											</div>
										</td>
									</motion.tr>
								))
							) : (
								<tr>
									<td
										colSpan="5"
										className="px-6 py-12 text-center text-gray-500"
									>
										<div className="flex flex-col items-center">
											<Filter className="h-12 w-12 text-gray-300 mb-4" />
											<p className="text-lg font-medium text-gray-600 mb-1">
												No users found
											</p>
											<p className="text-sm text-gray-500">
												Try adjusting your search or filter criteria
											</p>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</motion.div>
		</div>
	);
};

export default AllUsersPage;
