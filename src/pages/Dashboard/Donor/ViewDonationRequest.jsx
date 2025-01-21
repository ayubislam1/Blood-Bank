import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button } from "../../../components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";  // Lucide icons

const ViewDonationRequest = () => {
  const { id } = useParams(); 
  const [donationRequest, setDonationRequest] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/users-donation/${id}`).then((res) => {
      setDonationRequest(res.data[0]);
      setLoading(false);
    });
  }, [id, axiosSecure]);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"></div>
        <span className="ml-2 text-red-500 font-semibold">Loading...</span>
      </div>
    );
  }


  const statusColor = donationRequest.status === "done" ? "bg-green-500" : donationRequest.status === "inprogress" ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="p-6 mx-auto mt-10">
      <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Donation Request Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-red-500">
        <div className="mb-4">
          <strong className="text-red-600">Recipient Name: </strong>
          <span>{donationRequest.recipientName}</span>
        </div>
        <div className="mb-4">
          <strong className="text-red-600">Location: </strong>
          <span>{`${donationRequest.district}, ${donationRequest.upazila}`}</span>
        </div>
        <div className="mb-4 flex items-center">
          <Calendar className="mr-2 text-red-600" />
          <strong className="text-red-600">Donation Date: </strong>
          <span>{donationRequest.donationDate}</span>
        </div>
        <div className="mb-4 flex items-center">
          <Clock className="mr-2 text-red-600" />
          <strong className="text-red-600">Donation Time: </strong>
          <span>{donationRequest.donationTime}</span>
        </div>
        <div className="mb-4 flex items-center">
          <MapPin className="mr-2 text-red-600" />
          <strong className="text-red-600">Location: </strong>
          <span>{`${donationRequest.district}, ${donationRequest.upazila}`}</span>
        </div>
        <div className="mb-4">
          <strong className="text-red-600">Blood Group: </strong>
          <span>{donationRequest.bloodGroup}</span>
        </div>
        <div className="mb-4">
          <strong className="text-red-600">Status: </strong>
          <span className={`px-3 py-1 text-white rounded-full ${statusColor}`}>{donationRequest.status}</span>
        </div>
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white mt-4"
          onClick={() => window.history.back()}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ViewDonationRequest;
