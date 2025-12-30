import logo from './images/Main_Logo.png'
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 ">
          
          {/* Company Info */}
          <div className="md:col-span-2 w-fit text-sm text-gray-700 leading-7">
            <div>
                <Image
             src={logo}
             alt=""
             className="object-cover"
             />
            </div>
            <div className="md:col-span-2 text-sm text-gray-700 leading-7">
            <p>Haldiram Ethnic Foods Private Limited</p>
            <p>Haldiram Manufacturing Co. Private Limited</p>
            <p>Haldiram Products Private Limited</p>
            <p>Haldiram Marketing Private Limited</p>

            <p className="mt-6">
              B-1 / F-12, Mohan Co-Operative Industrial Estate, Main <br />
              Mathura Road, Badarpur, South Delhi, Delhi, 110044
            </p>
          </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Menu</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Savouries</li>
              <li>Mithai</li>
              <li>Bakery Cookies and Chocolates</li>
              <li>Ready To Eat And Frozen</li>
              <li>Trail Mixes and Dry Fruits</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Find Your Nearest Store</li>
            </ul>
          </div>

          {/* Corporate & Policies */}
          
            {/* Corporate */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Corporate</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>About us </li>
                <li>Reward Points</li>
                <li>Dealership Form</li>
                <li>Corporate</li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Policies</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Shipping Policy</li>
                <li>Returns & Cancellation</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>CSR Policy</li>
              </ul>

              {/* Social */}
              <div className="mt-6">
                <p className="font-semibold text-gray-900 mb-3">
                  Follow @Haldirams
                </p>
                <div className="flex gap-3 text-gray-600">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      
    </footer>
  );
};

export default Footer;
