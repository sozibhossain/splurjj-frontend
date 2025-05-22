import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { BsTiktok } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import NewsLetterForm from "./NewsLetterForm";

const Footer = () => {
  const categoryData = [
    {
      id: 1,
      category: "Latest",
    },
    {
      id: 2,
      category: "Art & Culture",
    },
    {
      id: 3,
      category: "Gear",
    },
    {
      id: 4,
      category: "Music",
    },
    {
      id: 5,
      category: "Quiet Calm",
    },
    {
      id: 6,
      category: "Ride",
    },
    {
      id: 7,
      category: "Videos",
    },
  ];
  const shopData = [
    {
      id: 1,
      shop: "Latest",
    },
    {
      id: 2,
      shop: "Men",
    },
    {
      id: 3,
      shop: "Women",
    },
    {
      id: 4,
      shop: "Lifestyle",
    },
    {
      id: 5,
      shop: "Tech",
    },
    {
      id: 6,
      shop: "Sale",
    },
  ];
  const otherData = [
    {
      id: 1,
      other: "Brand Directory",
    },
    {
      id: 2,
      other: "Brand Recognition",
    },
  ];

  const aboutData = [
    {
      id: 1,
      about: "Splurjj Nation",
    },
    {
      id: 2,
      about: "Newsroom",
    },
    {
      id: 3,
      about: "Leadership",
    },
    {
      id: 4,
      about: "Career Opportunities",
    },
    {
      id: 5,
      about: "Investor Relations",
    },
    {
      id: 6,
      about: "Advertising",
    },
    {
      id: 7,
      about: "Legal",
    },
    {
      id: 8,
      about: "Contact Us",
    },
  ];

  return (
    <div className="bg-black py-8 md:py-12 lg:py-16">
      <div className="container">
        {/* small and large devices  */}
        <div className="block md:hidden lg:block">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
            <div className="lg:col-span-2">
              <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-normal pb-4 md:pb-5 lg:pb-6">
                CATEGORIES
              </h4>
              <ul>
                {categoryData?.map((item, index) => (
                  <li
                    key={index}
                    className="text-base md:text-[17px] lg:text-lg font-light text-white cursor-pointer hover:underline leading-normal py-2"
                  >
                    {item?.category}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-normal pb-4 md:pb-5 lg:pb-6">
                SHOP
              </h4>
              <ul>
                {shopData?.map((item, index) => (
                  <li
                    key={index}
                    className="text-base md:text-[17px] lg:text-lg font-light text-white cursor-pointer hover:underline leading-normal py-2"
                  >
                    {item?.shop}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-normal pb-4 md:pb-5 lg:pb-6">
                OTHER
              </h4>
              <ul>
                {otherData?.map((item, index) => (
                  <li
                    key={index}
                    className="text-base md:text-[17px] lg:text-lg font-light text-white cursor-pointer hover:underline leading-normal py-2"
                  >
                    {item?.other}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-normal pb-4 md:pb-5 lg:pb-6">
                ABOUT US
              </h4>
              <ul>
                {aboutData?.map((item, index) => (
                  <li
                    key={index}
                    className="text-base md:text-[17px] lg:text-lg font-light text-white cursor-pointer hover:underline leading-normal py-2"
                  >
                    {item?.about}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-white cursor-pointer leading-normal pb-4 md:pb-5 lg:pb-6">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
                <span>
                  <IoLogoInstagram className="text-white w-8 h-8 cursor-pointer" />
                </span>
                <span>
                  <FaXTwitter className="text-white w-8 h-8 cursor-pointer" />
                </span>
                <span>
                  <BsTiktok className="text-white w-8 h-8 cursor-pointer" />
                </span>
                <span>
                  <FaFacebookF className="text-white w-8 h-8 cursor-pointer" />
                </span>
                <span>
                  <FaYoutube className="text-white w-8 h-8 cursor-pointer" />
                </span>
              </div>
              <p className="text-base md:text-[17px] lg:text-lg font-light text-white leading-normal pt-4 md:pt-5 lg:pt-6">
                Don&apos;t miss out on the latest news by signing up for our
                newsletters.
              </p>

              <div className="pb-2 pt-3">
                <NewsLetterForm />
              </div>

              <p className="text-sm md:text-[15px] lg:text-base font-light text-white leading-normal pb-2 md:pb-3 lg:pb-4">
                By subscribing, you agree to our{" "}
                <span className="underline">Terms of Use</span> and{" "}
                <span className="underline">Privacy Policy.</span>
              </p>
              <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-white leading-normal">
                Download our App
              </h5>
            </div>
          </div>
        </div>

        {/* only medium device  */}
        <div className="hidden md:block lg:hidden">
          <div className=" grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-normal pb-2">
                  CATEGORIES
                </h4>
                <ul>
                  {categoryData?.map((item, index) => (
                    <li
                      key={index}
                      className="text-base md:text-[17px] lg:text-lg font-light text-white cursor-pointer hover:underline leading-normal py-2"
                    >
                      {item?.category}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-normal pb-2">
                  SHOP
                </h4>
                <ul>
                  {shopData?.map((item, index) => (
                    <li
                      key={index}
                      className="text-base md:text-[17px] lg:text-lg font-light text-white cursor-pointer hover:underline leading-normal py-2"
                    >
                      {item?.shop}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-normal pb-2">
                  OTHER
                </h4>
                <ul>
                  {otherData?.map((item, index) => (
                    <li
                      key={index}
                      className="text-base md:text-[17px] lg:text-lg font-light text-white cursor-pointer hover:underline leading-normal py-2"
                    >
                      {item?.other}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-4">
              <div className="">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-normal pb-2">
                  ABOUT US
                </h4>
                <ul>
                  {aboutData?.map((item, index) => (
                    <li
                      key={index}
                      className="text-base md:text-[17px] lg:text-lg font-light text-white cursor-pointer hover:underline leading-normal py-2"
                    >
                      {item?.about}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-white cursor-pointer leading-normal pb-2">
                  FOLLOW US
                </h4>
                <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
                  <span>
                    <IoLogoInstagram className="text-white w-8 h-8 cursor-pointer" />
                  </span>
                  <span>
                    <FaXTwitter className="text-white w-8 h-8 cursor-pointer" />
                  </span>
                  <span>
                    <BsTiktok className="text-white w-8 h-8 cursor-pointer" />
                  </span>
                  <span>
                    <FaFacebookF className="text-white w-8 h-8 cursor-pointer" />
                  </span>
                  <span>
                    <FaYoutube className="text-white w-8 h-8 cursor-pointer" />
                  </span>
                </div>
                <p className="text-base md:text-[17px] lg:text-lg font-light text-white leading-normal pt-4 md:pt-5 lg:pt-6">
                  Don&apos;t miss out on the latest news by signing up for our
                  newsletters.
                </p>

                <div className="pb-2 pt-3">
                  <NewsLetterForm />
                </div>

                <p className="text-sm md:text-[15px] lg:text-base font-light text-white leading-normal pb-2 md:pb-3 lg:pb-4">
                  By subscribing, you agree to our{" "}
                  <span className="underline">Terms of Use</span> and{" "}
                  <span className="underline">Privacy Policy.</span>
                </p>
                <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-white leading-normal">
                  Download our App
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
