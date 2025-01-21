import { useState } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import registerAnimation from "../assets/Register.json"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

export default function Register() {
	const { CreateUser, updateName } = useAuth();
	const [loading, setLoading] = useState(false);
	const [errormessage, setErrormessage] = useState("");
	const [errmessage, setErrmessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();
	const image_host_key = import.meta.env.VITE_Image;
	const image_host_Api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;
	console.log(image_host_Api);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = e.target;
		const name = form.name.value.trim();
		const photoUrl = form.photoUrl.files;
		const email = form.email.value.trim();
		const pass = form.pass.value.trim();
		const confirmPass = form.confirmPass.value.trim();
		const bloodGroup = form.bloodGroup.value.trim();
		const district = form.district.value.trim();
		const upazila = form.upazila.value.trim();

		setErrormessage("");

		
		if (pass !== confirmPass) {
			setErrormessage("Passwords do not match.");
			return;
		}

		const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/;
		if (!regex.test(pass)) {
			setErrormessage(
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
			);
			return;
		}

		try {
		
			const formData = new FormData();
			formData.append("image", photoUrl[0]);

			const res = await axiosPublic.post(image_host_Api, formData);

			if (!res.data.success) {
				console.log("Image upload failed. Please try again.");
				return;
			}
			const imageUrl = res.data.data.display_url;
			const newUser = {
				name,
				photoUrl: imageUrl,
				email,
				bloodGroup,
				district,
				upazila,
				status: "active",
                role:"donor",
			};

			console.log("User details with image:", newUser);

			
			const userResult = await CreateUser(email, pass);
			console.log("Firebase user created:", userResult.user);

			await updateName(name, imageUrl);
			console.log("User profile updated successfully.");

		
			const response = await axiosSecure.post("/all-users", newUser);

			if (response.data.insertedId) {
				Swal.fire({
					position: "top-center",
					icon: "success",
					title: "Sign up success",
					showConfirmButton: false,
					timer: 1500,
				});

			
				navigate("/");
				form.reset();
			} else {
				console.log(
					"Failed to save user to the database. Please try again."
				);
			}
		} catch (error) {
			
			console.error("An error occurred:", error.response || error.message);

		}
	};

	return (
		<Card className="max-w-7xl mx-auto my-5 flex flex-col lg:flex-row items-center border-none shadow-md">
			<div className="flex-1 p-5">
				<CardHeader>
					<CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-500">
						Create an account
					</CardTitle>
					<CardDescription className="text-sm md:text-base">
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="full-name">Full name</Label>
							<Input
								id="full-name"
								placeholder="John Doe"
								name="name"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="Photo-url">Photo URL</Label>
							<Input
								id="Photo-url"
								type="File"
								placeholder="Photo URL"
								name="photoUrl"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="me@example.com"
								name="email"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="bloodGroup">Blood Group</Label>
							<select
								id="bloodGroup"
								name="bloodGroup"
								className="block w-full border-gray-300 rounded-md"
								required
							>
								<option value="">Select Blood Group</option>
								<option value="A+">A+</option>
								<option value="A-">A-</option>
								<option value="B+">B+</option>
								<option value="B-">B-</option>
								<option value="AB+">AB+</option>
								<option value="AB-">AB-</option>
								<option value="O+">O+</option>
								<option value="O-">O-</option>
							</select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="district">District</Label>
							<select
								id="district"
								name="district"
								className="block w-full border-gray-300 rounded-md"
								required
							>
								<option value="">Select District</option>
								<option value="Bagerhat">Bagerhat</option>
								<option value="Bandarban">Bandarban</option>
								<option value="Barguna">Barguna</option>
								<option value="Barishal">Barishal</option>
								<option value="Bhola">Bhola</option>
								<option value="Bogra">Bogra</option>
								<option value="Brahmanbaria">Brahmanbaria</option>
								<option value="Chandpur">Chandpur</option>
								<option value="Chattogram">Chattogram</option>
								<option value="Chuadanga">Chuadanga</option>
								<option value="Cox's Bazar">Cox's Bazar</option>
								<option value="Cumilla">Cumilla</option>
								<option value="Dhaka">Dhaka</option>
								<option value="Dinajpur">Dinajpur</option>
								<option value="Faridpur">Faridpur</option>
								<option value="Feni">Feni</option>
								<option value="Gaibandha">Gaibandha</option>
								<option value="Gazipur">Gazipur</option>
								<option value="Gopalganj">Gopalganj</option>
								<option value="Habiganj">Habiganj</option>
								<option value="Jamalpur">Jamalpur</option>
								<option value="Jashore">Jashore</option>
								<option value="Jhalokati">Jhalokati</option>
								<option value="Jhenaidah">Jhenaidah</option>
								<option value="Joypurhat">Joypurhat</option>
								<option value="Khagrachari">Khagrachari</option>
								<option value="Khulna">Khulna</option>
								<option value="Kishoreganj">Kishoreganj</option>
								<option value="Kurigram">Kurigram</option>
								<option value="Kushtia">Kushtia</option>
								<option value="Lakshmipur">Lakshmipur</option>
								<option value="Lalmonirhat">Lalmonirhat</option>
								<option value="Madaripur">Madaripur</option>
								<option value="Magura">Magura</option>
								<option value="Manikganj">Manikganj</option>
								<option value="Meherpur">Meherpur</option>
								<option value="Moulvibazar">Moulvibazar</option>
								<option value="Munshiganj">Munshiganj</option>
								<option value="Mymensingh">Mymensingh</option>
								<option value="Naogaon">Naogaon</option>
								<option value="Narail">Narail</option>
								<option value="Narayanganj">Narayanganj</option>
								<option value="Narsingdi">Narsingdi</option>
								<option value="Natore">Natore</option>
								<option value="Netrokona">Netrokona</option>
								<option value="Nilphamari">Nilphamari</option>
								<option value="Noakhali">Noakhali</option>
								<option value="Pabna">Pabna</option>
								<option value="Panchagarh">Panchagarh</option>
								<option value="Patuakhali">Patuakhali</option>
								<option value="Pirojpur">Pirojpur</option>
								<option value="Rajbari">Rajbari</option>
								<option value="Rajshahi">Rajshahi</option>
								<option value="Rangamati">Rangamati</option>
								<option value="Rangpur">Rangpur</option>
								<option value="Satkhira">Satkhira</option>
								<option value="Shariatpur">Shariatpur</option>
								<option value="Sherpur">Sherpur</option>
								<option value="Sirajganj">Sirajganj</option>
								<option value="Sunamganj">Sunamganj</option>
								<option value="Sylhet">Sylhet</option>
								<option value="Tangail">Tangail</option>
								<option value="Thakurgaon">Thakurgaon</option>
							</select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="upazila">Upazila</Label>
							<select
								id="upazila"
								name="upazila"
								className="block w-full border-gray-300 rounded-md"
								required
							>
								<option value="">Select Upazila</option>
								<option value="Ajmiriganj">Ajmiriganj</option>
								<option value="Akhaura">Akhaura</option>
								<option value="Alamdanga">Alamdanga</option>
								<option value="Akkelpur">Akkelpur</option>
								<option value="Amtali">Amtali</option>
								<option value="Anwara">Anwara</option>
								<option value="Araihazar">Araihazar</option>
								<option value="Atghoria">Atghoria</option>
								<option value="Atpara">Atpara</option>
								<option value="Austagram">Austagram</option>
								<option value="Bakalia">Bakalia</option>
								<option value="Babuganj">Babuganj</option>
								<option value="Badalgachhi">Badalgachhi</option>
								<option value="Bagerhat Sadar">Bagerhat Sadar</option>
								<option value="Bahubal">Bahubal</option>
								<option value="Bajitpur">Bajitpur</option>
								<option value="Bakerganj">Bakerganj</option>
								<option value="Banaripara">Banaripara</option>
								<option value="Bandarban Sadar">Bandarban Sadar</option>
								<option value="Bandar">Bandar</option>
								<option value="Baniachong">Baniachong</option>
								<option value="Banichal">Banichal</option>
								<option value="Banshkhali">Banshkhali</option>
								<option value="Baralekha">Baralekha</option>
								<option value="Barhatta">Barhatta</option>
								<option value="Barihat">Barihat</option>
								<option value="Bariyarhat">Bariyarhat</option>
								<option value="Bauphal">Bauphal</option>
								<option value="Bheramara">Bheramara</option>
								<option value="Bhola Sadar">Bhola Sadar</option>
								<option value="Bhuapur">Bhuapur</option>
								<option value="Bhuapur">Bhuapur</option>
								<option value="Birampur">Birampur</option>
								<option value="Birganj">Birganj</option>
								<option value="Birgonj">Birgonj</option>
								<option value="Birishiri">Birishiri</option>
								<option value="Biswanath">Biswanath</option>
								<option value="Boalkhali">Boalkhali</option>
								<option value="Bochaganj">Bochaganj</option>
								<option value="Boishampur">Boishampur</option>
								<option value="Chakaria">Chakaria</option>
								<option value="Chandanaish">Chandanaish</option>
								<option value="Chandpur Sadar">Chandpur Sadar</option>
								<option value="Chapainawabganj Sadar">
									Chapainawabganj Sadar
								</option>
								<option value="Charbhadrasan">Charbhadrasan</option>
								<option value="Chatmohar">Chatmohar</option>
								<option value="Chaugachha">Chaugachha</option>
								<option value="Chhagalnaiya">Chhagalnaiya</option>
								<option value="Chhagalnaiya">Chhagalnaiya</option>
								<option value="Chirirbandar">Chirirbandar</option>
								<option value="Chitalmari">Chitalmari</option>
								<option value="Chunarughat">Chunarughat</option>
								<option value="Comilla Sadar">Comilla Sadar</option>
								<option value="Comilla Sadar">Comilla Sadar</option>
								<option value="Daganbhuiyan">Daganbhuiyan</option>
								<option value="Damudya">Damudya</option>
								<option value="Damurhuda">Damurhuda</option>
								<option value="Daudkandi">Daudkandi</option>
								<option value="Debidwar">Debidwar</option>
								<option value="Debiganj">Debiganj</option>
								<option value="Delduar">Delduar</option>
								<option value="Derai">Derai</option>
								<option value="Dhamoirhat">Dhamoirhat</option>
								<option value="Dhamrai">Dhamrai</option>
								<option value="Dhanbari">Dhanbari</option>
								<option value="Dohar">Dohar</option>
								<option value="Domar">Domar</option>
								<option value="Dowarabazar">Dowarabazar</option>
								<option value="Dupchanchia">Dupchanchia</option>
								<option value="Fatikchhari">Fatikchhari</option>
								<option value="Fenchuganj">Fenchuganj</option>
								<option value="Gafargaon">Gafargaon</option>
								<option value="Gajaria">Gajaria</option>
								<option value="Gangni">Gangni</option>
								<option value="Gauripur">Gauripur</option>
								<option value="Gazipur Sadar">Gazipur Sadar</option>
								<option value="Gopalganj Sadar">Gopalganj Sadar</option>
								<option value="Gosairhat">Gosairhat</option>
								<option value="Gowainghat">Gowainghat</option>
								<option value="Gurudaspur">Gurudaspur</option>
								<option value="Habiganj Sadar">Habiganj Sadar</option>
								<option value="Haimchar">Haimchar</option>
								<option value="Haluaghat">Haluaghat</option>
								<option value="Harinakunda">Harinakunda</option>
								<option value="Harirampur">Harirampur</option>
								<option value="Hatibandha">Hatibandha</option>
								<option value="Hathazari">Hathazari</option>
								<option value="Homna">Homna</option>
								<option value="Ishwardi">Ishwardi</option>
								<option value="Itna">Itna</option>
								<option value="Jaintiapur">Jaintiapur</option>
								<option value="Jaldhaka">Jaldhaka</option>
								<option value="Jamalganj">Jamalganj</option>
								<option value="Jamalpur Sadar">Jamalpur Sadar</option>
								<option value="Jessore Sadar">Jessore Sadar</option>
								<option value="Jhenaidah Sadar">Jhenaidah Sadar</option>
								<option value="Kalapara">Kalapara</option>
								<option value="Kaliganj">Kaliganj</option>
								<option value="Kalkini">Kalkini</option>
								<option value="Kamalganj">Kamalganj</option>
								<option value="Kamalnagar">Kamalnagar</option>
								<option value="Kapasia">Kapasia</option>
								<option value="Kashiani">Kashiani</option>
								<option value="Katiadi">Katiadi</option>
								<option value="Kawkhali">Kawkhali</option>
								<option value="Kazipur">Kazipur</option>
								<option value="Kendua">Kendua</option>
								<option value="Keraniganj">Keraniganj</option>
								<option value="Khansama">Khansama</option>
								<option value="Kharura">Kharura</option>
								<option value="Kishoreganj Sadar">Kishoreganj Sadar</option>
								<option value="Kulaura">Kulaura</option>
								<option value="Kuliarchar">Kuliarchar</option>
								<option value="Kushtia Sadar">Kushtia Sadar</option>
								<option value="Lalbagh">Lalbagh</option>
								<option value="Lalmai">Lalmai</option>
								<option value="Lalmohan">Lalmohan</option>
								<option value="Lalmonirhat Sadar">Lalmonirhat Sadar</option>
								<option value="Madaripur Sadar">Madaripur Sadar</option>
								<option value="Madhabpur">Madhabpur</option>
								<option value="Madhupur">Madhupur</option>
								<option value="Magura Sadar">Magura Sadar</option>
								<option value="Manikganj Sadar">Manikganj Sadar</option>
								<option value="Mathbaria">Mathbaria</option>
								<option value="Matiranga">Matiranga</option>
								<option value="Mithapukur">Mithapukur</option>
								<option value="Mirsarai">Mirsarai</option>
								<option value="Mirzapur">Mirzapur</option>
								<option value="Mohadevpur">Mohadevpur</option>
								<option value="Mohanganj">Mohanganj</option>
								<option value="Moulvibazar Sadar">Moulvibazar Sadar</option>
								<option value="Muktagachha">Muktagachha</option>
								<option value="Muladi">Muladi</option>
								<option value="Munshiganj Sadar">Munshiganj Sadar</option>
								<option value="Muradnagar">Muradnagar</option>
								<option value="Nabiganj">Nabiganj</option>
								<option value="Nageshwari">Nageshwari</option>
								<option value="Narayanganj Sadar">Narayanganj Sadar</option>
								<option value="Narsingdi Sadar">Narsingdi Sadar</option>
								<option value="Pabna Sadar">Pabna Sadar</option>
								<option value="Palashbari">Palashbari</option>
								<option value="Panchagarh Sadar">Panchagarh Sadar</option>
								<option value="Rangpur Sadar">Rangpur Sadar</option>
								<option value="Satkania">Satkania</option>
								<option value="Sylhet Sadar">Sylhet Sadar</option>
								<option value="Tahirpur">Tahirpur</option>
							</select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Input
									id="password"
									placeholder="Password"
									type={showPassword ? "text" : "password"}
									name="pass"
									required
								/>
								<span
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
								>
									{showPassword ? (
										<EyeOffIcon className="w-5 h-5 text-gray-600" />
									) : (
										<EyeIcon className="w-5 h-5 text-gray-600" />
									)}
								</span>
							</div>

							<p className="text-red-500 text-xs md:text-sm">{errormessage}</p>
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirm-password">Confirm Password</Label>
							<div className="relative">
								<Input
									id="confirm-password"
									type={showConfirmPassword ? "text" : "password"}
									name="confirmPass"
									required
								/>
								<span
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
								>
									{showConfirmPassword ? (
										<EyeOffIcon className="w-5 h-5 text-gray-600" />
									) : (
										<EyeIcon className="w-5 h-5 text-gray-600" />
									)}
								</span>
							</div>
							<p className="text-red-500 text-xs md:text-sm">{errmessage}</p>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox />
							<p className="text-xs md:text-sm">
								I agree to the{" "}
								<span className="underline">Terms & Conditions</span>
							</p>
						</div>
						<Button className="w-full dark:text-white bg-red-500 hover:bg-red-500">
							{loading ? "Loading.." : "Sign up"}
						</Button>

						<p className="text-center text-sm md:text-base">
							Already have an account?
							<Link to="/login" className="underline font-semibold ">
								{" "}
								Sign in
							</Link>
						</p>
					</form>
				</CardContent>
			</div>
			<div className="max-w-full w-full md:w-1/2 object-contain p-5 ">
				<Lottie animationData={registerAnimation}></Lottie>
			</div>
		</Card>
	);
}
