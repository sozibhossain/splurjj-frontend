import Image from "next/image";
import React from "react";

const SecondBlog = () => {
  return (
    <div className="bg-secondary-50">
      <div className="container py-[30px] md:py-[50px] lg:py-[72px]">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-[30px] md:gap-[50px] lg:gap-[72px]">
          <div className="md:col-span-2 flex flex-col gap-[25px] md:gap-[32px] lg:gap-[40px]">
            <div>
              <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold leading-[120%] text-[#131313] font-manrope tracking-[0%]">Article of Headline Title Shown Here in Big Bold Font</h2>
              <p className="text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#424242] py-4 md:py-5 lg:py-6">What Are Your Throught?</p>
              <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] text-[#424242]">Credits - 24/08/2025</p>
              <div className="mt-3 md:mt-4">
                <button className="w-full bg-primary py-[12px] px-[24px] rounded-[4px] text-xl font-bold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                 Leave A comment
                </button>
              </div>
            </div>
            <div>
              <Image
                src="/assets/videos/blogSide3.jpg"
                alt="blogSide1"
                width={351}
                height={505}
                className="w-full h-[505px] object-cover rounded-[8px]"
              />
            </div>
          </div>
          <div className="md:col-span-5">
            <p className="text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#424242]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut
            </p>
            <div className="py-[25px] md:py-[32px] lg:py-[40px]">
              <Image
                src="/assets/videos/blog2.jpg"
                alt="blog2"
                width={873}
                height={443}
                className="w-full h-[443px] object-cover rounded-[8px]"
              />
            </div>
            <p className="text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#424242] pb-5 md:pb-7 lg:pb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </p>
            <div className="w-full flex items-center justify-center">

            <span className="w-2/3 h-[2px] bg-secondary"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondBlog;
