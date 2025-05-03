import React from "react";
import {
	Users,
	DollarSign,
	Heart,
	Activity,
	TrendingUp,
	Calendar,
	AlertCircle,
} from "lucide-react";
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
	LineChart,
	Line,
	Area,
	AreaChart,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "../../../components/ui/card";
import { motion } from "framer-motion";
import {
	FaUsers,
	FaUserShield,
	FaUserMd,
	FaHandHoldingHeart,
	FaTint,
	FaCalendarCheck,
} from "react-icons/fa";

const AdminDashboard = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	const {
		data: stats = { users: 0, donations: 0, requests: 0 },
		isLoading: statsLoading,
	} = useQuery({
		queryKey: ["stats"],
		queryFn: async () => {
			const res = await axiosSecure.get("/stats-item");
			return res.data;
		},
	});

	// Sample data - in a real application, this would come from your backend
	const monthlyData = [
		{ month: "Jan", donations: 45, donors: 32 },
		{ month: "Feb", donations: 52, donors: 38 },
		{ month: "Mar", donations: 48, donors: 35 },
		{ month: "Apr", donations: 70, donors: 42 },
		{ month: "May", donations: 65, donors: 45 },
		{ month: "Jun", donations: 85, donors: 55 },
		{ month: "Jul", donations: 75, donors: 48 },
	];

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

	const trendData = [
		{ name: "Week 1", value: 400 },
		{ name: "Week 2", value: 320 },
		{ name: "Week 3", value: 500 },
		{ name: "Week 4", value: 380 },
		{ name: "Week 5", value: 450 },
		{ name: "Week 6", value: 600 },
	];

	const donationStatusData = [
		{ name: "Completed", value: 65 },
		{ name: "Pending", value: 25 },
		{ name: "Cancelled", value: 10 },
	];

	const COLORS = [
		"#dc2626",
		"#2563eb",
		"#16a34a",
		"#7c3aed",
		"#ea580c",
		"#0891b2",
		"#db2777",
		"#84cc16",
	];
	const STATUS_COLORS = ["#16a34a", "#eab308", "#dc2626"];

	const fadeInVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={fadeInVariants}
			transition={{ duration: 0.5 }}
			className="px-6 py-8 max-w-7xl mx-auto"
		>
			{/* Welcome Card */}
			<motion.div
				variants={fadeInVariants}
				transition={{ delay: 0.1 }}
				className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-xl mb-8 overflow-hidden"
			>
				<div className="px-8 py-6 flex flex-col md:flex-row justify-between items-center">
					<div className="text-white">
						<h1 className="text-3xl font-bold mb-2">
							Welcome, {user?.displayName || "Admin"}
						</h1>
						<p className="opacity-90 max-w-xl">
							Manage your blood donation platform and track key statistics. Your
							role is crucial in maintaining the system and supporting
							life-saving activities.
						</p>
					</div>
					<div className="mt-4 md:mt-0">
						<img
							src={
								user?.photoURL ||
								"https://www.svgrepo.com/show/452030/avatar.svg"
							}
							alt="Admin"
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
							<span>New requests: {stats?.newRequests || 8}</span>
						</div>
						<div className="flex items-center gap-2">
							<Activity className="h-5 w-5" />
							<span>Platform Status: Active</span>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Stat Cards */}
			<motion.div
				variants={fadeInVariants}
				transition={{ delay: 0.2 }}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
			>
				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-600">
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="rounded-full bg-red-100 p-3 mr-4">
								<FaUsers className="text-xl text-red-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Total Users</p>
								<h3 className="text-2xl font-bold text-gray-800">
									{stats?.users || 0}
								</h3>
								<p className="text-xs text-green-600 mt-1">
									↑ 12% from last month
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600">
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="rounded-full bg-blue-100 p-3 mr-4">
								<FaHandHoldingHeart className="text-xl text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Total Donations</p>
								<h3 className="text-2xl font-bold text-gray-800">
									{stats?.donations || 0}
								</h3>
								<p className="text-xs text-green-600 mt-1">
									↑ 18% from last month
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-600">
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="rounded-full bg-purple-100 p-3 mr-4">
								<FaUserMd className="text-xl text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Volunteers</p>
								<h3 className="text-2xl font-bold text-gray-800">
									{stats?.volunteers || 42}
								</h3>
								<p className="text-xs text-green-600 mt-1">
									↑ 8% from last month
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600">
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="rounded-full bg-green-100 p-3 mr-4">
								<FaCalendarCheck className="text-xl text-green-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Requests</p>
								<h3 className="text-2xl font-bold text-gray-800">
									{stats?.requests || 0}
								</h3>
								<p className="text-xs text-green-600 mt-1">
									↑ 14% from last month
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Charts Row 1 */}
			<motion.div
				variants={fadeInVariants}
				transition={{ delay: 0.3 }}
				className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
			>
				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
					<CardHeader className="pb-0">
						<div className="flex justify-between items-center">
							<CardTitle className="text-lg font-semibold text-gray-800">
								Monthly Donations
							</CardTitle>
							<TrendingUp className="h-5 w-5 text-green-600" />
						</div>
						<p className="text-sm text-gray-500">
							Number of donations and donors per month
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
										dataKey="donations"
										name="Donations"
										fill="#dc2626"
										radius={[4, 4, 0, 0]}
										barSize={20}
									/>
									<Bar
										dataKey="donors"
										name="Donors"
										fill="#2563eb"
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
							Percentage distribution by blood type
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
										formatter={(value) => [`${value} units`, "Quantity"]}
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

			{/* Charts Row 2 */}
			<motion.div
				variants={fadeInVariants}
				transition={{ delay: 0.4 }}
				className="grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
					<CardHeader className="pb-0">
						<div className="flex justify-between items-center">
							<CardTitle className="text-lg font-semibold text-gray-800">
								Donation Trends
							</CardTitle>
							<Activity className="h-5 w-5 text-indigo-600" />
						</div>
						<p className="text-sm text-gray-500">
							Weekly donation trends for the past 6 weeks
						</p>
					</CardHeader>
					<CardContent>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart
									data={trendData}
									margin={{
										top: 10,
										right: 30,
										left: 0,
										bottom: 0,
									}}
								>
									<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
									<XAxis dataKey="name" stroke="#6b7280" />
									<YAxis stroke="#6b7280" />
									<Tooltip
										contentStyle={{
											backgroundColor: "white",
											border: "none",
											borderRadius: "8px",
											boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
										}}
									/>
									<Area
										type="monotone"
										dataKey="value"
										stroke="#7c3aed"
										fill="url(#colorValue)"
										activeDot={{ r: 6 }}
									/>
									<defs>
										<linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
											<stop
												offset="95%"
												stopColor="#7c3aed"
												stopOpacity={0.1}
											/>
										</linearGradient>
									</defs>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
					<CardHeader className="pb-0">
						<div className="flex justify-between items-center">
							<CardTitle className="text-lg font-semibold text-gray-800">
								Donation Status
							</CardTitle>
							<FaCalendarCheck className="h-5 w-5 text-green-600" />
						</div>
						<p className="text-sm text-gray-500">
							Current status of all donation requests
						</p>
					</CardHeader>
					<CardContent>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={donationStatusData}
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
										{donationStatusData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={STATUS_COLORS[index % STATUS_COLORS.length]}
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
		</motion.div>
	);
};

export default AdminDashboard;
