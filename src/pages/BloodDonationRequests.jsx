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
				console.log(response.data);
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
		return <p>Loading donation requests...</p>;
	}

	if (requests.length === 0) {
		return <p>No pending donation requests found.</p>;
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Blood Donation Requests</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{data.map((request) => (
					<div
						key={request._id}
						className="p-4 border rounded-lg shadow-md bg-white"
					>
						<h2 className="text-lg font-bold">{request.recipientName}</h2>
						<p>
							<strong>Location:</strong> {request.district}
						</p>
						<p>
							<strong>Blood Group:</strong> {request.bloodGroup}
						</p>
						<p>
							<strong>Date:</strong> {request.donationDate}
						</p>
						<p>
							<strong>Time:</strong> {request.donationTime}
						</p>
						<button
							onClick={() => handleViewRequest(request._id)}
							className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
