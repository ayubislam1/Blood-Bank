import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import {
	FaCalendarAlt,
	FaClock,
	FaMapMarkerAlt,
	FaTint,
	FaUserInjured,
	FaHospital,
	FaNotesMedical,
	FaCheckCircle,
	FaInfoCircle,
	FaPaperPlane,
} from "react-icons/fa";

const CreateDonationRequest = () => {
	const { user } = useAuth();
	const axiosPublic = useAxiosPublic();
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();
	const [districts, setDistricts] = useState([]);
	const [upazilas, setUpazilas] = useState([]);
	const [filteredUpazilas, setFilteredUpazilas] = useState([]);
	const selectedDistrict = watch("district");

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const districtsResponse = await axiosPublic.get("/districts");
				setDistricts(districtsResponse.data);

				const upazilasResponse = await axiosPublic.get("/upazilas");
				setUpazilas(upazilasResponse.data);
			} catch (error) {
				console.error("Error fetching locations:", error);
			}
		};

		fetchLocations();
	}, [axiosPublic]);

	useEffect(() => {
		if (selectedDistrict) {
			const filtered = upazilas.filter(
				(upazila) => upazila.district_id === selectedDistrict
			);
			setFilteredUpazilas(filtered);
		} else {
			setFilteredUpazilas([]);
		}
	}, [selectedDistrict, upazilas]);

	const onSubmit = async (data) => {
		try {
			const donationRequestData = {
				...data,
				requesterName: user?.displayName,
				requesterEmail: user?.email,
				status: "inprogress",
				donorEmail: "", // Will be filled when a donor accepts
				creationDate: new Date().toISOString(),
			};

			const response = await axiosPublic.post(
				"/users-donation",
				donationRequestData
			);

			if (response.data.insertedId) {
				reset();
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "Donation request created successfully!",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.error("Error creating donation request:", error);
			Swal.fire({
				position: "top-end",
				icon: "error",
				title: "Failed to create donation request.",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	const fadeInUp = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={fadeInUp}
			transition={{ duration: 0.5 }}
			className="max-w-4xl mx-auto px-4 py-8"
		>
			<div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
				{/* Header */}
				<div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-6 text-white">
					<h2 className="text-2xl font-bold flex items-center">
						<FaTint className="mr-3 text-3xl" />
						Create Blood Donation Request
					</h2>
					<p className="mt-1 opacity-90">
						Please fill out the form below to create a new blood donation
						request
					</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit(onSubmit)} className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Recipient Name */}
						<motion.div
							variants={fadeInUp}
							transition={{ delay: 0.1 }}
							className="space-y-2"
						>
							<label className="block text-sm font-medium text-gray-700 flex items-center">
								<FaUserInjured className="mr-2 text-red-500" />
								Recipient Name
							</label>
							<div className="relative">
								<input
									type="text"
									{...register("recipientName", { required: true })}
									placeholder="Enter recipient's name"
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.recipientName ? "border-red-500" : "border-gray-300"
									} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
								/>
								{errors.recipientName && (
									<p className="mt-1 text-xs text-red-500">
										Recipient name is required
									</p>
								)}
							</div>
						</motion.div>

						{/* Blood Group */}
						<motion.div
							variants={fadeInUp}
							transition={{ delay: 0.15 }}
							className="space-y-2"
						>
							<label className="block text-sm font-medium text-gray-700 flex items-center">
								<FaTint className="mr-2 text-red-500" />
								Blood Group
							</label>
							<div className="relative">
								<select
									{...register("bloodGroup", { required: true })}
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.bloodGroup ? "border-red-500" : "border-gray-300"
									} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
								>
									<option value="">Select blood group</option>
									<option value="A+">A+</option>
									<option value="A-">A-</option>
									<option value="B+">B+</option>
									<option value="B-">B-</option>
									<option value="AB+">AB+</option>
									<option value="AB-">AB-</option>
									<option value="O+">O+</option>
									<option value="O-">O-</option>
								</select>
								{errors.bloodGroup && (
									<p className="mt-1 text-xs text-red-500">
										Blood group is required
									</p>
								)}
							</div>
						</motion.div>

						{/* Hospital Name */}
						<motion.div
							variants={fadeInUp}
							transition={{ delay: 0.2 }}
							className="space-y-2"
						>
							<label className="block text-sm font-medium text-gray-700 flex items-center">
								<FaHospital className="mr-2 text-red-500" />
								Hospital Name
							</label>
							<div className="relative">
								<input
									type="text"
									{...register("hospitalName", { required: true })}
									placeholder="Enter hospital name"
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.hospitalName ? "border-red-500" : "border-gray-300"
									} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
								/>
								{errors.hospitalName && (
									<p className="mt-1 text-xs text-red-500">
										Hospital name is required
									</p>
								)}
							</div>
						</motion.div>

						{/* Hospital Address */}
						<motion.div
							variants={fadeInUp}
							transition={{ delay: 0.25 }}
							className="space-y-2"
						>
							<label className="block text-sm font-medium text-gray-700 flex items-center">
								<FaMapMarkerAlt className="mr-2 text-red-500" />
								Hospital Address
							</label>
							<div className="relative">
								<input
									type="text"
									{...register("hospitalAddress", { required: true })}
									placeholder="Enter hospital address"
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.hospitalAddress
											? "border-red-500"
											: "border-gray-300"
									} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
								/>
								{errors.hospitalAddress && (
									<p className="mt-1 text-xs text-red-500">
										Hospital address is required
									</p>
								)}
							</div>
						</motion.div>

						{/* Date */}
						<motion.div
							variants={fadeInUp}
							transition={{ delay: 0.3 }}
							className="space-y-2"
						>
							<label className="block text-sm font-medium text-gray-700 flex items-center">
								<FaCalendarAlt className="mr-2 text-red-500" />
								Donation Date
							</label>
							<div className="relative">
								<input
									type="date"
									{...register("donationDate", { required: true })}
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.donationDate ? "border-red-500" : "border-gray-300"
									} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
								/>
								{errors.donationDate && (
									<p className="mt-1 text-xs text-red-500">
										Donation date is required
									</p>
								)}
							</div>
						</motion.div>

						{/* Time */}
						<motion.div
							variants={fadeInUp}
							transition={{ delay: 0.35 }}
							className="space-y-2"
						>
							<label className="block text-sm font-medium text-gray-700 flex items-center">
								<FaClock className="mr-2 text-red-500" />
								Donation Time
							</label>
							<div className="relative">
								<input
									type="time"
									{...register("donationTime", { required: true })}
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.donationTime ? "border-red-500" : "border-gray-300"
									} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
								/>
								{errors.donationTime && (
									<p className="mt-1 text-xs text-red-500">
										Donation time is required
									</p>
								)}
							</div>
						</motion.div>

						{/* District */}
						<motion.div
							variants={fadeInUp}
							transition={{ delay: 0.4 }}
							className="space-y-2"
						>
							<label className="block text-sm font-medium text-gray-700 flex items-center">
								<FaMapMarkerAlt className="mr-2 text-red-500" />
								District
							</label>
							<div className="relative">
								<select
									{...register("district", { required: true })}
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.district ? "border-red-500" : "border-gray-300"
									} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
								>
									<option value="">Select district</option>
									{districts.map((district) => (
										<option key={district.id} value={district.id}>
											{district.name}
										</option>
									))}
								</select>
								{errors.district && (
									<p className="mt-1 text-xs text-red-500">
										District is required
									</p>
								)}
							</div>
						</motion.div>

						{/* Upazila */}
						<motion.div
							variants={fadeInUp}
							transition={{ delay: 0.45 }}
							className="space-y-2"
						>
							<label className="block text-sm font-medium text-gray-700 flex items-center">
								<FaMapMarkerAlt className="mr-2 text-red-500" />
								Upazila
							</label>
							<div className="relative">
								<select
									{...register("upazila", { required: true })}
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.upazila ? "border-red-500" : "border-gray-300"
									} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
									disabled={!selectedDistrict}
								>
									<option value="">
										{selectedDistrict
											? "Select upazila"
											: "Select district first"}
									</option>
									{filteredUpazilas.map((upazila) => (
										<option key={upazila.id} value={upazila.id}>
											{upazila.name}
										</option>
									))}
								</select>
								{errors.upazila && (
									<p className="mt-1 text-xs text-red-500">
										Upazila is required
									</p>
								)}
							</div>
						</motion.div>
					</div>

					{/* Message */}
					<motion.div
						variants={fadeInUp}
						transition={{ delay: 0.5 }}
						className="mt-6 space-y-2"
					>
						<label className="block text-sm font-medium text-gray-700 flex items-center">
							<FaNotesMedical className="mr-2 text-red-500" />
							Request Message
						</label>
						<div className="relative">
							<textarea
								{...register("requestMessage", { required: true })}
								rows="4"
								placeholder="Enter details about the donation request..."
								className={`w-full px-4 py-3 rounded-lg border ${
									errors.requestMessage ? "border-red-500" : "border-gray-300"
								} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
							></textarea>
							{errors.requestMessage && (
								<p className="mt-1 text-xs text-red-500">
									Request message is required
								</p>
							)}
						</div>
					</motion.div>

					{/* Submit Button */}
					<motion.div
						variants={fadeInUp}
						transition={{ delay: 0.55 }}
						className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between"
					>
						<div className="flex items-start bg-blue-50 text-blue-700 p-3 rounded-lg">
							<FaInfoCircle
								className="flex-shrink-0 mr-2 mt-0.5"
								fontSize="small"
							/>
							<p className="text-sm">
								Your request will be reviewed and published immediately. You'll
								be notified when a donor accepts your request.
							</p>
						</div>

						<Button
							type="submit"
							className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<span className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"></span>
									Creating...
								</>
							) : (
								<>
									<FaPaperPlane className="mr-1" />
									Create Request
								</>
							)}
						</Button>
					</motion.div>
				</form>

				{/* Info Panel */}
				<div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex justify-between items-center text-sm text-gray-600">
					<div className="flex items-center">
						<FaCheckCircle className="text-green-500 mr-2" />
						All information will be kept confidential
					</div>
					<div>Need help? Contact support</div>
				</div>
			</div>
		</motion.div>
	);
};

export default CreateDonationRequest;
