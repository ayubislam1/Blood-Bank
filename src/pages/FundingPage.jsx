
import React, { useState, useEffect } from "react";
import { Link} from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const FundingPage = () => {
	const [funds, setFunds] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	const fetchFunds = async () => {
		if (!user) {
			return;
		}

		setLoading(true);
		try {
			const res = await axiosSecure.get(`/payments`);
			console.log(res.data);
			setFunds(res.data);
			setTotalPages(res.data.totalPages);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		if (user) {
			fetchFunds();
		}
	}, [currentPage, user]);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Funding Page</h1>

			<div className="flex justify-between items-center mb-6">
				<Link
					to="/payment"
					className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
				>
					Give Fund
				</Link>
				<span className="text-lg font-semibold">
					Total Records: {funds?.length}
				</span>
			</div>

			{loading ? (
				<p>Loading...</p>
			) : (
				<table className="min-w-full border-collapse border border-gray-300 mb-4">
					<thead>
						<tr>
							<th className="border border-gray-300 px-4 py-2">Name</th>
							<th className="border border-gray-300 px-4 py-2">Amount</th>
							<th className="border border-gray-300 px-4 py-2">Date</th>
						</tr>
					</thead>
					<tbody>
						{funds?.map((fund, index) => (
							<tr key={index}>
								<td className="border border-gray-300 px-4 py-2">
									{fund.name}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									${fund.price}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{new Date(fund.date).toLocaleDateString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			<div className="flex justify-between">
				<button
					disabled={currentPage === 1}
					className={`py-2 px-4 rounded-lg ${
						currentPage === 1 ? "bg-gray-400" : "bg-blue-600 text-white"
					}`}
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
				>
					Previous
				</button>
				<span className="py-2 px-4">
					Page {currentPage} of {totalPages}
				</span>
				<button
					disabled={currentPage === totalPages}
					className={`py-2 px-4 rounded-lg ${
						currentPage === totalPages
							? "bg-gray-400"
							: "bg-blue-600 text-white"
					}`}
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default FundingPage;
