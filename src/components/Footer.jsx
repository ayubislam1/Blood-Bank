import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white py-8 sm:py-12 border-t border-red-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
         
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/privacy-policy" className="text-sm hover:underline transition-all duration-300 ease-in-out hover:text-red-300">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-sm hover:underline transition-all duration-300 ease-in-out hover:text-red-300">
                Terms of Service
              </Link>
              <Link to="/contact-us" className="text-sm hover:underline transition-all duration-300 ease-in-out hover:text-red-300">
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Follow Us</h4>
            <nav className="flex flex-col gap-2">
              <Link to="#" className="text-sm hover:underline transition-all duration-300 ease-in-out hover:text-red-300">
                Facebook
              </Link>
              <Link to="#" className="text-sm hover:underline transition-all duration-300 ease-in-out hover:text-red-300">
                Twitter
              </Link>
              <Link to="#" className="text-sm hover:underline transition-all duration-300 ease-in-out hover:text-red-300">
                Instagram
              </Link>
            </nav>
          </div>

      
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <h4 className="text-xl font-semibold">About Us</h4>
            <p className="text-sm text-gray-300">
              We are a Blood Bank committed to saving lives by connecting blood donors with those in need. Join us in making a difference today.
            </p>
          </div>
   
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <h4 className="text-xl font-semibold">Contact Us</h4>
            <p className="text-sm text-gray-300">
              123 Main Street, Anytown, Bangladesh
              <br />
              support@bloodbank.com
            </p>
          </div>
        </div>


        <div className="mt-8 text-center">
          <h4 className="text-lg font-semibold text-white mb-4">Make a Life-Saving Donation</h4>
          <p className="text-sm text-gray-300 mb-4">
            Your donation can save lives. Become a blood donor today and make a difference.
          </p>
          <Link
            to="/donate"
            className="px-6 py-2 text-white bg-red-600 rounded-md text-sm font-semibold transition-all duration-300 ease-in-out hover:bg-red-500"
          >
            Donate Now
          </Link>
        </div>

     
        <div className="mt-8 text-center text-sm text-gray-300">
          &copy; 2024 Blood Donation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
