import React, { useState } from "react";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const users = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const [user, setUser] = useState(users[0]);
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const response = await axiosSecure.patch(`/all-users/${user._id}`, user);

    if (response.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setIsEditable(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <main className="p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Profile
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center mb-8">
            <img
              src={user.photoUrl}
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4 border-primary mr-6"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary disabled:bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                type="text"
                name="district"
                value={user.district}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary disabled:bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upazila
              </label>
              <input
                type="text"
                name="upazila"
                value={user.upazila}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary disabled:bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <input
                type="text"
                name="bloodGroup"
                value={user.bloodGroup}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary disabled:bg-gray-200"
              />
            </div>
          </form>

          <div className="mt-8 flex justify-end">
            {isEditable ? (
              <button
                onClick={handleSave}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditable(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
