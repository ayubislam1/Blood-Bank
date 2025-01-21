import React from "react";
import { Link } from "react-router";

const Banner = () => {
	return (
		<div className="relative  bg-red-600 text-white py-16 px-4 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-red-500 opacity-90"></div>

			<div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
				<div className="text-center lg:text-left max-w-2xl">
					<h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
						Donate Blood, Save Lives ❤️
					</h1>
					<p className="text-lg mb-6">
						Join our mission to save lives by donating blood. Together, we can
						make a difference!
					</p>
					<div className="flex flex-wrap justify-center    space-x-4 md:space-x-12 md:space-y-0 ">
						<Link
							to="/register"
							className="bg-white text-red-600 py-3 px-8 rounded-lg font-semibold shadow-lg transform transition-all hover:scale-105 hover:bg-gray-200"
						>
							Join as a Donor
						</Link>
						<Link
							to="/search"
							className="border-2 border-white text-white  py-3 px-8 rounded-lg font-semibold shadow-lg transform transition-all hover:scale-105 hover:bg-white hover:text-red-600"
						>
							Search Donors
						</Link>
					</div>
				</div>

				<div className="w-full max-w-lg">
					<img
						src="https://media.istockphoto.com/id/1403182301/photo/preparation-for-blood-test-by-female-doctor-medical-uniform-on-the-table-in-white-bright-room.jpg?s=612x612&w=0&k=20&c=U5lfNS8V5aIVrQ4jxd6ST-ayXWXDfV4biSYWdBxGZbQ="
						alt="Blood Donation Campaign "
						className="w-full h-full object-cover rounded-lg shadow-xl relative z-10"
					/>
					<img
						src="https://media.istockphoto.com/id/1403182301/photo/preparation-for-blood-test-by-female-doctor-medical-uniform-on-the-table-in-white-bright-room.jpg?s=612x612&w=0&k=20&c=U5lfNS8V5aIVrQ4jxd6ST-ayXWXDfV4biSYWdBxGZbQ="
						alt="Blood Donation Campaign"
						className="w-full h-full object-cover rounded-lg shadow-xl -mt-64 ml-16 opacity-40 "
					/>
				</div>
			</div>

			<div className="absolute top-16 left-10 w-12 h-12">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="text-red-400 opacity-70 drop-shadow-lg animate-pulse"
				>
					<path d="M12 2C8.8 2 6.2 4.6 6.2 7.8c0 3.2 5.8 10.2 5.8 10.2s5.8-7 5.8-10.2C17.8 4.6 15.2 2 12 2zm0 10.2c-1.3 0-2.4-1.1-2.4-2.4S10.7 7.4 12 7.4s2.4 1.1 2.4 2.4-1.1 2.4-2.4 2.4z" />
				</svg>
			</div>

			<div className="absolute top-32 right-16 w-16 h-16">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="text-red-300 opacity-80 drop-shadow-2xl animate-bounce"
				>
					<path d="M12 2C8.8 2 6.2 4.6 6.2 7.8c0 3.2 5.8 10.2 5.8 10.2s5.8-7 5.8-10.2C17.8 4.6 15.2 2 12 2zm0 10.2c-1.3 0-2.4-1.1-2.4-2.4S10.7 7.4 12 7.4s2.4 1.1 2.4 2.4-1.1 2.4-2.4 2.4z" />
				</svg>
			</div>

			<div className="absolute bottom-16 left-20 w-14 h-14">
				<svg
					xmlns=""
					viewBox="0 0 24 24"
					fill="currentColor"
					className="text-red-500 opacity-70 drop-shadow-xl animate-ping"
				>
					<path d="M12 2C8.8 2 6.2 4.6 6.2 7.8c0 3.2 5.8 10.2 5.8 10.2s5.8-7 5.8-10.2C17.8 4.6 15.2 2 12 2zm0 10.2c-1.3 0-2.4-1.1-2.4-2.4S10.7 7.4 12 7.4s2.4 1.1 2.4 2.4-1.1 2.4-2.4 2.4z" />
				</svg>
			</div>

			<div className="absolute bottom-0 left-0 w-full overflow-hidden">
				<svg
					className="relative block w-full h-20 text-red-500"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
				>
					<path
						fill="currentColor"
						d="M0,224L48,218.7C96,213,192,203,288,176C384,149,480,107,576,122.7C672,139,768,213,864,213.3C960,213,1056,139,1152,101.3C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
					></path>
				</svg>
			</div>
		</div>
	);
};

export default Banner;
