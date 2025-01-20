import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { FaSearch } from "react-icons/fa";

const districts = [
	"Bagerhat",
	"Bandarban",
	"Barguna",
	"Barishal",
	"Bhola",
	"Bogra",
	"Brahmanbaria",
	"Chandpur",
	"Chattogram",
	"Chuadanga",
	"Cox's Bazar",
	"Cumilla",
	"Dhaka",
	"Dinajpur",
	"Faridpur",
	"Feni",
	"Gaibandha",
	"Gazipur",
	"Gopalganj",
	"Habiganj",
	"Jamalpur",
	"Jashore",
	"Jhalokati",
	"Jhenaidah",
	"Joypurhat",
	"Khagrachari",
	"Khulna",
	"Kishoreganj",
	"Kurigram",
	"Kushtia",
	"Lakshmipur",
	"Lalmonirhat",
	"Madaripur",
	"Magura",
	"Manikganj",
	"Meherpur",
	"Moulvibazar",
	"Munshiganj",
	"Mymensingh",
	"Naogaon",
	"Narail",
	"Narayanganj",
	"Narsingdi",
	"Natore",
	"Netrokona",
	"Nilphamari",
	"Noakhali",
	"Pabna",
	"Panchagarh",
	"Patuakhali",
	"Pirojpur",
	"Rajbari",
	"Rajshahi",
	"Rangamati",
	"Rangpur",
	"Satkhira",
	"Shariatpur",
	"Sherpur",
	"Sirajganj",
	"Sunamganj",
	"Sylhet",
	"Tangail",
	"Thakurgaon",
];
const upazilas = [
	"Savar",
	"Gazipur",
	"Mirpur",
	"Motijheel",
	"Bakalia",
	"Ajmiriganj",
	"Akhaura",
	"Alamdanga",
	"Akkelpur",
	"Amtali",
	"Anwara",
	"Araihazar",
	"Atghoria",
	"Atpara",
	"Austagram",
	"Babuganj",
	"Badalgachhi",
	"Bagerhat Sadar",
	"Bahubal",
	"Bajitpur",
	"Bakerganj",
	"Banaripara",
	"Bandarban Sadar",
	"Bandar",
	"Baniachong",
	"Banichal",
	"Banshkhali",
	"Baralekha",
	"Barhatta",
	"Barihat",
	"Bariyarhat",
	"Bauphal",
	"Bheramara",
	"Bhola Sadar",
	"Bhuapur",
	"Birampur",
	"Birganj",
	"Birishiri",
	"Biswanath",
	"Boalkhali",
	"Bochaganj",
	"Boishampur",
	"Chakaria",
	"Chandanaish",
	"Chandpur Sadar",
	"Chapainawabganj Sadar",
	"Charbhadrasan",
	"Chatmohar",
	"Chaugachha",
	"Chhagalnaiya",
	"Chirirbandar",
	"Chitalmari",
	"Chunarughat",
	"Comilla Sadar",
	"Daganbhuiyan",
	"Damudya",
	"Damurhuda",
	"Dashmina",
	"Debhata",
	"Debidwar",
	"Debiganj",
	"Dewanganj",
	"Dhamoirhat",
	"Dhobaura",
	"Dohar",
	"Dumki",
	"Dumuria",
	"Dupchanchia",
	"Fatikchhari",
	"Fenchuganj",
	"Fulbaria",
	"Gabtali",
	"Gafargaon",
	"Galachipa",
	"Gangachara",
	"Gangni",
	"Gaurnadi",
	"Genda",
	"Gobindaganj",
	"Golachipa",
	"Gopalganj Sadar",
	"Gopalpur",
	"Gowainghat",
	"Habiganj Sadar",
	"Harinakunda",
	"Hatiya",
	"Hizla",
	"Hossainpur",
	"Ishwarganj",
	"Ishwardi",
	"Jagannathpur",
	"Jaldhaka",
	"Jamalganj",
	"Jamalpur Sadar",
	"Jessore Sadar",
	"Jhalokati Sadar",
	"Jhenaidah Sadar",
	"Kalapara",
	"Kalaroa",
	"Kaliakair",
	"Kalkini",
	"Kalmakanda",
	"Kalukhali",
	"Kapasia",
	"Kaptai",
	"Kashiani",
	"Kazipur",
	"Khagrachari Sadar",
	"Khaliajuri",
	"Khalishpur",
	"Kishoreganj Sadar",
	"Kotalipara",
	"Kotchandpur",
	"Kumarkhali",
	"Kushtia Sadar",
	"Lakhai",
	"Lalmohan",
	"Lalmonirhat Sadar",
	"Lohagara",
	"Magura Sadar",
	"Maheshkhali",
	"Mithapukur",
	"Moulvibazar Sadar",
	"Munshiganj Sadar",
	"Muradnagar",
	"Mymensingh Sadar",
	"Nabinagar",
	"Nageshwari",
	"Naikhongchhari",
	"Nalchity",
	"Naldanga",
	"Narail Sadar",
	"Narayanpur",
	"Narsingdi Sadar",
	"Nasirnagar",
	"Netrokona Sadar",
	"Niamatpur",
	"Nilphamari Sadar",
	"Noakhali Sadar",
	"Pabna Sadar",
	"Panchagarh Sadar",
	"Patuakhali Sadar",
	"Pekua",
	"Pirojpur Sadar",
	"Pirganj",
	"Pirgonj",
	"Porsha",
	"Raiganj",
	"Rajarhat",
	"Rajbari Sadar",
	"Rajshahi Sadar",
	"Ramganj",
	"Ramgati",
	"Rangamati Sadar",
	"Rangpur Sadar",
	"Raumari",
	"Rupganj",
	"Sadarghat",
	"Satkania",
	"Shahjadpur",
	"Shariatpur Sadar",
	"Sherpur Sadar",
	"Sirajganj Sadar",
	"Sitakunda",
	"Sonagazi",
	"Sunamganj Sadar",
	"Sylhet Sadar",
	"Tangail Sadar",
	"Taraganj",
	"Tekerhat",
	"Thakurgaon Sadar",
	"Ullapara",
	"Zanjira",
];

