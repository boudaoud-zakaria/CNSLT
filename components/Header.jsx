"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MenuButton from "./ui/MeunButton";
import logo from "@/public/logo.png";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { usePathname } from "next/navigation";
import { useStateContext } from "@/contexts/ContextProvider";
import placeholderImage from "@/public/placeholderImage.png"
 
import LoginButton from "./LoginButton";

const headerVariants = {
  closed: { height: "9rem" },
  open: { height: "100vh" },
};

const menuVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, when: "beforeChildren", staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 1.1,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 , transition: { duration: 0.6} },
  exit: { opacity: 0, y: 20 },
};

const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Installation", href: "/installation" },
  { name: "En images", href: "/galerie" },
  { name: "à propos Cnsl", href: "/about" },
];

const destinationItems = [
  // { name: "Tikjda", href: "/tikjda" },
  // { name: "Fouka", href: "/fouka" },
  // { name: "Seraidi", href: "/seraidi" },
  { name: "entreprise et association", href: "/entreprise-association" },
  { name: "événements Spéciales", href: "/evenement-speciale" },
];

const socialLinks = [
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaTwitter, href: "#", label: "Twitter" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
];

export default function Header() {
  const {openHeaderWithDestination,setopenHeaderWithDestination,openHeader, setopenHeader } = useStateContext();
  const pathname = usePathname();
  const inDashboard = pathname.startsWith('/dashboard');
  const inlogin =  pathname.startsWith('/login');
  const insignup =  pathname.startsWith('/signup');
  const inForgotPassword = pathname.startsWith('/forgot-password'); 
   const resetPassword = pathname.startsWith('/reset-password')
  useEffect(() => {
    setopenHeader(false);
  }, [pathname]);

  const toggleMenu = () => {setopenHeader(!openHeader)
    setopenHeaderWithDestination(false)
  };
if  (inDashboard || inlogin || insignup || inForgotPassword || resetPassword) {
  return null
}
else{

  return (
    <motion.div
      className=" backdrop-blur-sm bg-primary2 bg-opacity-90 w-full absolute font-body flex items-center transition-all duration-300 h-auto sm:max-h-dvh shadow-xl border-b-4 border-primary2"
      variants={headerVariants}
      initial="closed"
      animate={openHeader ? "open" : "closed"}
      style={{ zIndex: 1000 }}
    >
      <div className="w-full h-full flex justify-between items-center px-24 sm:px-2 ">
        <div className="w-1/3 flex justify-start items-center">
          {!openHeader && <MenuButton isOpen={openHeader} toggleMenu={toggleMenu} />}
        </div>

        <div className="w-1/3 flex flex-col justify-center items-center">
          {!openHeader && (
            <Link href="/" className="w-full flex justify-center items-center h-full">
              <Image src={logo} alt="logo" sizes={openHeader ? "200px" : "600px"} />
            </Link>
          )}
          {openHeader && (
            <motion.div
              className="absolute flex flex-col h-screen  justify-between p-4 bg-cover w-full sm:w-full "
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Link href="/" className="w-full flex justify-center items-center   my-2 sm:my-12">
                <Image src={logo} alt="logo" sizes={openHeader ? "200px" : "600px"} />
              </Link>
              {openHeaderWithDestination
                        ? 
                        <DealsList/>
:
                <div className=" flex items-center justify-center w-2/5  sm:w-full  mx-auto p-4 border-gray-500 border-2  rounded-lg   ">
                  <div className="flex flex-col items-center w-full  ">
                    <div className="flex justify-between w-full  text-lg sm:w-full space-x-2">
                          <NavList items={navItems} />
                          <NavList items={destinationItems} />
                    </div>
                    <SocialLinks links={socialLinks} />
                    <div className="mt-4 text-white">
                      <p>Cnsl dz</p>
                    </div>
                  </div>
                </div>
}
              <div className="flex items-center justify-center mb-12">
                <MenuButton isOpen={openHeader} toggleMenu={toggleMenu} />
              </div>
            </motion.div>
          )}
        </div>
        <div className="w-1/3 flex justify-end">
          {!openHeader && <LoginButton />}
        </div>
      </div>
    </motion.div>
  );
}
}

const NavItem = ({ href, name }) => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full "
  >
    <Link href={href} className="block w-full">
      <motion.div
        className="flex items-center px-6 py-2 text-white text-lg font-medium rounded-lg transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-10"
        whileHover={{ x: 5 }}
      >
        {name}
      </motion.div>
    </Link>
  </motion.li>
);

const NavList = ({ items }) => (
  <ul className="w-full  space-y-2">
    {items.map((item) => (
      <NavItem key={item.href} href={item.href} name={item.name} />
    ))}
  </ul>
);

const SocialLinks = ({ links }) => (
  <div className="mt-8 flex space-x-4">
    {links.map(({ Icon, href, label }) => (
      <a key={label} href={href} aria-label={label} className="text-white hover:text-gray-400 bg-white p-1 rounded-full ">
        <Icon className="text-black" />
      </a>
    ))}
  </div>
);






const deals = [
  {
   
    title: "Tikjda",
    description: "Embrace the joys of summer with our exclusive Summer Escape package.",
    image: placeholderImage,
  },
  {
    title: "SERAIDI",
    description: "Embrace the joys of summer with our exclusive Summer Escape package.",
    image: placeholderImage,
  },
  {
    title: "Fouka",
    description: "Embrace the joys of summer with our exclusive Summer Escape package.",
    image: placeholderImage,
  },
];
 

const DealsList = React.memo(() => (
  <div className=" flex flex-col justify-center items-center ">
    {deals.map((deal, index) => (
      <Link href={`/${deal.title.toLowerCase()}`} key={index} passHref>
        <motion.div
          className="w-11/12 flex justify-between items-center bg-opacity-60 p-2 sm:p-2 rounded-lg sm:w-full h-full"
          variants={itemVariants}
        >
          <div className=" border border-primary1 sm:flex-col bg-gray-500 bg-opacity-40 flex mx-4 px-2 w-full py-2 items-center h-full justify-between rounded-sm">
            {/* <button className="text-lg w-1/2 sm:w-full ml-4 bg-primary1 text-white py-0 mx-2 h-1/3 rounded-lg hover:bg-yellow-600 transition-colors duration-300">
              Find deals now
            </button> */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-white text-lg font-semibold">CNSL {deal.title.toUpperCase()}</h3>
              <p className="text-white">{deal.description}</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={deal.image}
              alt={deal.title}
              className="rounded-lg w-36 sm:w-20 sm:h-28 "
              // width={120}
              // height={120}
            />
          </div>
        </motion.div>
      </Link>
    ))}
  </div>
));