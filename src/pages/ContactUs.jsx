import Lottie from "lottie-react";
import React, { useState } from "react";
import blood2 from "../assets/blood2.json";
import Swal from "sweetalert2";
const ContactUs = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		Swal.fire("Your message successfully send");
		
	};

	return (
		<div className="py-5 bg-white text-center md:flex justify-center items-center">
			<div className="ml-10 flex-1 max-w-xl ">
				<Lottie className="max-w-4xl" animationData={blood2}></Lottie>
			</div>
			<div className="mx-auto flex-1 max-w-xl">
				<h2 className="text-3xl font-bold mb-6">Contact Us</h2>
				<form onSubmit={handleSubmit} className="space-y-6 p-4">
					<div>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Your Name"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg"
							required
						/>
					</div>
					<div>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Your Email"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg"
							required
						/>
					</div>
					<div>
						<textarea
							name="message"
							value={formData.message}
							onChange={handleChange}
							placeholder="Your Message"
							rows="4"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg"
							required
						></textarea>
					</div>
					<button
						type="submit"
						className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default ContactUs;
