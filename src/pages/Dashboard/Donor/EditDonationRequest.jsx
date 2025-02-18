import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../../../components/ui/button";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth"; // Assuming you have a custom hook for authentication
import useAdmin from "../../../hooks/useAdmin";

const EditDonationRequest = () => {
	const { id } = useParams();
	const [donationRequest, setDonationRequest] = useState({});
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [isAdmin] = useAdmin();

	useEffect(() => {
		axiosSecure.get(`/users-donation/${id}`).then((res) => {
			setDonationRequest(res.data[0]);
			setLoading(false);
		});
	}, [id, axiosSecure]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDonationRequest((prev) => ({ ...prev, [name]: value }));
	};

	const handleUpdate = () => {
		axiosSecure
			.put(`/users-donation/${id}`, donationRequest)
			.then((res) => {
				if (res.data.modifiedCount > 0) {
					Swal.fire(
						"Updated!",
						"Your donation request has been updated.",
						"success"
					);
				}
			})
			.catch((err) => {
				Swal.fire(
					"Error",
					"There was an issue updating the donation request.",
					"error"
				);
			});
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"></div>
				<span className="ml-2 text-red-500 font-semibold">Loading...</span>
			</div>
		);
	}

	return (
		<div className="p-6 mx-auto mt-10 bg-red-50 rounded-lg shadow-lg">
			<h2 className="text-3xl font-bold text-center text-red-700 mb-6">
				Edit Your Blood Donation Request
			</h2>
			<div className="bg-white p-6 rounded-lg shadow-md">
				<div className="mb-4">
					<label className="block text-red-700 font-semibold">
						Recipient Name
					</label>
					<input
						type="text"
						name="recipientName"
						value={donationRequest.recipientName}
						onChange={handleChange}
						className="w-full px-4 py-2 border rounded-md"
						placeholder="Enter recipient's name"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-red-700 font-semibold">Location</label>
					<input
						type="text"
						name="location"
						value={`${donationRequest.district}, ${donationRequest.upazila}`}
						onChange={handleChange}
						className="w-full px-4 py-2 border rounded-md"
						placeholder="Enter location"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-red-700 font-semibold">
						Blood Group
					</label>
					<select
						name="bloodGroup"
						value={donationRequest.bloodGroup}
						onChange={handleChange}
						className="w-full px-4 py-2 border rounded-md"
					>
						<option value="A+">A+</option>
						<option value="B+">B+</option>
						<option value="O+">O+</option>
						<option value="O-">O-</option>
						<option value="A-">A-</option>
						<option value="B-">B-</option>
						<option value="AB+">AB+</option>
						<option value="AB-">AB-</option>
					</select>
				</div>
				<div className="mb-4">
					<label className="block text-red-700 font-semibold">
						Donation Date
					</label>
					<input
						type="date"
						name="donationDate"
						value={donationRequest.donationDate}
						onChange={handleChange}
						className="w-full px-4 py-2 border rounded-md"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-red-700 font-semibold">
						Donation Time
					</label>
					<input
						type="time"
						name="donationTime"
						value={donationRequest.donationTime}
						onChange={handleChange}
						className="w-full px-4 py-2 border rounded-md"
					/>
				</div>

				{isAdmin && (
					<div className="mb-4">
						<label className="block text-red-700 font-semibold">Status</label>
						<select
							name="status"
							value={donationRequest.status}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-md"
						>
							<option value="inprogress">In Progress</option>
							<option value="done">Done</option>
							<option value="canceled">Canceled</option>
						</select>
					</div>
				)}
				<Button
					onClick={handleUpdate}
					className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-md"
				>
					Update Donation Request
				</Button>
			</div>
		</div>
	);
};

export default EditDonationRequest;
