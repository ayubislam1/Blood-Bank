import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../../components/ui/button";
import { Table } from "../../../components/ui/table";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import userDonation from "../../../hooks/userDonation";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import {
	FaPlusCircle,
	FaEdit,
	FaEye,
	FaTrash,
	FaCheckCircle,
	FaTimesCircle,
	FaExclamationCircle,
	FaCalendarAlt,
	FaUser,
	FaMapMarkerAlt,
	FaHeartbeat,
	FaTint,
	FaHistory,
} from "react-icons/fa";

const DonorHome = () => {
	const [userDonationData, isLoading, refetch] = userDonation();
	const [donationRequests, setDonationRequests] = useState([]);
	const [stats, setStats] = useState({
		total: 0,
		completed: 0,
		pending: 0,
		canceled: 0,
	});
	const navigate = useNavigate();
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();

	useEffect(() => {
		const filteredUsers = userDonationData.filter(
			(users) => users.email === user?.email
		);
		setDonationRequests(filteredUsers.slice(0, 3));

		// Calculate statistics
		if (filteredUsers.length > 0) {
			const completed = filteredUsers.filter(
				(req) => req.status === "done"
			).length;
			const pending = filteredUsers.filter(
				(req) => req.status === "inprogress"
			).length;
			const canceled = filteredUsers.filter(
				(req) => req.status === "canceled"
			).length;

			setStats({
				total: filteredUsers.length,
				completed,
				pending,
				canceled,
			});
		}
	}, [userDonationData, user?.email]);

	const handleStatusChange = async (id, status) => {
		try {
			const response = await axiosPublic.patch(`/users-donation/${id}`, {
				status,
			});
			if (response.data.modifiedCount > 0) {
				refetch();
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `Donation status updated to ${status}!`,
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosPublic.delete(`/users-donation/${id}`).then((res) => {
					if (res.data.deletedCount > 0) {
						setDonationRequests((prevRequests) =>
							prevRequests.filter((req) => req._id !== id)
						);
						Swal.fire(
							"Deleted!",
							"Your donation request has been deleted.",
							"success"
						);
						refetch();
					}
				});
			}
		});
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"></div>
				<span className="ml-2 text-red-500 font-semibold">Loading...</span>
			</div>
		);
	}

	return (
		<div className="px-6 mx-auto mt-5 max-w-7xl">
			{/* Welcome Banner */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl p-8 mb-8 shadow-lg"
			>
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold">
							Welcome, {user?.displayName || "Donor"}
						</h1>
						<p className="mt-2 text-white text-opacity-90">
							Thank you for being a part of our lifesaving mission. Your
							contributions make a real difference!
						</p>
					</div>
					<Button
						onClick={() => navigate("/dashboard/createRequest")}
						className="mt-4 md:mt-0 bg-white text-red-600 hover:bg-red-100 shadow-md flex items-center gap-2 transform transition-transform hover:scale-105"
					>
						<FaPlusCircle /> Create New Request
					</Button>
				</div>
			</motion.div>

			{/* Statistics Cards */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.1 }}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
			>
				<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600 hover:shadow-lg transition-shadow">
					<div className="flex items-center">
						<div className="rounded-full bg-red-100 p-3 mr-4">
							<FaHeartbeat className="text-xl text-red-600" />
						</div>
						<div>
							<p className="text-gray-500 text-sm">Total Requests</p>
							<h3 className="text-2xl font-bold text-gray-800">
								{stats.total}
							</h3>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition-shadow">
					<div className="flex items-center">
						<div className="rounded-full bg-green-100 p-3 mr-4">
							<FaCheckCircle className="text-xl text-green-600" />
						</div>
						<div>
							<p className="text-gray-500 text-sm">Completed</p>
							<h3 className="text-2xl font-bold text-gray-800">
								{stats.completed}
							</h3>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-600 hover:shadow-lg transition-shadow">
					<div className="flex items-center">
						<div className="rounded-full bg-yellow-100 p-3 mr-4">
							<FaExclamationCircle className="text-xl text-yellow-600" />
						</div>
						<div>
							<p className="text-gray-500 text-sm">Pending</p>
							<h3 className="text-2xl font-bold text-gray-800">
								{stats.pending}
							</h3>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-600 hover:shadow-lg transition-shadow">
					<div className="flex items-center">
						<div className="rounded-full bg-gray-100 p-3 mr-4">
							<FaTimesCircle className="text-xl text-gray-600" />
						</div>
						<div>
							<p className="text-gray-500 text-sm">Canceled</p>
							<h3 className="text-2xl font-bold text-gray-800">
								{stats.canceled}
							</h3>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Recent Donation Requests */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.2 }}
			>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-gray-800 flex items-center">
						<FaHistory className="mr-2 text-red-600" /> Recent Donation Requests
					</h2>
					<Link
						to="/dashboard/myRequest"
						className="text-red-600 hover:text-red-800 font-medium flex items-center"
					>
						View All <span className="ml-1">→</span>
					</Link>
				</div>

				{donationRequests.length > 0 ? (
					<div className="bg-white rounded-xl shadow-md overflow-hidden">
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-red-600">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
											Recipient
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
											Location
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
											Date & Time
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
											Blood Group
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
											Status
										</th>
										<th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{donationRequests.map((req) => (
										<tr key={req._id} className="hover:bg-gray-50">
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
														<FaUser className="text-red-600" />
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{req.recipientName}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center text-sm text-gray-500">
													<FaMapMarkerAlt className="mr-1 text-red-500" />
													{`${req.district}, ${req.upazila}`}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">
													<div className="flex items-center">
														<FaCalendarAlt className="mr-1 text-red-500" />
														{req.donationDate}
													</div>
													<div className="text-xs text-gray-500 mt-1">
														{req.donationTime}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
													<FaTint className="mr-1" />
													{req.bloodGroup}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
														req.status === "done"
															? "bg-green-100 text-green-800"
															: req.status === "inprogress"
															? "bg-yellow-100 text-yellow-800"
															: "bg-gray-100 text-gray-800"
													}`}
												>
													{req.status === "done" ? (
														<>
															<FaCheckCircle className="mr-1" /> Done
														</>
													) : req.status === "inprogress" ? (
														<>
															<FaExclamationCircle className="mr-1" /> Pending
														</>
													) : (
														<>
															<FaTimesCircle className="mr-1" /> Canceled
														</>
													)}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm">
												<div className="flex justify-center space-x-2">
													{req.status === "inprogress" && (
														<>
															<button
																onClick={() =>
																	handleStatusChange(req._id, "done")
																}
																className="text-green-500 hover:text-green-700 p-1"
																title="Mark as Done"
															>
																<FaCheckCircle />
															</button>
															<button
																onClick={() =>
																	handleStatusChange(req._id, "canceled")
																}
																className="text-red-500 hover:text-red-700 p-1"
																title="Cancel Request"
															>
																<FaTimesCircle />
															</button>
														</>
													)}
													<Link
														to={`/dashboard/view/${req._id}`}
														className="text-blue-500 hover:text-blue-700 p-1"
														title="View Details"
													>
														<FaEye />
													</Link>
													<Link
														to={`/dashboard/edit/${req._id}`}
														className="text-yellow-500 hover:text-yellow-700 p-1"
														title="Edit Request"
													>
														<FaEdit />
													</Link>
													<button
														onClick={() => handleDelete(req._id)}
														className="text-red-500 hover:text-red-700 p-1"
														title="Delete Request"
													>
														<FaTrash />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="text-center py-12 bg-white rounded-xl shadow-md">
						<FaHeartbeat className="text-red-300 text-5xl mx-auto mb-4" />
						<p className="text-lg text-gray-600 mb-6">
							No recent donation requests available.
						</p>
						<Button
							onClick={() => navigate("/dashboard/createRequest")}
							className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
						>
							<FaPlusCircle className="mr-2" /> Create Your First Request
						</Button>
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default DonorHome;
