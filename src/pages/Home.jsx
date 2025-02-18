import React from "react";
import Banner from "./Banner";

import ContactUs from "./ContactUs";
import FeaturedSection from "./FeaturedSection";
import BloodDonationCampaign from "./BloodDonationCampaign";
import NewFeature from "./NewFeature";
import Join from "./Join";


const Home = () => {
	return (
		<div>
			
			<Banner></Banner>
			<BloodDonationCampaign></BloodDonationCampaign>
			<NewFeature></NewFeature>
			<Join></Join>
			<FeaturedSection></FeaturedSection>
			<ContactUs></ContactUs>
		</div>
	);
};

export default Home;
