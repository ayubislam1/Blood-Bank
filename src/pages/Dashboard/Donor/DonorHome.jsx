import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../../components/ui/button";
import { Table } from "../../../components/ui/table";
import Swal from "sweetalert2";
import userDonation from "../../../hooks/userDonation";



const DonorHome = () => {
    const [userDonationData,isLoading] = userDonation();
    console.log(userDonationData)
	const [donationRequests, setDonationRequests] = useState([]);
	const navigate = useNavigate();


	useEffect(() => {
		setDonationRequests(userDonationData.slice(0, 3));
	}, [userDonationData]);
    if(isLoading){
        return <div>Loading...</div>
    }

	const handleStatusChange = (id, status) => {
		setDonationRequests((prev) =>
			prev.map((req) =>
				req.id === id ? { ...req, status: status } : req
			)
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
				// Simulate delete action
				setDonationRequests((prev) => prev.filter((req) => req.id !== id));
				Swal.fire(
					"Deleted!",
					"Your donation request has been deleted.",
					"success"
				);
			}
		});
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Welcome, Donor!</h1>
			<div className="mt-6">
				<h2 className="text-xl font-semibold">Recent Donation Requests</h2>
				{donationRequests.length > 0 ? (
					<Table className="mt-4">
						<thead>
							<tr>
								<th>Recipient Name</th>
								<th>Location</th>
								<th>Date</th>
								<th>Time</th>
								<th>Blood Group</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{donationRequests.map((req) => (
								<tr key={req._id}>
									<td>{req.recipientName}</td>
									<td>{`${req.district}, ${req.upazila}`}</td>
									<td>{req.donationDate}</td>
									<td>{req.donationTime}</td>
									<td>{req.bloodGroup}</td>
									<td>{req.status}</td>
									<td>
										{req.status === "inprogress" && (
											<>
												<Button
													onClick={() => handleStatusChange(req.id, "done")}
													className="mr-2"
												>
													Done
												</Button>
												<Button
													onClick={() => handleStatusChange(req.id, "canceled")}
													variant="destructive"
												>
													Cancel
												</Button>
											</>
										)}
										<Button
											onClick={() => navigate(`/dashboard/edit/${req.id}`)}
											className="mr-2"
										>
											Edit
										</Button>
										<Button
											onClick={() => navigate(`/dashboard/view/${req.id}`)}
										>
											View
										</Button>
										<Button
											onClick={() => handleDelete(req.id)}
											variant="destructive"
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<p className="mt-4">No recent donation requests available.</p>
				)}
				<Button
					onClick={() => navigate("/dashboard/myRequest")}
					className="mt-4"
				>
					View My All Requests
				</Button>
			</div>
		</div>
	);
};

export default DonorHome;