const SearchPage = () => {
	const [formData, setFormData] = useState({
		bloodGroup: "",
		district: "",
		upazila: "",
	});
	const [donors, setDonors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const axiosPublic = useAxiosPublic();

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await axiosPublic.post("/search-donors", formData);
			setDonors(res.data);
		} catch (error) {
			console.error("Error fetching donors:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold text-red-700 mb-6">Search Donors</h1>

			<form
				onSubmit={handleSearch}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
			>
				<Select
					onValueChange={(value) => handleInputChange("bloodGroup", value)}
					value={formData.bloodGroup}
				>
					<SelectTrigger className="w-full border-red-600">
						<SelectValue placeholder="Select Blood Group" />
					</SelectTrigger>
					<SelectContent>
						{["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
							<SelectItem key={group} value={group} required>
								{group}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					onValueChange={(value) => handleInputChange("district", value)}
					value={formData.district}
				>
					<SelectTrigger className="w-full border-red-600">
						<SelectValue placeholder="Select District" />
					</SelectTrigger>
					<SelectContent>
						{districts.map((district) => (
							<SelectItem key={district} value={district}>
								{district}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					onValueChange={(value) => handleInputChange("upazila", value)}
					value={formData.upazila}
				>
					<SelectTrigger className="w-full border-red-600">
						<SelectValue placeholder="Select Upazila" />
					</SelectTrigger>
					<SelectContent>
						{upazilas.map((upazila) => (
							<SelectItem key={upazila} value={upazila}>
								{upazila}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Button
					type="submit"
					className="bg-red-600 text-white hover:bg-red-700"
				>
                    <FaSearch></FaSearch>
					Search
				</Button>
			</form>

			<div className="mt-8">
				{isLoading ? (
					<p className="text-red-700">Searching for donors...</p>
				) : donors.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{donors.map((donor) => (
							<div
								key={donor.id}
								className="p-4 border rounded-lg shadow-sm bg-white border-red-200"
							>
								<h2 className="text-xl font-bold text-red-700">{donor.name}</h2>
								<p>Blood Group: {donor.bloodGroup}</p>
								<p>District: {donor.district}</p>
								<p>Upazila: {donor.upazila}</p>
								<p>Contact: 01*******</p>
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-600">
						No donors found. Try adjusting your search.
					</p>
				)}
			</div>
		</div>
	);
};

export default SearchPage;
