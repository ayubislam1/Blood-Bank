import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
	return (
		<div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="relative flex flex-col items-center">
				{/* Blood drop loading animation */}
				<div className="relative w-24 h-24">
					<motion.div
						animate={{
							y: [0, -15, 0],
							scale: [1, 0.9, 1],
						}}
						transition={{
							duration: 1.2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="absolute inset-0 bg-red-600 rounded-full rounded-tr-none transform rotate-45"
					/>

					{/* Pulse effect */}
					<motion.div
						animate={{
							scale: [1, 1.5, 1],
							opacity: [0.2, 0, 0.2],
						}}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="absolute inset-0 bg-red-400 rounded-full rounded-tr-none transform rotate-45"
					/>

					{/* Inner shine */}
					<motion.div
						animate={{
							opacity: [0.5, 0.8, 0.5],
						}}
						transition={{
							duration: 1,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="absolute top-1/4 left-1/4 w-1/6 h-1/6 bg-white bg-opacity-80 rounded-full"
					/>
				</div>

				{/* Text */}
				<motion.p
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="mt-8 text-xl font-medium text-red-600"
				>
					Loading...
				</motion.p>

				{/* Progress bar */}
				<div className="w-48 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
					<motion.div
						animate={{ x: [-192, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="h-full bg-red-600"
					/>
				</div>
			</div>
		</div>
	);
};

export default Loading;
