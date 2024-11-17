import {
  Footer,
  FooterBrand,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function SimpleFooter() {
  return (
    <Footer container className="bottom-0 rounded-none dark:bg-gray-800">
      <div className="w-full text-center space-y-4">
        {/* Footer Top Section */}
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
          <FooterBrand
            href="https://flowbite.com"
            src="./logo.png"
            alt="Eco-Watt Logo"
            name="Eco-Watt"
          />
          <FooterLinkGroup className="flex  space-y-0 items-center  sm:flex-row sm:space-y-0 sm:space-x-3">
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Features</FooterLink>
          </FooterLinkGroup>
        </div>

        <FooterDivider />

        {/* Footer Bottom Section */}
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
          <Footer.Copyright href="#" by="Eco-Friendly™" year={2024} />
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <BsFacebook size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-500">
              <BsInstagram size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400">
              <BsTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <BsGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </Footer>
  );
}
