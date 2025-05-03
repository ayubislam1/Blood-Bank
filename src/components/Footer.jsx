import { Link } from "react-router";
import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
	FaHeart,
	FaPhoneAlt,
	FaMapMarkerAlt,
	FaEnvelope,
	FaHandHoldingHeart,
	FaBook,
	FaQuestion,
	FaUserShield,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
	const fadeInUp = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<footer className="relative bg-gradient-to-br from-red-700 to-red-800 text-white overflow-hidden">
			{/* Background pattern */}
			<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/inspiration-geometry.png')] opacity-5"></div>

			{/* Top wave decoration */}
			<div className="w-full overflow-hidden rotate-180">
				<svg
					className="relative block w-full h-20 text-red-700"
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

			<div className="container relative z-10 mx-auto px-6 pt-8 pb-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-16">
					<motion.div
						className="lg:col-span-2"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						variants={fadeInUp}
					>
						<div className="flex items-center gap-3 mb-6">
							<img
								src="https://i.ibb.co.com/k2Q5f2fz/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donatio.png"
								alt="Logo"
								className="w-10 h-10 bg-white rounded-full p-1"
							/>
							<h2 className="text-2xl font-bold">Blood Donation</h2>
						</div>
						<p className="text-red-100 mb-6 max-w-md">
							Our mission is to enhance lives through connecting blood donors
							with those in need. Every donation is a step toward saving a life
							and building a healthier community.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center transition-all hover:bg-red-500 hover:bg-opacity-100"
							>
								<FaFacebook className="text-white text-lg" />
							</a>
							<a
								href="#"
								className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center transition-all hover:bg-red-500 hover:bg-opacity-100"
							>
								<FaTwitter className="text-white text-lg" />
							</a>
							<a
								href="#"
								className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center transition-all hover:bg-red-500 hover:bg-opacity-100"
							>
								<FaInstagram className="text-white text-lg" />
							</a>
							<a
								href="#"
								className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center transition-all hover:bg-red-500 hover:bg-opacity-100"
							>
								<FaLinkedin className="text-white text-lg" />
							</a>
						</div>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						variants={fadeInUp}
					>
						<h3 className="text-xl font-semibold mb-6 flex items-center">
							<FaBook className="mr-2 text-red-300" /> Resources
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									to="/blog"
									className="text-red-100 hover:text-white transition-colors flex items-center"
								>
									<span className="w-2 h-2 bg-red-300 rounded-full mr-2"></span>{" "}
									Blog
								</Link>
							</li>
							<li>
								<Link
									to="/donation-requests"
									className="text-red-100 hover:text-white transition-colors flex items-center"
								>
									<span className="w-2 h-2 bg-red-300 rounded-full mr-2"></span>{" "}
									Donation Requests
								</Link>
							</li>
							<li>
								<Link
									to="/search"
									className="text-red-100 hover:text-white transition-colors flex items-center"
								>
									<span className="w-2 h-2 bg-red-300 rounded-full mr-2"></span>{" "}
									Find Donors
								</Link>
							</li>
							<li>
								<Link
									to="/funding"
									className="text-red-100 hover:text-white transition-colors flex items-center"
								>
									<span className="w-2 h-2 bg-red-300 rounded-full mr-2"></span>{" "}
									Funding
								</Link>
							</li>
						</ul>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
						variants={fadeInUp}
					>
						<h3 className="text-xl font-semibold mb-6 flex items-center">
							<FaUserShield className="mr-2 text-red-300" /> Company
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									to="/privacy-policy"
									className="text-red-100 hover:text-white transition-colors flex items-center"
								>
									<span className="w-2 h-2 bg-red-300 rounded-full mr-2"></span>{" "}
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									to="/terms-of-service"
									className="text-red-100 hover:text-white transition-colors flex items-center"
								>
									<span className="w-2 h-2 bg-red-300 rounded-full mr-2"></span>{" "}
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									to="/contact-us"
									className="text-red-100 hover:text-white transition-colors flex items-center"
								>
									<span className="w-2 h-2 bg-red-300 rounded-full mr-2"></span>{" "}
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									to="/about-us"
									className="text-red-100 hover:text-white transition-colors flex items-center"
								>
									<span className="w-2 h-2 bg-red-300 rounded-full mr-2"></span>{" "}
									About Us
								</Link>
							</li>
						</ul>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
						variants={fadeInUp}
					>
						<h3 className="text-xl font-semibold mb-6 flex items-center">
							<FaQuestion className="mr-2 text-red-300" /> Contact
						</h3>
						<ul className="space-y-4">
							<li className="flex items-start">
								<FaMapMarkerAlt className="mt-1 mr-3 text-red-300" />
								<span className="text-red-100">
									123 Main Street, Anytown, Bangladesh
								</span>
							</li>
							<li className="flex items-center">
								<FaPhoneAlt className="mr-3 text-red-300" />
								<span className="text-red-100">+880 1234 567890</span>
							</li>
							<li className="flex items-center">
								<FaEnvelope className="mr-3 text-red-300" />
								<span className="text-red-100">support@bloodbank.com</span>
							</li>
						</ul>
					</motion.div>
				</div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.5 }}
					variants={fadeInUp}
					className="mt-16 pt-8 border-t border-red-600"
				>
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-4 md:mb-0">
							<Link
								to="/register"
								className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold text-lg transition-all hover:bg-red-100 shadow-md transform hover:-translate-y-1"
							>
								<FaHandHoldingHeart className="text-xl" />
								Become a Donor
							</Link>
						</div>
						<p className="text-red-200 text-center md:text-right">
							© {new Date().getFullYear()} Blood Donation. All rights reserved.{" "}
							<br />
							<span className="text-sm">
								Made with{" "}
								<FaHeart className="inline text-red-300 animate-pulse" /> for
								saving lives
							</span>
						</p>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
