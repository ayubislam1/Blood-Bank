import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAxiosPublic from "../hooks/useAxiosPublic";

const BloodDonationRequests = () => {
	const navigate = useNavigate();
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const axiosPublic = useAxiosPublic();

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const response = await axiosPublic.get(
					"/users-donation?status=pending"
				);
				setRequests(response.data);
			} catch (error) {
				Swal.fire("Error", "Could not load donation requests.", "error");
			} finally {
				setLoading(false);
			}
		};
		fetchRequests();
	}, []);

	const data = requests.filter((user) => user.status === "pending");

	const handleViewRequest = (id) => {
		navigate(`/donation-requests/${id}`);
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-lg font-semibold text-gray-500">Loading donation requests...</p>
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-lg font-semibold text-gray-500">No pending donation requests found.</p>
			</div>
		);
	}

	return (
		<div className="p-6 min-h-screen bg-gradient-to-b from-red-50 to-white">
			<h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
				Blood Donation Requests
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{data.map((request) => (
					<div
						key={request._id}
						className="p-6 border border-red-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
					>
						<h2 className="text-xl font-bold text-red-700 mb-2">
							{request.recipientName}
						</h2>
						<p className="text-gray-700 mb-1">
							<strong>Location:</strong> {request.district}
						</p>
						<p className="text-gray-700 mb-1">
							<strong>Blood Group:</strong>{" "}
							<span className="text-red-600 font-bold">{request.bloodGroup}</span>
						</p>
						<p className="text-gray-700 mb-1">
							<strong>Date:</strong> {request.donationDate}
						</p>
						<p className="text-gray-700 mb-1">
							<strong>Time:</strong> {request.donationTime}
						</p>
						<button
							onClick={() => handleViewRequest(request._id)}
							className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
						>
							View Details
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default BloodDonationRequests;
