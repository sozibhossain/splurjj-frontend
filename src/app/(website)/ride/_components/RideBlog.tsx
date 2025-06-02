import { rideBlogData } from "@/components/data/RideBlogData";
import MainBlogCart from "@/components/shared/MainBlogCart";
import React from "react";

const RideBlog = () => {
  return (
    <div>
      <div>
        {rideBlogData?.map((blog) => {
          return <MainBlogCart key={blog.id} blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default RideBlog;
