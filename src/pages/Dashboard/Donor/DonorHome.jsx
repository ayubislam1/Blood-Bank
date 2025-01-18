import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../../components/ui/button";
import { Table } from "../../../components/ui/table";
import Swal from "sweetalert2";
import userDonation from "../../../hooks/userDonation";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DonorHome = () => {
	const [userDonationData, isLoading,refetch] = userDonation();
	const [donationRequests, setDonationRequests] = useState([]);
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		setDonationRequests(userDonationData.slice(0, 3));
	}, [userDonationData]);

	const handleStatusChange = (id, status) => {
		setDonationRequests((prev) =>
			prev.map((req) => (req._id === id ? { ...req, status: status } : req))
		);
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
				axiosSecure.delete(`/users-donation/${id}`).then((res) => {
					if (res.data.deletedCount > 0) {
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
		<div className="p-6  mx-auto mt-10 md:mt-10">
			<div className="bg-red-100 text-red-700 rounded-lg p-4 mb-6 shadow-md">
				<h1 className="text-3xl font-bold">Welcome, Donor!</h1>
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
								<th className="px-4 py-2">Recipient Name</th>
								<th className="px-4 py-2">Location</th>
								<th className="px-4 py-2">Date</th>
								<th className="px-4 py-2">Time</th>
								<th className="px-4 py-2">Blood Group</th>
								<th className="px-4 py-2">Status</th>
								<th className="px-4 md:px-36  py-2">Actions</th>
							</tr>
						</thead>
						<tbody>
							{donationRequests.map((req) => (
								<tr key={req._id} className="hover:bg-red-50 border-b">
									<td className="px-4 py-2">{req.recipientName}</td>
									<td className="px-4 py-2">{`${req.district}, ${req.upazila}`}</td>
									<td className="px-4 py-2">{req.donationDate}</td>
									<td className="px-4 py-2">{req.donationTime}</td>
									<td className="px-4 py-2">{req.bloodGroup}</td>
									<td className="px-4 py-2">
										<span
											className={`px-3 py-1 text-sm rounded ${
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
									<td className="px-4 py-2 space-x-2 ">
										<div className="md:-ml-20 flex justify-center items-center gap-2">
                                        {req.status === "inprogress" && (
											<>
												<Button
													onClick={() => handleStatusChange(req._id, "done")}
													className="bg-green-500 hover:bg-green-600"
												>
													Done
												</Button>
												<Button
													onClick={() => handleStatusChange(req._id, "canceled")}
													className="bg-red-500 hover:bg-red-600"
												>
													Cancel
												</Button>
											</>
										)}
										<Button
											onClick={() => navigate(`/dashboard/edit/${req._id}`)}
											className="bg-blue-500 hover:bg-blue-600"
										>
											Edit
										</Button>
										<Button
											onClick={() => navigate(`/dashboard/view/${req._id}`)}
											className="bg-gray-500 hover:bg-gray-600"
										>
											View
										</Button>
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
					<div className="text-center mt-4">
						<img
							src="/empty-state.svg"
							alt="No Data"
							className="w-40 h-40 mx-auto"
						/>
						<p className="text-lg mt-4">
							No recent donation requests available.
						</p>
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
