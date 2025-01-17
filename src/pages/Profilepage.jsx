// Import required libraries and components
import React, { useState } from "react";
import { useLoaderData } from "react-router";

const ProfilePage = () => {
 
  const users = useLoaderData();

 console.log(users)
  const [user, setUser] = useState(users[0]);
  console.log(user)
  const [isEditable, setIsEditable] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressKey = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, [addressKey]: value },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  
  const handleSave = () => {
    
    console.log("Updated user data:", user);
    setIsEditable(false);
  };

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="">
    

      <main className=" p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        
          <div className="flex items-center mb-6">
            <img
              src={user.photoUrl}
              alt="User Avatar"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-medium text-gray-700">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-primary focus:border-primary disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <input
                type="text"
                name="address.district"
                value={user.district || ""}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-primary focus:border-primary disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upazila</label>
              <input
                type="text"
                name="address.upazila"
                value={user.upazila || ""}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-primary focus:border-primary disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                value={user.bloodGroup}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-primary focus:border-primary disabled:bg-gray-100"
              />
            </div>
          </form>

          {/* Edit and Save Buttons */}
          <div className="mt-6 flex justify-end">
            {isEditable ? (
              <button
                onClick={handleSave}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditable(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
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
