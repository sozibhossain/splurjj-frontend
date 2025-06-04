import React from "react";
import FirstBlog from "./FirstBlog";
import SecondBlog from "./SecondBlog";
import Advertising from "./Advertising";
import SixBlog from "./SixBlog";
import FifthBlog from "./FifthBlog";
import ThirdBlog from "./ThirdBlog";
import { LeaveAComment } from "./LeaveAComment";
import FourthBlog from "./FourthBlog";

const VideosContainer = () => {
  return (
    <div>
      <FirstBlog />
      <SecondBlog />
      <div className="py-[30px] md:py-[40px] lg:py-[48px]">
        <Advertising />
      </div>
      <LeaveAComment />
      <ThirdBlog />
      <div className="py-[30px] md:py-[40px] lg:py-[48px]">
        <Advertising />
      </div>
      <FourthBlog />
      <Advertising />
      <FifthBlog />
      <Advertising />
      <SixBlog />
    </div>
  );
};

export default VideosContainer;

