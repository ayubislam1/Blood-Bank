import React from "react";
import { Button } from "@/components/ui/button";

const Join = () => {
	return (
		<div className="bg-red-600 py-10 px-5 sm:px-10 md:py-16 lg:py-20 my-10">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-white text-center md:text-left">
				
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-md">
					Join the Lifesaving Movement Today
				</h1>

				
				<div className="mt-5 md:mt-0 md:max-w-lg">
					<p className="text-sm sm:text-base">
						Your donation can make a difference in someone's life. Sign up now
						to become a donor or to receive more information on how you can
						help.
					</p>

					<div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-5 font-bold">
						<Button className="bg-white text-red-500 hover:bg-white">
							Sign In
						</Button>
						<Button className="bg-transparent text-white hover:text-red-500 hover:bg-white border border-white">
							Learn More
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Join;
