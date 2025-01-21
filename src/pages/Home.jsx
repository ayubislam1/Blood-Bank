import React from "react";
import Banner from "./Banner";
import { Contact } from "lucide-react";
import ContactUs from "./ContactUs";
import FeaturedSection from "./FeaturedSection";
import BloodDonationCampaign from "./BloodDonationCampaign";

const Home = () => {
	return (
		<div>
			<Banner></Banner>
            <BloodDonationCampaign></BloodDonationCampaign>
            <FeaturedSection></FeaturedSection>
			<ContactUs></ContactUs>
            
		</div>
	);
};

export default Home;
