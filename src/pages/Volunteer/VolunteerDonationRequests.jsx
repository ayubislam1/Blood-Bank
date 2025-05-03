import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
	FaTint,
	FaCheckCircle,
	FaTimesCircle,
	FaHospital,
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaUserInjured,
	FaSearch,
	FaFilter,
	FaSortAmountDown,
	FaSortAmountUp,
} from "react-icons/fa";
import {
	Loader2,
	Clock,
	Filter,
	ArrowUpDown,
	Check,
	X,
	Eye,
	AlertTriangle,
} from "lucide-react";
import { Button } from "../../components/ui/button";

const VolunteerDonationRequests = () => {
	const axiosSecure = useAxiosSecure();
	const [donationRequests, setDonationRequests] = useState([]);
	const [filteredRequests, setFilteredRequests] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [sortConfig, setSortConfig] = useState({
		key: "creationDate",
		direction: "desc",
	});
	const [loading, setLoading] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		data = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["volunteer-donation-requests"],
		queryFn: async () => {
			setLoading(true);
			try {
				const res = await axiosSecure.get("/all-donation-requests");
				setDonationRequests(res.data);
				setFilteredRequests(res.data);
				return res.data;
			} catch (error) {
				console.error("Error fetching donation requests:", error);
				return [];
			} finally {
				setLoading(false);
			}
		},
	});

	// Handle search and filtering
	useEffect(() => {
		let result = donationRequests;

		// Apply search
		if (searchTerm) {
			result = result.filter(
				(request) =>
					request.recipientName
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					request.hospitalName
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					request.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Apply status filter
		if (statusFilter !== "all") {
			result = result.filter((request) => request.status === statusFilter);
		}

		// Apply sorting
		if (sortConfig.key) {
			result = [...result].sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
				return 0;
			});
		}

		setFilteredRequests(result);
	}, [searchTerm, statusFilter, sortConfig, donationRequests]);

	// Handle sorting request
	const requestSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	// Handle status change
	const handleStatusChange = async (id, newStatus) => {
		try {
			setLoading(true);
			const response = await axiosSecure.patch(`/donation-requests/${id}`, {
				status: newStatus,
			});

			if (response.data.modifiedCount > 0) {
				refetch();
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `Request status updated to ${newStatus}!`,
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.error("Error updating status:", error);
			Swal.fire({
				position: "top-end",
				icon: "error",
				title: "Failed to update status",
				showConfirmButton: false,
				timer: 1500,
			});
		} finally {
			setLoading(false);
		}
	};

	// Render status badge
	const renderStatusBadge = (status) => {
		switch (status) {
			case "inprogress":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
						<AlertTriangle className="mr-1" size={12} />
						Pending
					</span>
				);
			case "confirmed":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
						<Check className="mr-1" size={12} />
						Confirmed
					</span>
				);
			case "done":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
						<FaCheckCircle className="mr-1" size={12} />
						Completed
					</span>
				);
			case "canceled":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
						<X className="mr-1" size={12} />
						Canceled
					</span>
				);
			default:
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
						Unknown
					</span>
				);
		}
	};

	// Animation variants
	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	// Handle view details
	const handleViewDetails = (request) => {
		setSelectedRequest(request);
		setIsModalOpen(true);
	};

	// Close modal
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedRequest(null);
	};

	// Render count badge for each status
	const getStatusCounts = () => {
		const counts = {
			all: donationRequests.length,
			inprogress: donationRequests.filter((req) => req.status === "inprogress")
				.length,
			confirmed: donationRequests.filter((req) => req.status === "confirmed")
				.length,
			done: donationRequests.filter((req) => req.status === "done").length,
			canceled: donationRequests.filter((req) => req.status === "canceled")
				.length,
		};
		return counts;
	};

	const counts = getStatusCounts();

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"></div>
				<span className="ml-2 text-red-500 font-semibold">
					Loading donation requests...
				</span>
			</div>
		);
	}

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={fadeIn}
			transition={{ duration: 0.5 }}
			className="px-6 py-8 max-w-7xl mx-auto"
		>
			{/* Page Header */}
			<div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg mb-8 overflow-hidden">
				<div className="px-6 py-5 text-white">
					<h1 className="text-2xl font-bold flex items-center">
						<FaTint className="mr-3" />
						Blood Donation Requests
					</h1>
					<p className="mt-1 opacity-90">
						Manage and track all blood donation requests in the system
					</p>
				</div>
			</div>

			{/* Filters and Search */}
			<motion.div
				variants={fadeIn}
				transition={{ delay: 0.1 }}
				className="bg-white rounded-xl shadow-md p-6 mb-8"
			>
				<div className="flex flex-col md:flex-row justify-between gap-4">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FaSearch className="text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Search by recipient, hospital, blood group..."
							className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-full md:w-80"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					<div className="flex flex-wrap gap-3">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FaFilter className="text-gray-400" />
							</div>
							<select
								className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
							>
								<option value="all">All Statuses ({counts.all})</option>
								<option value="inprogress">
									Pending ({counts.inprogress})
								</option>
								<option value="confirmed">
									Confirmed ({counts.confirmed})
								</option>
								<option value="done">Completed ({counts.done})</option>
								<option value="canceled">Canceled ({counts.canceled})</option>
							</select>
						</div>

						<button
							onClick={() => requestSort("creationDate")}
							className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${
								sortConfig.key === "creationDate" ? "bg-gray-100" : ""
							}`}
						>
							{sortConfig.key === "creationDate" &&
							sortConfig.direction === "asc" ? (
								<FaSortAmountUp className="mr-2 text-gray-600" />
							) : (
								<FaSortAmountDown className="mr-2 text-gray-600" />
							)}
							Date
						</button>
					</div>
				</div>

				{/* Filter Pills */}
				<div className="flex flex-wrap gap-2 mt-4">
					<button
						onClick={() => setStatusFilter("all")}
						className={`px-3 py-1 rounded-full text-xs font-medium ${
							statusFilter === "all"
								? "bg-red-100 text-red-800"
								: "bg-gray-100 text-gray-800"
						}`}
					>
						All
					</button>
					<button
						onClick={() => setStatusFilter("inprogress")}
						className={`px-3 py-1 rounded-full text-xs font-medium ${
							statusFilter === "inprogress"
								? "bg-yellow-100 text-yellow-800"
								: "bg-gray-100 text-gray-800"
						}`}
					>
						Pending
					</button>
					<button
						onClick={() => setStatusFilter("confirmed")}
						className={`px-3 py-1 rounded-full text-xs font-medium ${
							statusFilter === "confirmed"
								? "bg-blue-100 text-blue-800"
								: "bg-gray-100 text-gray-800"
						}`}
					>
						Confirmed
					</button>
					<button
						onClick={() => setStatusFilter("done")}
						className={`px-3 py-1 rounded-full text-xs font-medium ${
							statusFilter === "done"
								? "bg-green-100 text-green-800"
								: "bg-gray-100 text-gray-800"
						}`}
					>
						Completed
					</button>
					<button
						onClick={() => setStatusFilter("canceled")}
						className={`px-3 py-1 rounded-full text-xs font-medium ${
							statusFilter === "canceled"
								? "bg-red-100 text-red-800"
								: "bg-gray-100 text-gray-800"
						}`}
					>
						Canceled
					</button>
				</div>
			</motion.div>

			{/* Donation Request List */}
			<motion.div
				variants={staggerContainer}
				className="bg-white rounded-xl shadow-md overflow-hidden"
			>
				{filteredRequests.length > 0 ? (
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Recipient & Details
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<div className="flex items-center">Blood Group</div>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<div className="flex items-center">Hospital</div>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<button
											onClick={() => requestSort("donationDate")}
											className="flex items-center focus:outline-none"
										>
											<span>Date</span>
											<ArrowUpDown className="ml-1 h-4 w-4" />
										</button>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredRequests.map((request, index) => (
									<motion.tr
										key={request._id || index}
										variants={fadeIn}
										className="hover:bg-gray-50"
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
													<FaUserInjured />
												</div>
												<div className="ml-4">
													<div className="text-sm font-medium text-gray-900">
														{request.recipientName}
													</div>
													<div className="text-xs text-gray-500">
														{request.requesterEmail}
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
												<FaTint className="mr-1" size={12} />
												{request.bloodGroup}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center text-sm text-gray-900">
												<FaHospital className="mr-1 text-gray-400" />
												{request.hospitalName}
											</div>
											<div className="text-xs text-gray-500 mt-1 flex items-center">
												<FaMapMarkerAlt
													className="mr-1 text-gray-400"
													size={10}
												/>
												{request.district}, {request.upazila}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900 flex items-center">
												<FaCalendarAlt
													className="mr-1 text-gray-400"
													size={12}
												/>
												{request.donationDate}
											</div>
											<div className="text-xs text-gray-500 mt-1 flex items-center">
												<Clock className="mr-1 text-gray-400" size={10} />
												{request.donationTime}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{renderStatusBadge(request.status)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex justify-end gap-2">
												<Button
													variant="outline"
													size="sm"
													className="text-blue-600 hover:text-blue-800 flex items-center"
													onClick={() => handleViewDetails(request)}
												>
													<Eye className="h-4 w-4 mr-1" />
													View
												</Button>

												{request.status === "inprogress" && (
													<Button
														variant="outline"
														size="sm"
														className="text-green-600 hover:text-green-800 flex items-center"
														onClick={() =>
															handleStatusChange(request._id, "confirmed")
														}
														disabled={loading}
													>
														<Check className="h-4 w-4 mr-1" />
														Confirm
													</Button>
												)}

												{request.status === "confirmed" && (
													<Button
														variant="outline"
														size="sm"
														className="text-green-600 hover:text-green-800 flex items-center"
														onClick={() =>
															handleStatusChange(request._id, "done")
														}
														disabled={loading}
													>
														<FaCheckCircle className="h-4 w-4 mr-1" />
														Complete
													</Button>
												)}

												{request.status !== "done" &&
													request.status !== "canceled" && (
														<Button
															variant="outline"
															size="sm"
															className="text-red-600 hover:text-red-800 flex items-center"
															onClick={() =>
																handleStatusChange(request._id, "canceled")
															}
															disabled={loading}
														>
															<X className="h-4 w-4 mr-1" />
															Cancel
														</Button>
													)}
											</div>
										</td>
									</motion.tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="p-8 text-center">
						<FaTint className="mx-auto text-4xl text-gray-300 mb-4" />
						<h3 className="text-lg font-medium text-gray-900">
							No donation requests found
						</h3>
						<p className="mt-1 text-gray-500">
							{searchTerm
								? "Try adjusting your search or filters"
								: "Donation requests will appear here when they are created"}
						</p>
					</div>
				)}
			</motion.div>

			{/* Details Modal */}
			{isModalOpen && selectedRequest && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
					>
						<div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
							<h3 className="text-xl font-bold flex items-center">
								<FaTint className="mr-2" />
								Donation Request Details
							</h3>
							<button
								onClick={closeModal}
								className="text-white hover:bg-red-700 rounded-full p-1"
							>
								<X size={20} />
							</button>
						</div>

						<div className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h4 className="font-semibold text-gray-500 mb-1">
										Recipient Information
									</h4>
									<p className="text-lg font-semibold text-gray-900 mb-4">
										{selectedRequest.recipientName}
									</p>

									<h4 className="font-semibold text-gray-500 mb-1">
										Requester
									</h4>
									<p className="text-gray-900 mb-4">
										{selectedRequest.requesterName} (
										{selectedRequest.requesterEmail})
									</p>

									<h4 className="font-semibold text-gray-500 mb-1">
										Blood Group
									</h4>
									<div className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-red-100 text-red-800 mb-4">
										<FaTint className="mr-1" size={14} />
										{selectedRequest.bloodGroup}
									</div>

									<h4 className="font-semibold text-gray-500 mb-1">Status</h4>
									<div className="mb-4">
										{renderStatusBadge(selectedRequest.status)}
									</div>
								</div>

								<div>
									<h4 className="font-semibold text-gray-500 mb-1">Hospital</h4>
									<p className="text-gray-900 mb-1">
										{selectedRequest.hospitalName}
									</p>
									<p className="text-gray-600 mb-4">
										{selectedRequest.hospitalAddress}
									</p>

									<h4 className="font-semibold text-gray-500 mb-1">Location</h4>
									<p className="text-gray-900 mb-4">
										{selectedRequest.district}, {selectedRequest.upazila}
									</p>

									<h4 className="font-semibold text-gray-500 mb-1">
										Date & Time
									</h4>
									<p className="text-gray-900 mb-4">
										{selectedRequest.donationDate} at{" "}
										{selectedRequest.donationTime}
									</p>
								</div>
							</div>

							<div className="mt-4">
								<h4 className="font-semibold text-gray-500 mb-1">
									Request Message
								</h4>
								<p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
									{selectedRequest.requestMessage ||
										"No additional details provided."}
								</p>
							</div>

							<div className="mt-6 flex flex-wrap gap-3 justify-end">
								{selectedRequest.status === "inprogress" && (
									<>
										<Button
											variant="outline"
											className="flex items-center text-green-600 border-green-600 hover:bg-green-50"
											onClick={() => {
												handleStatusChange(selectedRequest._id, "confirmed");
												closeModal();
											}}
										>
											<Check className="mr-1 h-4 w-4" />
											Confirm Request
										</Button>
										<Button
											variant="outline"
											className="flex items-center text-red-600 border-red-600 hover:bg-red-50"
											onClick={() => {
												handleStatusChange(selectedRequest._id, "canceled");
												closeModal();
											}}
										>
											<X className="mr-1 h-4 w-4" />
											Cancel Request
										</Button>
									</>
								)}

								{selectedRequest.status === "confirmed" && (
									<Button
										variant="outline"
										className="flex items-center text-green-600 border-green-600 hover:bg-green-50"
										onClick={() => {
											handleStatusChange(selectedRequest._id, "done");
											closeModal();
										}}
									>
										<FaCheckCircle className="mr-1 h-4 w-4" />
										Mark as Completed
									</Button>
								)}

								<Button
									variant="default"
									className="bg-gray-800 hover:bg-gray-700 text-white"
									onClick={closeModal}
								>
									Close
								</Button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</motion.div>
	);
};

export default VolunteerDonationRequests;
