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
import { useEffect, useState } from "react";
import userDonation from "../../../hooks/userDonation";


const AllDonationRequests = () => {
	const [donationRequests, setDonationRequests] = useState([]);
	const [filter, setFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const navigate = useNavigate();
    const [userDonationData, isLoading] = userDonation();


	useEffect(() => {
		
		if(userDonationData){
            setDonationRequests(userDonationData);
        }	
		
		}
	, [userDonationData]);

	const filteredRequests =
		filter === "all"
			? donationRequests
			: donationRequests.filter((req) => req.status === filter);

	const paginatedRequests = filteredRequests.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

	return (
		<div className="p-6 space-y-6 bg-gradient-to-b pl-10  min-h-screen">
			<h1 className="text-3xl font-bold text-red-600">All Blood Donation Requests</h1>

			<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
				<Select onValueChange={setFilter} value={filter}>
					<SelectTrigger className="w-full lg:w-64 border border-red-300 rounded-md shadow-sm bg-red-50">
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
			</div>

			{!donationRequests.length ? (
				<div className="text-center mt-4 text-gray-500">
					Loading donation requests...
				</div>
			) : (
				<>
					<Table className="table-auto w-full border border-red-300 rounded-lg shadow-md">
						<thead>
							<tr className="bg-red-100 text-red-700">
								{[
									"Recipient Name",
									"Location",
									"Date",
									"Time",
									"Blood Group",
									"Status",
									"Actions",
								].map((header) => (
									<th
										key={header}
										className="px-4 py-3 text-left text-sm font-bold border-b border-red-200"
									>
										{header}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{paginatedRequests.map((req) => (
								<tr
									key={req._id}
									className="hover:bg-red-50 border-b border-red-200"
								>
									<td className="px-4 py-3 align-middle">
										{req.recipientName}
									</td>
									<td className="px-4 py-3 align-middle">{`${req.district}, ${req.upazila}`}</td>
									<td className="px-4 py-3 align-middle">{req.donationDate}</td>
									<td className="px-4 py-3 align-middle">{req.donationTime}</td>
									<td className="px-4 py-3 font-bold text-red-600 align-middle">
										{req.bloodGroup}
									</td>
									<td className="px-4 py-3 align-middle">
										<span
											className={`px-3 py-1 text-xs rounded-full ${
												req.status === "done"
													? "bg-green-100 text-green-700"
													: req.status === "pending"
													? "bg-yellow-100 text-yellow-700"
													: req.status === "inprogress"
													? "bg-orange-100 text-orange-700"
													: "bg-red-100 text-red-700"
											}`}
										>
											{req.status}
										</span>
									</td>
									<td className="px-4 py-3 text-left">
										<div className="flex justify-center gap-2">
											<Button
												variant="outline"
												className="text-sm text-red-700 border-red-500"
												onClick={() => navigate(`/dashboard/edit/${req._id}`)}
											>
												Edit
											</Button>
											<Button
												variant="solid"
												className="text-sm bg-red-500 text-white"
												onClick={() => navigate(`/dashboard/view/${req._id}`)}
											>
												View
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</Table>

					<div className="flex justify-between items-center mt-6">
						<Button
							disabled={currentPage === 1}
							className="px-4 py-2 rounded-md bg-red-200 text-red-700 hover:bg-white hover:text-red-700 hover:border hover:border-red-200"
							onClick={() => setCurrentPage(currentPage - 1)}
						>
							Previous
						</Button>
						<span className="text-sm">
							Page {currentPage} of {totalPages}
						</span>
						<Button
							disabled={currentPage === totalPages}
							className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-white hover:text-red-700 hover:border hover:border-red-200"
							onClick={() => setCurrentPage(currentPage + 1)}
						>
							Next
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default AllDonationRequests;
