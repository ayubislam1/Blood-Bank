import { useEffect, useState } from "react";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Table } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router";
import userDonation from "../../../hooks/userDonation";

const mockDonationRequests = [
	{
		id: 1,
		recipientName: "John Doe",
		recipientDistrict: "Dhaka",
		recipientUpazila: "Mirpur",
		donationDate: "2025-01-20",
		donationTime: "10:00 AM",
		bloodGroup: "A+",
		donationStatus: "inprogress",
		donorInfo: { name: "Alice", email: "alice@example.com" },
	},
];

const MyDonationRequests = () => {
	const [userDonationData] = userDonation();
	const [donationRequests, setDonationRequests] = useState([]);
	const [filter, setFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const navigate = useNavigate();

	useEffect(() => {
		setDonationRequests(mockDonationRequests);
	}, []);

	const filteredRequests =
		filter === "all"
			? donationRequests
			: donationRequests.filter((req) => req.donationStatus === filter);

	const paginatedRequests = filteredRequests.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">My Donation Requests</h1>
			<div className="mt-4">
				<Select onValueChange={setFilter} value={filter}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="pending">Pending</SelectItem>
						<SelectItem value="inprogress">In Progress</SelectItem>
						<SelectItem value="done">Done</SelectItem>
						<SelectItem value="canceled">Canceled</SelectItem>
					</SelectContent>
				</Select>
				{paginatedRequests.length > 0 ? (
					<>
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
								{paginatedRequests.map((req) => (
									<tr key={req.id}>
										<td>{req.recipientName}</td>
										<td>{`${req.recipientDistrict}, ${req.recipientUpazila}`}</td>
										<td>{req.donationDate}</td>
										<td>{req.donationTime}</td>
										<td>{req.bloodGroup}</td>
										<td>{req.donationStatus}</td>
										<td>
											<Button
												className="mr-2"
												onClick={() => navigate(`/dashboard/edit/${req.id}`)}
											>
												Edit
											</Button>
											<Button
												onClick={() => navigate(`/dashboard/view/${req.id}`)}
											>
												View
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<div className="flex justify-between items-center mt-4">
							<Button
								disabled={currentPage === 1}
								onClick={() => setCurrentPage(currentPage - 1)}
							>
								Previous
							</Button>
							<span>
								Page {currentPage} of {totalPages}
							</span>
							<Button
								disabled={currentPage === totalPages}
								onClick={() => setCurrentPage(currentPage + 1)}
							>
								Next
							</Button>
						</div>
					</>
				) : (
					<p className="mt-4">No donation requests found.</p>
				)}
			</div>
		</div>
	);
};

export default MyDonationRequests;
