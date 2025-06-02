import { musicData } from "@/components/data/MusicData";
import MainBlogCart from "@/components/shared/MainBlogCart";
import React from "react";

const MusicBlog = () => {
  return (
    <div>
      <div>
        {musicData?.map((blog) => {
          return <MainBlogCart key={blog.id} blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default MusicBlog;
