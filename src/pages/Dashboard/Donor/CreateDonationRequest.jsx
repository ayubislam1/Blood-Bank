import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectContent,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {
	const { user, loading } = useAuth();
	const axiosPublic = useAxiosPublic();

	const [formData, setFormData] = useState({
		name: user?.displayName || "",
		email: user?.email || "",
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
		axiosPublic.post("/users-donation", formData).then((res) => {
			Swal.fire("Donation request submitted successfully!");
			setFormData({
				...formData,
				recipientName: "",
				hospitalName: "",
				fullAddress: "",
			});
		});
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
			<h1 className="text-2xl font-bold mb-6 text-center">
				Create Donation Request
			</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<Input
					label="Requester Name"
					value={formData.name}
					readOnly
					className="bg-gray-100"
				/>
				<Input
					label="Requester Email"
					value={formData.email}
					readOnly
					className="bg-gray-100"
				/>

				<Input
					label="Recipient Name"
					placeholder="Enter recipient's name"
					value={formData.recipientName}
					onChange={(e) =>
						setFormData({ ...formData, recipientName: e.target.value })
					}
					required
				/>

				<Select
					onValueChange={(value) =>
						setFormData({ ...formData, district: value })
					}
					required
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select District" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Bagerhat">Bagerhat</SelectItem>
						<SelectItem value="Bandarban">Bandarban</SelectItem>
						<SelectItem value="Barguna">Barguna</SelectItem>
						<SelectItem value="Barishal">Barishal</SelectItem>
						<SelectItem value="Bhola">Bhola</SelectItem>
						<SelectItem value="Bogra">Bogra</SelectItem>
						<SelectItem value="Brahmanbaria">Brahmanbaria</SelectItem>
						<SelectItem value="Chandpur">Chandpur</SelectItem>
						<SelectItem value="Chattogram">Chattogram</SelectItem>
						<SelectItem value="Chuadanga">Chuadanga</SelectItem>
						<SelectItem value="Cox's Bazar">Cox's Bazar</SelectItem>
						<SelectItem value="Cumilla">Cumilla</SelectItem>
						<SelectItem value="Dinajpur">Dinajpur</SelectItem>
						<SelectItem value="Faridpur">Faridpur</SelectItem>
						<SelectItem value="Feni">Feni</SelectItem>
						<SelectItem value="Gaibandha">Gaibandha</SelectItem>
						<SelectItem value="Gazipur">Gazipur</SelectItem>
						<SelectItem value="Gopalganj">Gopalganj</SelectItem>
						<SelectItem value="Habiganj">Habiganj</SelectItem>
						<SelectItem value="Jamalpur">Jamalpur</SelectItem>
						<SelectItem value="Jashore">Jashore</SelectItem>
						<SelectItem value="Jhalokati">Jhalokati</SelectItem>
						<SelectItem value="Jhenaidah">Jhenaidah</SelectItem>
						<SelectItem value="Joypurhat">Joypurhat</SelectItem>
						<SelectItem value="Khagrachari">Khagrachari</SelectItem>
						<SelectItem value="Khulna">Khulna</SelectItem>
						<SelectItem value="Kishoreganj">Kishoreganj</SelectItem>
						<SelectItem value="Kurigram">Kurigram</SelectItem>
						<SelectItem value="Kushtia">Kushtia</SelectItem>
						<SelectItem value="Lakshmipur">Lakshmipur</SelectItem>
						<SelectItem value="Lalmonirhat">Lalmonirhat</SelectItem>
						<SelectItem value="Madaripur">Madaripur</SelectItem>
						<SelectItem value="Magura">Magura</SelectItem>
						<SelectItem value="Manikganj">Manikganj</SelectItem>
						<SelectItem value="Meherpur">Meherpur</SelectItem>
						<SelectItem value="Moulvibazar">Moulvibazar</SelectItem>
						<SelectItem value="Munshiganj">Munshiganj</SelectItem>
						<SelectItem value="Mymensingh">Mymensingh</SelectItem>
						<SelectItem value="Naogaon">Naogaon</SelectItem>
						<SelectItem value="Narail">Narail</SelectItem>
						<SelectItem value="Narayanganj">Narayanganj</SelectItem>
						<SelectItem value="Narsingdi">Narsingdi</SelectItem>
						<SelectItem value="Natore">Natore</SelectItem>
						<SelectItem value="Netrokona">Netrokona</SelectItem>
						<SelectItem value="Nilphamari">Nilphamari</SelectItem>
						<SelectItem value="Noakhali">Noakhali</SelectItem>
						<SelectItem value="Pabna">Pabna</SelectItem>
						<SelectItem value="Panchagarh">Panchagarh</SelectItem>
						<SelectItem value="Patuakhali">Patuakhali</SelectItem>
						<SelectItem value="Pirojpur">Pirojpur</SelectItem>
						<SelectItem value="Rajbari">Rajbari</SelectItem>
						<SelectItem value="Rajshahi">Rajshahi</SelectItem>
						<SelectItem value="Rangamati">Rangamati</SelectItem>
						<SelectItem value="Rangpur">Rangpur</SelectItem>
						<SelectItem value="Satkhira">Satkhira</SelectItem>
						<SelectItem value="Shariatpur">Shariatpur</SelectItem>
						<SelectItem value="Sherpur">Sherpur</SelectItem>
						<SelectItem value="Sirajganj">Sirajganj</SelectItem>
						<SelectItem value="Sunamganj">Sunamganj</SelectItem>
						<SelectItem value="Sylhet">Sylhet</SelectItem>
						<SelectItem value="Tangail">Tangail</SelectItem>
						<SelectItem value="Thakurgaon">Thakurgaon</SelectItem>
					</SelectContent>
				</Select>

				<Select
					onValueChange={(value) =>
						setFormData({ ...formData, upazila: value })
					}
					required
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select Upazila" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Ajmiriganj">Ajmiriganj</SelectItem>
						<SelectItem value="Akhaura">Akhaura</SelectItem>
						<SelectItem value="Alamdanga">Alamdanga</SelectItem>
						<SelectItem value="Akkelpur">Akkelpur</SelectItem>
						<SelectItem value="Amtali">Amtali</SelectItem>
						<SelectItem value="Anwara">Anwara</SelectItem>
						<SelectItem value="Araihazar">Araihazar</SelectItem>
						<SelectItem value="Atghoria">Atghoria</SelectItem>
						<SelectItem value="Atpara">Atpara</SelectItem>
						<SelectItem value="Austagram">Austagram</SelectItem>
						<SelectItem value="Bakalia">Bakalia</SelectItem>
						<SelectItem value="Babuganj">Babuganj</SelectItem>
						<SelectItem value="Badalgachhi">Badalgachhi</SelectItem>
						<SelectItem value="Bagerhat Sadar">Bagerhat Sadar</SelectItem>
						<SelectItem value="Bahubal">Bahubal</SelectItem>
						<SelectItem value="Bajitpur">Bajitpur</SelectItem>
						<SelectItem value="Bakerganj">Bakerganj</SelectItem>
						<SelectItem value="Banaripara">Banaripara</SelectItem>
						<SelectItem value="Bandarban Sadar">Bandarban Sadar</SelectItem>
						<SelectItem value="Bandar">Bandar</SelectItem>
						<SelectItem value="Baniachong">Baniachong</SelectItem>
						<SelectItem value="Banichal">Banichal</SelectItem>
						<SelectItem value="Banshkhali">Banshkhali</SelectItem>
						<SelectItem value="Baralekha">Baralekha</SelectItem>
						<SelectItem value="Barhatta">Barhatta</SelectItem>
						<SelectItem value="Barihat">Barihat</SelectItem>
						<SelectItem value="Bariyarhat">Bariyarhat</SelectItem>
						<SelectItem value="Bauphal">Bauphal</SelectItem>
						<SelectItem value="Bheramara">Bheramara</SelectItem>
						<SelectItem value="Bhola Sadar">Bhola Sadar</SelectItem>
						<SelectItem value="Bhuapur">Bhuapur</SelectItem>
						<SelectItem value="Birampur">Birampur</SelectItem>
						<SelectItem value="Birganj">Birganj</SelectItem>
						<SelectItem value="Birgonj">Birgonj</SelectItem>
						<SelectItem value="Birishiri">Birishiri</SelectItem>
						<SelectItem value="Biswanath">Biswanath</SelectItem>
						<SelectItem value="Boalkhali">Boalkhali</SelectItem>
						<SelectItem value="Bochaganj">Bochaganj</SelectItem>
						<SelectItem value="Boishampur">Boishampur</SelectItem>
						<SelectItem value="Chakaria">Chakaria</SelectItem>
						<SelectItem value="Chandanaish">Chandanaish</SelectItem>
						<SelectItem value="Chandpur Sadar">Chandpur Sadar</SelectItem>
						<SelectItem value="Chapainawabganj Sadar">
							Chapainawabganj Sadar
						</SelectItem>
						<SelectItem value="Charbhadrasan">Charbhadrasan</SelectItem>
						<SelectItem value="Chatmohar">Chatmohar</SelectItem>
						<SelectItem value="Chaugachha">Chaugachha</SelectItem>
						<SelectItem value="Chhagalnaiya">Chhagalnaiya</SelectItem>
						<SelectItem value="Chirirbandar">Chirirbandar</SelectItem>
						<SelectItem value="Chitalmari">Chitalmari</SelectItem>
						<SelectItem value="Chunarughat">Chunarughat</SelectItem>
						<SelectItem value="Comilla Sadar">Comilla Sadar</SelectItem>
						<SelectItem value="Daganbhuiyan">Daganbhuiyan</SelectItem>
						<SelectItem value="Damudya">Damudya</SelectItem>
						<SelectItem value="Damurhuda">Damurhuda</SelectItem>
						<SelectItem value="Daudkandi">Daudkandi</SelectItem>
						<SelectItem value="Debidwar">Debidwar</SelectItem>
						<SelectItem value="Debiganj">Debiganj</SelectItem>
						<SelectItem value="Delduar">Delduar</SelectItem>
						<SelectItem value="Derai">Derai</SelectItem>
						<SelectItem value="Dhamoirhat">Dhamoirhat</SelectItem>
						<SelectItem value="Dhamrai">Dhamrai</SelectItem>
						<SelectItem value="Dhanbari">Dhanbari</SelectItem>
						<SelectItem value="Dohar">Dohar</SelectItem>
						<SelectItem value="Domar">Domar</SelectItem>
						<SelectItem value="Dowarabazar">Dowarabazar</SelectItem>
						<SelectItem value="Dupchanchia">Dupchanchia</SelectItem>
						<SelectItem value="Fatikchhari">Fatikchhari</SelectItem>
						<SelectItem value="Fenchuganj">Fenchuganj</SelectItem>
						<SelectItem value="Gafargaon">Gafargaon</SelectItem>
						<SelectItem value="Gajaria">Gajaria</SelectItem>
						<SelectItem value="Gangni">Gangni</SelectItem>
						<SelectItem value="Gauripur">Gauripur</SelectItem>
						<SelectItem value="Gazipur Sadar">Gazipur Sadar</SelectItem>
						<SelectItem value="Gopalganj Sadar">Gopalganj Sadar</SelectItem>
						<SelectItem value="Gosairhat">Gosairhat</SelectItem>
						<SelectItem value="Gowainghat">Gowainghat</SelectItem>
						<SelectItem value="Gurudaspur">Gurudaspur</SelectItem>
						<SelectItem value="Habiganj Sadar">Habiganj Sadar</SelectItem>
						<SelectItem value="Haimchar">Haimchar</SelectItem>
						<SelectItem value="Haluaghat">Haluaghat</SelectItem>
						<SelectItem value="Harinakunda">Harinakunda</SelectItem>
						<SelectItem value="Harirampur">Harirampur</SelectItem>
						<SelectItem value="Hatibandha">Hatibandha</SelectItem>
						<SelectItem value="Hathazari">Hathazari</SelectItem>
						<SelectItem value="Homna">Homna</SelectItem>
						<SelectItem value="Ishwardi">Ishwardi</SelectItem>
						<SelectItem value="Itna">Itna</SelectItem>
						<SelectItem value="Jaintiapur">Jaintiapur</SelectItem>
						<SelectItem value="Jaldhaka">Jaldhaka</SelectItem>
						<SelectItem value="Jamalganj">Jamalganj</SelectItem>
						<SelectItem value="Jamalpur Sadar">Jamalpur Sadar</SelectItem>
						<SelectItem value="Jessore Sadar">Jessore Sadar</SelectItem>
						<SelectItem value="Jhenaidah Sadar">Jhenaidah Sadar</SelectItem>
						<SelectItem value="Kalapara">Kalapara</SelectItem>
						<SelectItem value="Kaliganj">Kaliganj</SelectItem>
						<SelectItem value="Kalkini">Kalkini</SelectItem>
						<SelectItem value="Kamalganj">Kamalganj</SelectItem>
						<SelectItem value="Kamalnagar">Kamalnagar</SelectItem>
						<SelectItem value="Kapasia">Kapasia</SelectItem>
						<SelectItem value="Kashiani">Kashiani</SelectItem>
						<SelectItem value="Katiadi">Katiadi</SelectItem>
						<SelectItem value="Kawkhali">Kawkhali</SelectItem>
						<SelectItem value="Kazipur">Kazipur</SelectItem>
						<SelectItem value="Kendua">Kendua</SelectItem>
						<SelectItem value="Keraniganj">Keraniganj</SelectItem>
						<SelectItem value="Khansama">Khansama</SelectItem>
						<SelectItem value="Kishoreganj Sadar">Kishoreganj Sadar</SelectItem>
						<SelectItem value="Kulaura">Kulaura</SelectItem>
						<SelectItem value="Kuliarchar">Kuliarchar</SelectItem>
						<SelectItem value="Kushtia Sadar">Kushtia Sadar</SelectItem>
						<SelectItem value="Lalbagh">Lalbagh</SelectItem>
						<SelectItem value="Lalmai">Lalmai</SelectItem>
						<SelectItem value="Lalmohan">Lalmohan</SelectItem>
						<SelectItem value="Lalmonirhat Sadar">Lalmonirhat Sadar</SelectItem>
						<SelectItem value="Madaripur Sadar">Madaripur Sadar</SelectItem>
						<SelectItem value="Madhabpur">Madhabpur</SelectItem>
						<SelectItem value="Madhupur">Madhupur</SelectItem>
						<SelectItem value="Magura Sadar">Magura Sadar</SelectItem>
						<SelectItem value="Manikganj Sadar">Manikganj Sadar</SelectItem>
						<SelectItem value="Mathbaria">Mathbaria</SelectItem>
						<SelectItem value="Matiranga">Matiranga</SelectItem>
						<SelectItem value="Mithapukur">Mithapukur</SelectItem>
						<SelectItem value="Mirsarai">Mirsarai</SelectItem>
						<SelectItem value="Mirzapur">Mirzapur</SelectItem>
						<SelectItem value="Mohadevpur">Mohadevpur</SelectItem>
						<SelectItem value="Mohanganj">Mohanganj</SelectItem>
						<SelectItem value="Moulvibazar Sadar">Moulvibazar Sadar</SelectItem>
						<SelectItem value="Muktagachha">Muktagachha</SelectItem>
						<SelectItem value="Muladi">Muladi</SelectItem>
						<SelectItem value="Munshiganj Sadar">Munshiganj Sadar</SelectItem>
						<SelectItem value="Mymensingh Sadar">Mymensingh Sadar</SelectItem>
						<SelectItem value="Nageshwari">Nageshwari</SelectItem>
						<SelectItem value="Naogaon Sadar">Naogaon Sadar</SelectItem>
						<SelectItem value="Narayanganj Sadar">Narayanganj Sadar</SelectItem>
						<SelectItem value="Narsingdi Sadar">Narsingdi Sadar</SelectItem>
						<SelectItem value="Natore Sadar">Natore Sadar</SelectItem>
						<SelectItem value="Netrokona Sadar">Netrokona Sadar</SelectItem>
						<SelectItem value="Nilphamari Sadar">Nilphamari Sadar</SelectItem>
						<SelectItem value="Noakhali Sadar">Noakhali Sadar</SelectItem>
						<SelectItem value="Nobiganj">Nobiganj</SelectItem>
						<SelectItem value="Pabna Sadar">Pabna Sadar</SelectItem>
						<SelectItem value="Paltan">Paltan</SelectItem>
						<SelectItem value="Palash">Palash</SelectItem>
						<SelectItem value="Palashbari">Palashbari</SelectItem>
						<SelectItem value="Panchagarh Sadar">Panchagarh Sadar</SelectItem>
						<SelectItem value="Patiya">Patiya</SelectItem>
						<SelectItem value="Patnitala">Patnitala</SelectItem>
						<SelectItem value="Patuakhali Sadar">Patuakhali Sadar</SelectItem>
						<SelectItem value="Phulbari">Phulbari</SelectItem>
						<SelectItem value="Phultala">Phultala</SelectItem>
						<SelectItem value="Pirganj">Pirganj</SelectItem>
						<SelectItem value="Pirgachha">Pirgachha</SelectItem>
						<SelectItem value="Pirojpur Sadar">Pirojpur Sadar</SelectItem>
						<SelectItem value="Rajapur">Rajapur</SelectItem>
						<SelectItem value="Rajbari Sadar">Rajbari Sadar</SelectItem>
						<SelectItem value="Rajshahi Sadar">Rajshahi Sadar</SelectItem>
						<SelectItem value="Rangamati Sadar">Rangamati Sadar</SelectItem>
						<SelectItem value="Rangpur Sadar">Rangpur Sadar</SelectItem>
						<SelectItem value="Raipura">Raipura</SelectItem>
						<SelectItem value="Ramganj">Ramganj</SelectItem>
						<SelectItem value="Ramu">Ramu</SelectItem>
						<SelectItem value="Rangunia">Rangunia</SelectItem>
						<SelectItem value="Rowangchhari">Rowangchhari</SelectItem>
						<SelectItem value="Ruma">Ruma</SelectItem>
						<SelectItem value="Rupganj">Rupganj</SelectItem>
						<SelectItem value="Sadullapur">Sadullapur</SelectItem>
						<SelectItem value="Saghata">Saghata</SelectItem>
						<SelectItem value="Saidpur">Saidpur</SelectItem>
						<SelectItem value="Sakhipur">Sakhipur</SelectItem>
						<SelectItem value="Sandwip">Sandwip</SelectItem>
						<SelectItem value="Santhia">Santhia</SelectItem>
						<SelectItem value="Sarail">Sarail</SelectItem>
						<SelectItem value="Satkhira Sadar">Satkhira Sadar</SelectItem>
						<SelectItem value="Shahjadpur">Shahjadpur</SelectItem>
						<SelectItem value="Sharsha">Sharsha</SelectItem>
						<SelectItem value="Sheikhpara">Sheikhpara</SelectItem>
						<SelectItem value="Sherpur Sadar">Sherpur Sadar</SelectItem>
						<SelectItem value="Shibchar">Shibchar</SelectItem>
						<SelectItem value="Shibganj">Shibganj</SelectItem>
						<SelectItem value="Shyamnagar">Shyamnagar</SelectItem>
						<SelectItem value="Singair">Singair</SelectItem>
						<SelectItem value="Sirajganj Sadar">Sirajganj Sadar</SelectItem>
						<SelectItem value="Sitakunda">Sitakunda</SelectItem>
						<SelectItem value="Sonagazi">Sonagazi</SelectItem>
						<SelectItem value="Sonatala">Sonatala</SelectItem>
						<SelectItem value="Sreemangal">Sreemangal</SelectItem>
						<SelectItem value="Subarnachar">Subarnachar</SelectItem>
						<SelectItem value="Sundarganj">Sundarganj</SelectItem>
						<SelectItem value="Sylhet Sadar">Sylhet Sadar</SelectItem>
						<SelectItem value="Tangail Sadar">Tangail Sadar</SelectItem>
						<SelectItem value="Tarail">Tarail</SelectItem>
						<SelectItem value="Tarash">Tarash</SelectItem>
						<SelectItem value="Tekerhat">Tekerhat</SelectItem>
						<SelectItem value="Teknaf">Teknaf</SelectItem>
						<SelectItem value="Tetulia">Tetulia</SelectItem>
						<SelectItem value="Thakurgaon Sadar">Thakurgaon Sadar</SelectItem>
						<SelectItem value="Tongibari">Tongibari</SelectItem>
						<SelectItem value="Tungipara">Tungipara</SelectItem>
						<SelectItem value="Ujirpur">Ujirpur</SelectItem>
						<SelectItem value="Ulipur">Ulipur</SelectItem>
						<SelectItem value="Zianagar">Zianagar</SelectItem>
					</SelectContent>
				</Select>
                <Select
					onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}
					required
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select Blood Group" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="A+">A+</SelectItem>
						<SelectItem value="A-">A-</SelectItem>
						<SelectItem value="B+">B+</SelectItem>
						<SelectItem value="B-">B-</SelectItem>
						<SelectItem value="O+">O+</SelectItem>
						<SelectItem value="O-">O-</SelectItem>
						<SelectItem value="AB+">AB+</SelectItem>
						<SelectItem value="AB-">AB-</SelectItem>
					</SelectContent>
				</Select>

				<Input
					label="Hospital Name"
					placeholder="Enter hospital name"
					value={formData.hospitalName}
					onChange={(e) =>
						setFormData({ ...formData, hospitalName: e.target.value })
					}
					required
				/>
				<Input
					label="Full Address"
					placeholder="Enter full address"
					value={formData.fullAddress}
					onChange={(e) =>
						setFormData({ ...formData, fullAddress: e.target.value })
					}
					required
				/>
				<Input
					label="Donation Date"
					type="date"
					value={formData.donationDate}
					onChange={(e) =>
						setFormData({ ...formData, donationDate: e.target.value })
					}
					required
				/>
				<Input
					label="Donation Time"
					type="time"
					value={formData.donationTime}
					onChange={(e) =>
						setFormData({ ...formData, donationTime: e.target.value })
					}
					required
				/>
				<Textarea
					label="Request Message"
					placeholder="Write a short message..."
					value={formData.requestMessage}
					onChange={(e) =>
						setFormData({ ...formData, requestMessage: e.target.value })
					}
					required
				/>

				{/* Submit Button */}
				<Button
					type="submit"
					className="w-full bg-blue-500 text-white hover:bg-blue-600"
				>
					Submit Request
				</Button>
			</form>
		</div>
	);
};

export default CreateDonationRequest;
