import React from "react";
import { Users, DollarSign, Heart } from "lucide-react"; 
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";


const AdminDashboard = () => {

    const axiosSecure = useAxiosSecure();
	const{user}=useAuth()
	const { data: stats } = useQuery({
		queryKey: ["stats"],
		queryFn: async () => {
			const res = await axiosSecure.get("/stats-item");
           
			return res.data;
           
		},
	});
    
  return (
    <div className="p-6">
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-semibold text-center text-red-700">
         Welcome to the {user.displayName}
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Manage the blood donation process and track key statistics.
        </p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="text-blue-500 h-10 w-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Total Donors</h3>
          <p className="text-3xl font-bold text-red-700">{stats?.users}</p>
        </div>

 
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="text-green-500 h-10 w-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Total Funds</h3>
          <p className="text-3xl font-bold text-red-700">{stats?.totalPrice}</p>
        </div>

     
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="text-red-500 h-10 w-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Total Donation Requests</h3>
          <p className="text-3xl font-bold text-red-700">{stats?.donors}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
