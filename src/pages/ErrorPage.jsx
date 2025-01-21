import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
	return (
		<div className="h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-16">
			<div className="text-center">
				<h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
				<h2 className="text-3xl font-semibold text-gray-800 mb-4">
					Oops! Something went wrong.
				</h2>
				<p className="text-lg text-gray-600 mb-8">
					The page you're looking for doesn't exist or may have been moved.
				</p>
				<div className="">
					<Link
						to="/"
						className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-400 transition duration-300"
					>
						Go Back Home
					</Link>
					
				</div>
			</div>
			<div className="mt-16">
				<img
					src="https://via.placeholder.com/400x300?text=Blood+Donation+Logo"
					alt="Blood Donation Logo"
					className="rounded-lg shadow-md"
				/>
			</div>
		</div>
	);
};

export default ErrorPage;
