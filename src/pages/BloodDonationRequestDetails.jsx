import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BloodDonationRequestDetails = () => {
	const { id } = useParams();
    console.log(id)
	const navigate = useNavigate();
	const [request, setRequest] = useState();
	const [loading, setLoading] = useState(true);
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	useEffect(() => {
		const fetchRequestDetails = async () => {
			try {
				const response = await axiosPublic.get(`/users-donation/${id}`);
				setRequest(response.data[0]);
				console.log(response.data);
			} catch (error) {
				Swal.fire("Error", "Could not fetch request details.", "error");
				navigate("/donation-requests");
			} finally {
				setLoading(false);
			}
		};
		fetchRequestDetails();
	}, [id, navigate]);

	const handleDonate = () => {
		Swal.fire({
			title: "Confirm Donation",
			html: `
        <p>Donor Name: <strong>${user.displayName}</strong></p>
        <p>Donor Email: <strong>${user.email}</strong></p>
      `,
			icon: "info",
			showCancelButton: true,
			confirmButtonText: "Confirm",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await axiosSecure.patch(`/users-donation/${id}`);
					Swal.fire("Success", "Donation confirmed.", "success");
					navigate("/donation-requests");
				} catch (error) {
					Swal.fire("Error", "Could not confirm donation.", "error");
				}
			}
		});
	};

	if (loading) {
		return <p>Loading request details...</p>;
	}

	if (!request) {
		return <p>Request not found.</p>;
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Request Details</h1>
			<div className="p-4 border rounded-lg shadow-md bg-white">
				<p>
					<strong>Recipient Name:</strong> {request.recipientName}
				</p>
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
					onClick={handleDonate}
					className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
				>
					Donate
				</button>
			</div>
		</div>
	);
};

export default BloodDonationRequestDetails;
