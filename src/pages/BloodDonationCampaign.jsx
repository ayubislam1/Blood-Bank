import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarCheck, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BloodDonationCampaign = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
     
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Key Features
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover how you can easily donate and save lives with these essential features.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaMapMarkerAlt className="text-red-600 text-5xl mb-4" />,
              title: "Find Nearby Donation Centers",
              description:
                "Locate the closest blood donation centers in your area with real-time updates.",
            },
            {
              icon: <FaCalendarCheck className="text-red-600 text-5xl mb-4" />,
              title: "Schedule a Donation",
              description:
                "Book an appointment at a convenient time to donate blood hassle-free.",
            },
            {
              icon: <FaInfoCircle className="text-red-600 text-5xl mb-4" />,
              title: "Learn About the Donation Process",
              description:
                "Get detailed information on how blood donation works and what to expect.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white shadow-lg rounded-lg p-6 text-center border"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mt-2">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
            How to Participate
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://www.clarksvilleonline.com/wp-content/uploads/2018/07/RedCross_Donor4.jpg",
                title: "Register",
                description: "Sign up using our simple online registration form.",
              },
              {
                image: "https://www.redcross.org/content/dam/redcross/local/news-articles/north-texas/Wichita_Falls_Blood_Drive_Group_Photo.jpg",
                title: "Donate",
                description:
                  "Visit the nearest donation drive and give blood in a safe environment.",
              },
              {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgDO-7X4D5NngZRph1YNI68ogNR7KUEAf-ag&s",
                title: "Spread the Word",
                description:
                  "Encourage your friends and family to become donors too.",
              },
              {
                image: "https://www.redcross.org/content/dam/redcross/about-us/news/2021/iowa_04.jpg.transform/1288/q70/feature/image.jpeg",
                title: "Volunteer",
                description:
                  "Join our team to organize donation drives and awareness campaigns.",
              },
              {
                image: "https://i.ibb.co.com/2YP9nWrJ/nguy-n-hi-p-2r-NHli-X6-XHk-unsplash.jpg",
                title: "Host a Blood Drive",
                description:
                  "Organize a local blood drive in your community or workplace to support the cause.",
              },
              {
                image: "https://www.amchamvietnam.com/events/amcham-world-blood-donor-days-2019/37245641_873802789483611_1205637207348477952_o/",
                title: "Become an Advocate",
                description:
                  "Use social media and community events to educate people about the importance of blood donation.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg overflow-hidden transition-shadow duration-300 border"
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                  <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodDonationCampaign;
