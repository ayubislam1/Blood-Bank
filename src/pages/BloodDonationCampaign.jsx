import { motion } from "framer-motion";
import { FaHeartbeat, FaMapMarkerAlt, FaHandsHelping } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BloodDonationCampaign = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
   
      <section className="py-16 bg-gradient-to-b from-white to-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-red-600 mb-10">
            Our Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaHeartbeat className="text-red-600 text-4xl mx-auto mb-4" />,
                title: "10,000 Donors",
                description:
                  "Help us reach our goal of 10,000 blood donations to support critical care patients.",
              },
              {
                icon: <FaHandsHelping className="text-red-600 text-4xl mx-auto mb-4" />,
                title: "Save 30,000 Lives",
                description:
                  "Every donation can save up to three lives. Together, we can make a huge impact.",
              },
              {
                icon: <FaMapMarkerAlt className="text-red-600 text-4xl mx-auto mb-4" />,
                title: "Expand Awareness",
                description:
                  "Spread the importance of blood donation and create a culture of giving.",
              },
            ].map((goal, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Card>
                  <CardHeader>
                    <div className="text-center">{goal.icon}</div>
                    <CardTitle className="text-center text-2xl text-gray-800">
                      {goal.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{goal.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-red-600 mb-10">
            How to Participate
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                image: "https://www.clarksvilleonline.com/wp-content/uploads/2018/07/RedCross_Donor4.jpg",
                title: "Register",
                description: "Sign up using our simple online registration form.",
              },
              {
                image:
                  "https://www.redcross.org/content/dam/redcross/local/news-articles/north-texas/Wichita_Falls_Blood_Drive_Group_Photo.jpg",
                title: "Donate",
                description:
                  "Visit the nearest donation drive and give blood in a safe environment.",
              },
              {
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgDO-7X4D5NngZRph1YNI68ogNR7KUEAf-ag&s",
                title: "Spread the Word",
                description:
                  "Encourage your friends and family to become donors too.",
              },
              {
                image:
                  "https://www.redcross.org/content/dam/redcross/about-us/news/2021/iowa_04.jpg.transform/1288/q70/feature/image.jpeg",
                title: "Volunteer",
                description:
                  "Join our team to organize donation drives and awareness campaigns.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-64 object-fit"
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
