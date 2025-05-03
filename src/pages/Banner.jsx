import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaSearch, FaHeartbeat } from "react-icons/fa";

const Banner = () => {
	return (
		<div className="relative min-h-screen bg-white text-gray-800 pt-24 overflow-hidden">
			{/* Background gradient and pattern */}
			<div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 opacity-90"></div>
			<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

			{/* Main content container */}
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 pt-12">
				{/* Left content - text and buttons */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="text-center lg:text-left max-w-2xl flex-1"
				>
					{/* Floating badge */}
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="inline-block px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium mb-8 border border-red-100 shadow-sm"
					>
						Give the gift of life
					</motion.div>

					<h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
						<span className="text-red-600">Donate Blood,</span> Save Lives
						<motion.span
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.8, duration: 0.5 }}
							className="inline-block ml-2"
						>
							❤️
						</motion.span>
					</h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.8 }}
						className="text-xl mb-8 text-gray-600"
					>
						Your donation can save up to 3 lives! Join our community of heroes
						making a difference every day. Together, we can create a healthier
						future.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7, duration: 0.5 }}
						className="flex flex-wrap justify-center lg:justify-start gap-4"
					>
						<Link
							to="/register"
							className="group inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all hover:bg-red-700 shadow-md hover:shadow-lg transform hover:-translate-y-1"
						>
							<FaHandHoldingHeart className="text-xl group-hover:animate-pulse" />
							Join as a Donor
						</Link>
						<Link
							to="/search"
							className="group inline-flex items-center justify-center gap-2 bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-semibold text-lg transition-all hover:bg-red-50 shadow-md hover:shadow-lg transform hover:-translate-y-1"
						>
							<FaSearch className="text-xl" />
							Find Donors
						</Link>
					</motion.div>

					{/* Stats */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1, duration: 0.8 }}
						className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
					>
						<div className="flex items-center gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
								<FaHeartbeat className="text-2xl" />
							</div>
							<div>
								<h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
								<p className="text-gray-600">Donations</p>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
								<FaHandHoldingHeart className="text-2xl" />
							</div>
							<div>
								<h3 className="text-2xl font-bold text-gray-900">5,000+</h3>
								<p className="text-gray-600">Donors</p>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M6.5 2a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h3V8.5A1.5 1.5 0 0111 7h3V2.5a.5.5 0 00-.5-.5h-7zM11 8h3v6.5a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h4v3z" />
								</svg>
							</div>
							<div>
								<h3 className="text-2xl font-bold text-gray-900">30,000+</h3>
								<p className="text-gray-600">Lives Saved</p>
							</div>
						</div>
					</motion.div>
				</motion.div>

				{/* Right content - image */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="relative flex-1 mt-12 lg:mt-0"
				>
					<div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
						<motion.img
							initial={{ scale: 1.2 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.8 }}
							src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
							alt="Blood Donation"
							className="w-full h-auto object-cover"
						/>
					</div>
					<div className="absolute top-0 left-0 w-full h-full bg-red-600 rounded-2xl -z-10 transform rotate-3 translate-x-6 translate-y-6"></div>
				</motion.div>
			</div>

			{/* Wave decoration */}
			<div className="absolute bottom-0 left-0 w-full overflow-hidden">
				<svg
					className="relative block w-full h-20 text-red-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
					preserveAspectRatio="none"
				>
					<path
						fill="currentColor"
						d="M0,224L48,218.7C96,213,192,203,288,176C384,149,480,107,576,122.7C672,139,768,213,864,213.3C960,213,1056,139,1152,101.3C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
					></path>
				</svg>
			</div>

			{/* Animated elements */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2, duration: 1 }}
				className="absolute top-1/4 left-10 w-8 h-8 text-red-200"
			>
				<motion.svg
					animate={{ y: [0, -10, 0] }}
					transition={{ repeat: Infinity, duration: 2 }}
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
				</motion.svg>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.4, duration: 1 }}
				className="absolute top-1/3 right-20 w-12 h-12 text-red-100"
			>
				<motion.svg
					animate={{ rotate: 360 }}
					transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 19.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
				</motion.svg>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.6, duration: 1 }}
				className="absolute bottom-1/4 left-1/4 w-10 h-10 text-red-100"
			>
				<motion.svg
					animate={{ scale: [1, 1.2, 1] }}
					transition={{ repeat: Infinity, duration: 3 }}
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M17.73 12.02l3.98-3.98c.39-.39.39-1.02 0-1.41l-4.34-4.34a.996.996 0 00-1.41 0l-3.98 3.98L8 2.29a1.001 1.001 0 00-1.41 0L2.25 6.63c-.39.39-.39 1.02 0 1.41l3.98 3.98L2.25 16c-.39.39-.39 1.02 0 1.41l4.34 4.34c.39.39 1.02.39 1.41 0l3.98-3.98 3.98 3.98c.2.2.45.29.71.29.26 0 .51-.1.71-.29l4.34-4.34c.39-.39.39-1.02 0-1.41l-3.99-3.98zM12 9c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-4.71 1.96L3.66 7.34l3.63-3.63 3.62 3.62-3.62 3.63zM10 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1zm2-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2.66 9.34l-3.63-3.62 3.63-3.63 3.62 3.62-3.62 3.63z" />
				</motion.svg>
			</motion.div>
		</div>
	);
};

export default Banner;
