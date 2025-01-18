import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BloodDonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState();
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axiosPublic.get(`/users-donation/${id}`);
        setRequest(response.data[0]);
      } catch (error) {
        Swal.fire("Error", "Could not fetch request details.", "error");
        navigate("/donation-requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequestDetails();
  }, [id, navigate]);

  const handleDonate = () => {
    Swal.fire({
      title: "Confirm Donation",
      html: `
        <p>Donor Name: <strong>${user.displayName}</strong></p>
        <p>Donor Email: <strong>${user.email}</strong></p>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ff4d4d", // Blood red button color
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/users-donation/${id}`);
          Swal.fire("Success", "Donation confirmed.", "success");
          navigate("/donation-requests");
        } catch (error) {
          Swal.fire("Error", "Could not confirm donation.", "error");
        }
      }
    });
  };

  if (loading) {
    return <p>Loading request details...</p>;
  }

  if (!request) {
    return <p>Request not found.</p>;
  }

  return (
    <div className="p-6 bg-red-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-700">Blood Donation Request Details</h1>

      <div className="p-4 border border-red-200 rounded-lg shadow-md bg-white">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="font-medium text-red-600">Recipient Name:</span>
            <span>{request.recipientName}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="font-medium text-red-600">Location:</span>
            <span>{request.district}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="font-medium text-red-600">Blood Group:</span>
            <span className="font-semibold text-red-600">{request.bloodGroup}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="font-medium text-red-600">Donation Date:</span>
            <span>{request.donationDate}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="font-medium text-red-600">Donation Time:</span>
            <span>{request.donationTime}</span>
          </div>
        </div>

        <button
          onClick={handleDonate}
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Confirm Donation
        </button>
      </div>
    </div>
  );
};

export default BloodDonationRequestDetails;
