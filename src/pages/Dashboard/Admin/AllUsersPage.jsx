import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "../../../components/ui/button";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllUsersPage = () => {
	const [filteredStatus, setFilteredStatus] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5;
	const [openMenu, setOpenMenu] = useState(null);
	const axiosSecure = useAxiosSecure();

	const { data: users = [], refetch } = useQuery({
		queryKey: ["all-users"],
		queryFn: async () => {
			const res = await axiosSecure.get("/all-users");
			return res.data;
		},
	});

	const handleBlockUnblock = async (userId, status) => {
		try {
			await axiosSecure.patch(`/all-users/${userId}/status`, { status });
			refetch();
		} catch (error) {
			console.error("Error updating user status:", error);
		}
	};

	const handleRoleChange = async (userId, newRole) => {
		try {
			await axiosSecure
				.put(`/all-users/${userId}`, { role: newRole })
				.then((res) => console.log(res.data));

			refetch();
		} catch (error) {
			console.error("Error updating user role:", error);
		}
	};

	const filteredUsers = filteredStatus
		? users.filter((user) => user.status === filteredStatus)
		: users;

	const paginatedUsers = filteredUsers.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	const totalPages = Math.ceil(filteredUsers.length / pageSize);

	const handleMenuToggle = (userId) => {
		setOpenMenu((prev) => (prev === userId ? null : userId));
	};

	const handleClickOutside = (event) => {
		if (!event.target.closest(".menu-container")) {
			setOpenMenu(null);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="p-6">
			<div className="mb-4">
				<select
					value={filteredStatus}
					onChange={(e) => setFilteredStatus(e.target.value)}
					className="p-2 border rounded-md"
				>
					<option value="">Filter by Status</option>
					<option value="active">Active</option>
					<option value="blocked">Blocked</option>
				</select>
			</div>

			<div className="">
				<table className="min-w-full table-auto">
					<thead>
						<tr>
							<th className="p-4 text-left">Avatar</th>
							<th className="p-4 text-left">Email</th>
							<th className="p-4 text-left">Name</th>
							<th className="p-4 text-left">Role</th>
							<th className="p-4 text-left">Status</th>
							<th className="p-4 text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{paginatedUsers.map((user) => (
							<tr key={user._id} className="border-b">
								<td className="p-4 ">
									<img
										src={user.photoUrl}
										alt="User Avatar"
										className="mask rounded-lg h-12 w-12"
									/>
								</td>
								<td className="p-4">{user.email}</td>
								<td className="p-4">{user.name}</td>
								<td className="p-4">{user.role}</td>
								<td className="p-4">{user.status}</td>
								<td className="p-4">
									<div className="relative">
										<Button
											className="text-gray-600"
											onClick={() => handleMenuToggle(user._id)}
										>
											<MoreVertical />
										</Button>

										<div
											className={`menu-container absolute right-0 mt-2 bg-white shadow-md rounded-lg w-48 z-20 ${
												openMenu === user._id ? "block" : "hidden"
											}`}
										>
											<ul className="list-none p-2">
												{user.status === "active" && (
													<li
														className="p-2 cursor-pointer hover:bg-gray-200"
														onClick={() =>
															handleBlockUnblock(user._id, "blocked")
														}
													>
														Block User
													</li>
												)}
												{user.status === "blocked" && (
													<li
														className="p-2 cursor-pointer hover:bg-gray-200"
														onClick={() =>
															handleBlockUnblock(user._id, "active")
														}
													>
														Unblock User
													</li>
												)}
												{user.role !== "volunteer" && (
													<li
														className="p-2 cursor-pointer hover:bg-gray-200"
														onClick={() =>
															handleRoleChange(user._id, "volunteer")
														}
													>
														Make Volunteer
													</li>
												)}
												{user.role !== "admin" && (
													<li
														className="p-2 cursor-pointer hover:bg-gray-200"
														onClick={() => handleRoleChange(user._id, "admin")}
													>
														Make Admin
													</li>
												)}
											</ul>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex justify-between mt-4">
				<Button
					className="px-4 py-2 bg-blue-500 text-white rounded-md"
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					disabled={currentPage === 1}
				>
					Previous
				</Button>
				<span className="px-4 py-2">
					Page {currentPage} of {totalPages}
				</span>
				<Button
					className="px-4 py-2 bg-blue-500 text-white rounded-md"
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={currentPage === totalPages}
				>
					Next
				</Button>
			</div>
		</div>
	);
};

export default AllUsersPage;
