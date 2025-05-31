import Image from "next/image";
import React from "react";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegCommentDots } from "react-icons/fa";

const FirstBlog = () => {
  return (
    <div>
      <div className="container py-[30px] md:py-[50px] lg:py-[72px]">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-[30px] md:gap-[50px] lg:gap-[72px]">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-[1.5px]">
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  Read
                </button>
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  Video
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <RiShareForwardLine className="w-6 h-6 text-black" />
                </span>
                <span>
                  <TbTargetArrow className="w-6 h-6 text-black" />
                </span>
                <span>
                  <FaRegCommentDots className="w-6 h-6 text-black" />
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-[45px] lg:text-[60px] font-manrope font-bold leading-[120%] tracking-[0%] text-[#131313]">
              Headline Title Shown <br /> Here in Big Bold Font
            </h1>
            <p className="text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#424242] my-4 md:my-5 lg:my-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut{" "}
            </p>
            <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242]">
              Credits - 24/08/2025
            </p>
            <div className="mt-[30px] md:mt-[50px] lg:mt-[72px]">
              <Image
                src="/assets/videos/blog1.jpg"
                alt="blog1"
                width={888}
                height={552}
                className="w-full h-[529px] object-cover rounded-[8px]"
              />
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-[30px] md:gap-[50px] lg:gap-[72px]">
            <div>
              <Image
                src="/assets/videos/blogSide1.jpg"
                alt="blogSide1"
                width={336}
                height={529}
                className="w-full h-[500px] object-cover rounded-[8px]"
              />
            </div>
            <div>
              <Image
                src="/assets/videos/blogSide2.jpg"
                alt="blogSide1"
                width={336}
                height={353}
                className="w-full h-[353px] object-cover rounded-[8px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstBlog;
