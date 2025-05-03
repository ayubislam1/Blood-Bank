import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import {
	FaTint,
	FaCheckCircle,
	FaExclamationTriangle,
	FaHospital,
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaHandHoldingHeart,
	FaHeartbeat,
} from "react-icons/fa";
import { Calendar, Clock, AlertCircle, Activity, Users } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";

const VolunteerDashboard = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [recentRequests, setRecentRequests] = useState([]);
	const [stats, setStats] = useState({
		pending: 0,
		confirmed: 0,
		done: 0,
		total: 0,
	});

	const {
		data: donationRequests = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["volunteer-dashboard-requests"],
		queryFn: async () => {
			const res = await axiosSecure.get("/all-donation-requests");
			return res.data;
		},
	});

	useEffect(() => {
		if (donationRequests.length > 0) {
			// Get recent requests (last 5)
			setRecentRequests(donationRequests.slice(0, 5));

			// Calculate stats
			const pending = donationRequests.filter(
				(req) => req.status === "inprogress"
			).length;
			const confirmed = donationRequests.filter(
				(req) => req.status === "confirmed"
			).length;
			const done = donationRequests.filter(
				(req) => req.status === "done"
			).length;

			setStats({
				pending,
				confirmed,
				done,
				total: donationRequests.length,
			});
		}
	}, [donationRequests]);

	// Monthly donation data
	const monthlyData = [
		{ month: "Jan", requests: 12, completed: 8 },
		{ month: "Feb", requests: 19, completed: 15 },
		{ month: "Mar", requests: 24, completed: 20 },
		{ month: "Apr", requests: 18, completed: 13 },
		{ month: "May", requests: 27, completed: 22 },
		{ month: "Jun", requests: 32, completed: 25 },
	];

	// Blood type distribution data
	const bloodTypeData = [
		{ name: "A+", value: 35 },
		{ name: "B+", value: 25 },
		{ name: "O+", value: 20 },
		{ name: "AB+", value: 10 },
		{ name: "A-", value: 4 },
		{ name: "B-", value: 3 },
		{ name: "O-", value: 2 },
		{ name: "AB-", value: 1 },
	];

	const COLORS = [
		"#e11d48",
		"#6366f1",
		"#f59e0b",
		"#10b981",
		"#6b7280",
		"#8b5cf6",
		"#ec4899",
		"#14b8a6",
	];
	const STATUS_COLORS = {
		inprogress: "#f59e0b",
		confirmed: "#6366f1",
		done: "#10b981",
		canceled: "#6b7280",
	};

	const getStatusBadge = (status) => {
		switch (status) {
			case "inprogress":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
						<FaExclamationTriangle className="mr-1" size={12} />
						Pending
					</span>
				);
			case "confirmed":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
						<FaHandHoldingHeart className="mr-1" size={12} />
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
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
						<AlertCircle className="mr-1" size={12} />
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

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"></div>
				<span className="ml-2 text-red-500 font-semibold">
					Loading dashboard...
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
			{/* Welcome Banner */}
			<motion.div
				variants={fadeIn}
				transition={{ delay: 0.1 }}
				className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-xl mb-8 overflow-hidden"
			>
				<div className="px-8 py-6 flex flex-col md:flex-row justify-between items-center">
					<div className="text-white">
						<h1 className="text-3xl font-bold mb-2">
							Welcome, {user?.displayName || "Volunteer"}
						</h1>
						<p className="opacity-90 max-w-xl">
							Thank you for your service! As a volunteer, you help manage blood
							donation requests and support those in need of life-saving blood
							donations.
						</p>
					</div>
					<div className="mt-4 md:mt-0">
						<img
							src={
								user?.photoURL ||
								"https://www.svgrepo.com/show/452030/avatar.svg"
							}
							alt="Volunteer"
							className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
						/>
					</div>
				</div>
				<div className="bg-red-800 px-8 py-4">
					<div className="flex flex-wrap gap-8 text-white justify-center md:justify-start">
						<div className="flex items-center gap-2">
							<Calendar className="h-5 w-5" />
							<span>Today: {new Date().toLocaleDateString()}</span>
						</div>
						<div className="flex items-center gap-2">
							<AlertCircle className="h-5 w-5" />
							<span>Pending requests: {stats.pending}</span>
						</div>
						<div className="flex items-center gap-2">
							<Activity className="h-5 w-5" />
							<span>Status: Active</span>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Statistics Cards */}
			<motion.div
				variants={fadeIn}
				transition={{ delay: 0.2 }}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
			>
				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-600">
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="rounded-full bg-yellow-100 p-3 mr-4">
								<FaExclamationTriangle className="text-xl text-yellow-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Pending Requests</p>
								<h3 className="text-2xl font-bold text-gray-800">
									{stats.pending}
								</h3>
								<p className="text-xs text-yellow-600 mt-1">
									Awaiting confirmation
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-600">
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="rounded-full bg-indigo-100 p-3 mr-4">
								<FaHandHoldingHeart className="text-xl text-indigo-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Confirmed Donations</p>
								<h3 className="text-2xl font-bold text-gray-800">
									{stats.confirmed}
								</h3>
								<p className="text-xs text-indigo-600 mt-1">Donors assigned</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600">
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="rounded-full bg-green-100 p-3 mr-4">
								<FaCheckCircle className="text-xl text-green-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Completed Donations</p>
								<h3 className="text-2xl font-bold text-gray-800">
									{stats.done}
								</h3>
								<p className="text-xs text-green-600 mt-1">
									Successfully donated
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-600">
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="rounded-full bg-red-100 p-3 mr-4">
								<FaHeartbeat className="text-xl text-red-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Total Requests</p>
								<h3 className="text-2xl font-bold text-gray-800">
									{stats.total}
								</h3>
								<p className="text-xs text-red-600 mt-1">All time requests</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Charts Row */}
			<motion.div
				variants={fadeIn}
				transition={{ delay: 0.3 }}
				className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
			>
				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
					<CardHeader className="pb-0">
						<div className="flex justify-between items-center">
							<CardTitle className="text-lg font-semibold text-gray-800">
								Monthly Donation Activity
							</CardTitle>
							<Activity className="h-5 w-5 text-red-600" />
						</div>
						<p className="text-sm text-gray-500">
							Requests vs. completed donations
						</p>
					</CardHeader>
					<CardContent>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={monthlyData}>
									<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
									<XAxis dataKey="month" stroke="#6b7280" />
									<YAxis stroke="#6b7280" />
									<Tooltip
										contentStyle={{
											backgroundColor: "white",
											border: "none",
											borderRadius: "8px",
											boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
										}}
									/>
									<Legend wrapperStyle={{ paddingTop: "10px" }} />
									<Bar
										dataKey="requests"
										name="Total Requests"
										fill="#e11d48"
										radius={[4, 4, 0, 0]}
										barSize={20}
									/>
									<Bar
										dataKey="completed"
										name="Completed"
										fill="#10b981"
										radius={[4, 4, 0, 0]}
										barSize={20}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
					<CardHeader className="pb-0">
						<div className="flex justify-between items-center">
							<CardTitle className="text-lg font-semibold text-gray-800">
								Blood Type Distribution
							</CardTitle>
							<FaTint className="h-5 w-5 text-red-600" />
						</div>
						<p className="text-sm text-gray-500">
							Percentage distribution of blood type requests
						</p>
					</CardHeader>
					<CardContent>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={bloodTypeData}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										outerRadius={100}
										label={({ name, percent }) =>
											`${name} ${(percent * 100).toFixed(0)}%`
										}
										labelLine={false}
									>
										{bloodTypeData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
									<Tooltip
										formatter={(value) => [`${value} requests`, "Quantity"]}
										contentStyle={{
											backgroundColor: "white",
											border: "none",
											borderRadius: "8px",
											boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
										}}
									/>
									<Legend
										layout="vertical"
										align="right"
										verticalAlign="middle"
										iconType="circle"
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Recent Donation Requests */}
			<motion.div
				variants={fadeIn}
				transition={{ delay: 0.4 }}
				className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow mb-8"
			>
				<div className="p-6 border-b border-gray-100">
					<h2 className="text-xl font-bold text-gray-800 flex items-center">
						<FaTint className="mr-2 text-red-600" />
						Recent Donation Requests
					</h2>
					<p className="text-sm text-gray-500 mt-1">
						Latest blood donation requests that need your attention
					</p>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Recipient
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Blood Group
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Location
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{recentRequests.length > 0 ? (
								recentRequests.map((request, index) => (
									<tr key={request._id || index} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
													{request.recipientName?.charAt(0) || "U"}
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
											<div className="flex items-center text-sm text-gray-500">
												<FaMapMarkerAlt className="mr-1 text-gray-400" />
												{request.district}, {request.upazila}
											</div>
											<div className="text-xs text-gray-500 mt-1">
												<FaHospital className="inline mr-1" size={10} />
												{request.hospitalName}
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
											{getStatusBadge(request.status)}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="5"
										className="px-6 py-4 text-center text-gray-500"
									>
										<div className="flex flex-col items-center justify-center py-6">
											<FaTint className="text-4xl text-gray-300 mb-3" />
											<p className="text-lg font-medium">
												No recent donation requests
											</p>
											<p className="text-sm">New requests will appear here</p>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default VolunteerDashboard;
