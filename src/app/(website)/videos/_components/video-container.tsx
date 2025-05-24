import Image from "next/image";
import React from "react";
import { RiShareForwardLine } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import { MessageSquareMore } from "lucide-react";

const VideosContainer = () => {
  return (
    <div>
      <div className="container pt-[30px] md:pt-[45px] lg:pt-[63px]">
        {/* first sestion  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px] md:gap-[70px] lg:gap-[132px]">
          <div className="md:col-span-3 pb-[20px] md:pb-[25px] lg:pb-[30px]">
            <div className="pb-3 md:pb-4 flex items-center gap-2">
              <span className="bg-primary py-[5px] px-[10px] text-base md:text-[17px] lg:text-lg text-white leading-[100%] tracking-[0%] font-medium ">
                READ VIDEO
              </span>
              <span>
                <RiShareForwardLine className="w-7 h-7" />
              </span>
              <span>
                <GoGoal className="w-7 h-7" />
              </span>
              <span>
                <MessageSquareMore className="w-7 h-7" />
              </span>
              <span className="text-base font-light leading-[100%] tracking-[0%] text-black">
                290
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold leading-[100%] tracking-[0%] text-black">
              Article or Heading Title Shown Here in Big Bold Font
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-black/60 tracking-[0%] leading-[100%] py-3 md:py-4">
              Enter subheading in a short paragraph.
            </p>
            <p className="text-base md:text-[17px] lg:text-lg font-bold text-black tracking-[0%] leading-[100%] pb-3 md:pb-4">
              CREDITS - DD MONTH YYYY
            </p>
            <div>
              <Image
                src="/assets/videos/video-container1.jpg"
                alt="video-container1"
                width={770}
                height={524}
                className="w-full h-[524px] object-cover"
              />
            </div>
            <p className="text-xs font-light italic leading-[100%] tracking-[0%] text-black/60 pt-[5px]">
              image Credit
            </p>
          </div>
          <div className="md:col-span-1 flex flex-col gap-[24px] md:gap-[30px]">
            <div>
              <Image
                src="/assets/videos/video-sidebar1.jpg"
                alt="video-sidebar1"
                width={268}
                height={599}
                className="w-full h-[599px] object-cover"
              />
            </div>
            <div>
              <Image
                src="/assets/videos/video-sidebar2.jpg"
                alt="video-sidebar2"
                width={268}
                height={245}
                className="w-full h-[245px] object-cover"
              />
            </div>
          </div>
        </div>
        {/* second sestion  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px] md:gap-[70px] lg:gap-[132px] pt-7 md:pt-0">
          <div className="md:col-span-3 w-full flex flex-col md:flex-row item-center  gap-[20px] md:gap-[24px] lg:gap-[27px]">
            <div className="w-full md:w-1/2">
              <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold leading-[100%] tracking-[0%] text-black">
                Article of <br /> Headline Title in <br /> Small Bold Font
              </h3>
              <p className="text-base md:text-[17px] lg:text-lg font-bold text-black tracking-[0%] leading-[100%] py-3 md:py-4">
                CREDITS - DD MONTH YYYY
              </p>
              <p className="text-lg md:text-[19px] lg:text-xl font-light leading-[100%] tracking-[0%] text-black/60">
                WHAT ARE YOUR THOUGHTS?
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-lg md:text-[19px] lg:text-xl font-light text-black/60 tracking-[0%] leading-[100%] pb-[14px] md:pb-[18px] lg:pb-[22px]">
                Featured article text begins here and continues to several text
                boxes between images.
              </p>
              <div>
                <button className="bg-[#E0E0E0] w-full h-[84px] text-xl font-light leading-[100%] tracking-[0%] text-black">
                  Body text
                </button>
              </div>
            </div>
          </div>
          <div className="md:col-span-1"></div>
        </div>

        {/* third sestion  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px] md:gap-[70px] lg:gap-[132px] pb-[150px] md:pb-[19px] lg:pb-[225px]">
          <div className="md:col-span-1">
            <div className="pb-[20px] md:pb-[25px] lg:pb-[30px] pt-4 md:pt-[22px]">
                <button className="text-lg text-white leading-[100%] tracking-[0%] bg-black py-[15px] px-[12px]">LEAVE A COMMENT</button>
            </div>
            <div>
              <Image
                src="/assets/videos/video-sidebar3.jpg"
                alt="video-sidebar3"
                width={270}
                height={395}
                className="w-full h-[395px] object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-3 pt-[20px] md:pt-[25px] lg:pt-[30px]">
            <div>
              <Image
                src="/assets/videos/video-container2.jpg"
                alt="video-container1"
                width={770}
                height={465}
                className="w-full h-[465px] object-cover"
              />
            </div>
            <p className="text-xs font-light italic leading-[100%] tracking-[0%] text-black/60 pt-[10px]">
              image Credit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosContainer;
