import React from "react";
import { Users, Heart, ClipboardCheck } from "lucide-react"; 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const VolunteerDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats } = useQuery({
    queryKey: ["volunteer-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/volunteer-stats");
      return res.data;
    },
  });

  return (
    <div className="p-6">
    
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-semibold text-center text-blue-700">
          Welcome to the Volunteer Dashboard
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Track your volunteer activities and contributions to the community.
        </p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center mb-4">
            <ClipboardCheck className="text-yellow-500 h-10 w-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Volunteer Hours</h3>
          <p className="text-3xl font-bold text-blue-700">{stats?.hours || 0}</p>
        </div>

     
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="text-purple-500 h-10 w-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Events Participated</h3>
          <p className="text-3xl font-bold text-blue-700">{stats?.events || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="text-red-500 h-10 w-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Donations Supported</h3>
          <p className="text-3xl font-bold text-blue-700">{stats?.donations || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
