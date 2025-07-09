import Logo from "../../asset/isolated-layout.svg";
import logo from "../../asset/default-monochrome-white.svg"

const Footer = () => {
  return (
    <footer className="w-full bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 sm:gap-4 mb-6">
        <img src={logo} alt="icon logo" className="h-8 sm:h-10 object-contain" />
        
      </div>

        <p className="max-w-xl text-sm sm:text-base  leading-relaxed">
          Your emails, your command. One inbox, total control.
        </p>
      </div>

      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center text-xs sm:text-sm">
          Made with ❤️ by <strong>Ritik Saini</strong> | <strong>OmniMail</strong> ©2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
