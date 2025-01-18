import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectContent,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useUsers from "../../../hooks/useUsers";

const CreateDonationRequest = () => {
	const axiosSecure = useAxiosSecure();
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();
	const [userData] = useUsers();
	console.log(userData);
	const [formData, setFormData] = useState({
		name: user?.displayName,
		photoUrl: user?.photoUrl,
		email: user?.email,
		recipientName: "",
		district: "",
		upazila: "",
		hospitalName: "",
		fullAddress: "",
		bloodGroup: "",
		donationDate: "",
		donationTime: "",
		requestMessage: "",
		status: "pending",
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (userData?.status !== "active") {
			alert(
				"You are not authorized to create a donation request. Please contact support."
			);
			return;
		}

		axiosPublic.post("/users-donation", formData).then((res) => {
			console.log(res);
		});
		console.log("Form submitted:", formData);
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Create Donation Request</h1>
			<form onSubmit={handleSubmit} className="mt-4 space-y-4">
				<Input label="Requester Name" value={formData.name} readOnly />
				<Input label="Requester Email" value={formData.email} readOnly />
				<Input
					label="Recipient Name"
					name="recipientName"
					placeholder="Enter recipient's name"
					onChange={(e) =>
						setFormData({ ...formData, recipientName: e.target.value })
					}
				/>
				<Select
					onValueChange={(value) =>
						setFormData({ ...formData, district: value })
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select District" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Dhaka">Dhaka</SelectItem>
						<SelectItem value="Chattogram">Chattogram</SelectItem>
					</SelectContent>
				</Select>
				<Select
					onValueChange={(value) =>
						setFormData({ ...formData, upazila: value })
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select Upazila" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Bakalia">Bakalia</SelectItem>
						<SelectItem value="Mirpur">Mirpur</SelectItem>
					</SelectContent>
				</Select>
				<Input
					label="Hospital Name"
					name="hospitalName"
					placeholder="Enter hospital name"
					onChange={(e) =>
						setFormData({ ...formData, hospitalName: e.target.value })
					}
				/>
				<Input
					label="Full Address"
					name="fullAddress"
					placeholder="Enter full address"
					onChange={(e) =>
						setFormData({ ...formData, fullAddress: e.target.value })
					}
				/>
				<Select
					onValueChange={(value) =>
						setFormData({ ...formData, bloodGroup: value })
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select Blood Group" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="A+">A+</SelectItem>
						<SelectItem value="B+">B+</SelectItem>
						<SelectItem value="AB+">AB+</SelectItem>
						<SelectItem value="O+">O+</SelectItem>
					</SelectContent>
				</Select>
				<Input
					label="Donation Date"
					name="donationDate"
					type="date"
					onChange={(e) =>
						setFormData({ ...formData, donationDate: e.target.value })
					}
				/>
				<Input
					label="Donation Time"
					name="donationTime"
					type="time"
					onChange={(e) =>
						setFormData({ ...formData, donationTime: e.target.value })
					}
				/>
				<textarea
					className="border p-2 w-full"
					name="requestMessage"
					placeholder="Write your request message here..."
					onChange={(e) =>
						setFormData({ ...formData, requestMessage: e.target.value })
					}
				></textarea>
				<Button type="submit">Submit Request</Button>
			</form>
		</div>
	);
};

export default CreateDonationRequest;
