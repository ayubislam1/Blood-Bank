import React from "react";

const NewFeature = () => {
	return (
		<div className="container mx-auto mb-5 px-5 lg:px-0 space-y-5">
			
			<div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10">
				<h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center md:text-left">
					Discover the Life-Changing Benefits of Donating Blood for Everyone
					Involved
				</h1>
				<p className="text-sm sm:text-base md:text-base text-center md:text-left md:ml-10">
					Donating blood is a powerful way to make a difference in someone's
					life. Not only does it provide critical support to patients in need,
					but it also offers donors a sense of fulfillment and community
					connection. Join us in this noble cause and experience the joy of
					giving back.
				</p>
			</div>

			<div className="w-full">
				<img
					src="https://i.ibb.co/5XLvmPFT/testalize-me-0j-E8yn-V4mis-unsplash.jpg"
					alt="Blood Donation"
					className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-lg"
				/>
			</div>
		</div>
	);
};

export default NewFeature;
