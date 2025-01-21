import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../../components/ui/button";
import { Table } from "../../../components/ui/table";
import Swal from "sweetalert2";
import userDonation from "../../../hooks/userDonation";

import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const DonorHome = () => {
	const [userDonationData, isLoading, refetch] = userDonation();
	const [donationRequests, setDonationRequests] = useState([]);
	const navigate = useNavigate();
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();

	useEffect(() => {
		const filteredUsers = userDonationData.filter(
			(users) => users.email === user?.email
		);
		setDonationRequests(filteredUsers.slice(0, 3));
	}, [userDonationData, user?.email]);

	const handleStatusChange = async (id, status) => {
		try {
			const response = await axiosPublic.patch(`/users-donation/${id}/status`, {
				status,
			});
			if (response.data.modifiedCount > 0) {
				setDonationRequests((prevRequests) =>
					prevRequests.map((req) => (req._id === id ? { ...req, status } : req))
				);
				Swal.fire("Updated!", "The status has been updated.", "success");
				refetch();
			} else {
				Swal.fire("Error!", "Failed to update status.", "error");
			}
		} catch (error) {
			console.error("Error updating status:", error);
			Swal.fire("Error!", "An unexpected error occurred.", "error");
		}
	};

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to delete this donation request?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
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
			<div className="bg-red-100 text-red-700 rounded-lg p-6 mb-8 shadow-md">
				<h1 className="text-3xl font-bold">
					Welcome, Donor {user.displayName}
				</h1>
				<p className="mt-2 text-lg">
					Thank you for being a part of this lifesaving mission. Your recent
					donation requests are listed below.
				</p>
			</div>

			<div>
				<h2 className="text-2xl font-semibold mb-4">
					Recent Donation Requests
				</h2>
				{donationRequests.length > 0 ? (
					<Table className="table-auto border-collapse w-full text-left shadow-md">
						<thead className="bg-red-600 text-white">
							<tr>
								<th className="px-6 py-3">Recipient Name</th>
								<th className="px-6 py-3">Location</th>
								<th className="px-6 py-3">Date</th>
								<th className="px-6 py-3">Time</th>
								<th className="px-6 py-3">Blood Group</th>
								<th className="px-6 py-3">Status</th>
								<th className="px-6 py-3 text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{donationRequests.map((req) => (
								<tr key={req._id} className="hover:bg-red-50 border-b">
									<td className="px-6 py-4">{req.recipientName}</td>
									<td className="px-6 py-4">{`${req.district}, ${req.upazila}`}</td>
									<td className="px-6 py-4">{req.donationDate}</td>
									<td className="px-6 py-4">{req.donationTime}</td>
									<td className="px-6 py-4">{req.bloodGroup}</td>
									<td className="px-6 py-4">
										<span
											className={`py-1 px-3 text-sm rounded ${
												req.status === "done"
													? "bg-green-100 text-green-700"
													: req.status === "canceled"
													? "bg-red-100 text-red-700"
													: "bg-yellow-100 text-yellow-700"
											}`}
										>
											{req.status}
										</span>
									</td>
									<td className="px-6 py-4 space-x-3">
										<div className="flex justify-center items-center gap-2">
											{req.status === "inprogress" && (
												<>
													<Button
														onClick={() => handleStatusChange(req._id, "done")}
														className="bg-green-500 hover:bg-green-600"
													>
														Done
													</Button>
													<Button
														onClick={() =>
															handleStatusChange(req._id, "canceled")
														}
														className="bg-red-500 hover:bg-red-600"
													>
														Cancel
													</Button>
												</>
											)}
											<Link
												to={`/dashboard/edit/${req._id}`}
												className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
											>
												Edit
											</Link>
											<Link
												to={`/dashboard/view/${req._id}`}
												className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
											>
												View
											</Link>
											<Button
												onClick={() => handleDelete(req._id)}
												className="bg-red-500 hover:bg-red-600"
											>
												Delete
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<div className="text-center mt-6">
						<p className="text-lg">No recent donation requests available.</p>
						<Button
							onClick={() => navigate("/dashboard/myRequest")}
							className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
						>
							View My All Requests
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default DonorHome;
