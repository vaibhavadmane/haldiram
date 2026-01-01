import logo from './images/Main_Logo.png';
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid Layout:
            - 1 column on Mobile
            - 3 columns on Tablet (grid-cols-3)
            - 6 columns on PC (md:grid-cols-6)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-10 md:gap-4">
          
          {/* Company Info - Spans full width on mobile, 2 cols on PC */}
          <div className="sm:col-span-3 md:col-span-2 text-sm text-gray-700 leading-7">
            <div className="mb-4">
              <Image
                src={logo}
                alt="Haldiram Logo"
                className="object-contain"
                width={150} // Explicit width for stability
                height={50}
              />
            </div>
            <div className="space-y-1">
              <p>Haldiram Ethnic Foods Private Limited</p>
              <p>Haldiram Manufacturing Co. Private Limited</p>
              <p>Haldiram Products Private Limited</p>
              <p>Haldiram Marketing Private Limited</p>

              <p className="mt-6 text-gray-500 italic">
                B-1 / F-12, Mohan Co-Operative Industrial Estate, Main <br className="hidden lg:block" />
                Mathura Road, Badarpur, South Delhi, Delhi, 110044
              </p>
            </div>
          </div>

          {/* Menu */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 border-b md:border-none pb-2 md:pb-0">Menu</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-red-600 cursor-pointer">Savouries</li>
              <li className="hover:text-red-600 cursor-pointer">Mithai</li>
              <li className="hover:text-red-600 cursor-pointer">Bakery Cookies and Chocolates</li>
              <li className="hover:text-red-600 cursor-pointer">Ready To Eat And Frozen</li>
              <li className="hover:text-red-600 cursor-pointer">Trail Mixes and Dry Fruits</li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 border-b md:border-none pb-2 md:pb-0">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-red-600 cursor-pointer">Contact Us</li>
              <li className="hover:text-red-600 cursor-pointer">FAQs</li>
              <li className="hover:text-red-600 cursor-pointer">Find Your Nearest Store</li>
            </ul>
          </div>

          {/* Corporate */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 border-b md:border-none pb-2 md:pb-0">Corporate</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-red-600 cursor-pointer">About us </li>
              <li className="hover:text-red-600 cursor-pointer">Reward Points</li>
              <li className="hover:text-red-600 cursor-pointer">Dealership Form</li>
              <li className="hover:text-red-600 cursor-pointer">Corporate</li>
            </ul>
          </div>

          {/* Policies & Social */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 border-b md:border-none pb-2 md:pb-0">Policies</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-red-600 cursor-pointer">Shipping Policy</li>
              <li className="hover:text-red-600 cursor-pointer">Returns & Cancellation</li>
              <li className="hover:text-red-600 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-red-600 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-red-600 cursor-pointer">CSR Policy</li>
            </ul>

            {/* Social Icons */}
            <div className="mt-8">
              <p className="font-semibold text-gray-900 mb-3 text-sm">Follow @Haldirams</p>
              <div className="flex gap-4">
                {/* Placeholder for social icons */}
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 cursor-pointer transition-colors">
                   <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 cursor-pointer transition-colors">
                   <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 cursor-pointer transition-colors">
                   <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;