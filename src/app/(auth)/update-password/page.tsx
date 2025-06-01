import React, { Suspense } from "react";
import UpdatePasswordForm from "./_components/UpdatePasswordForm";

const UpdatePassword = () => {
  return (
    <div
      className={`h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-[url("/assets/images/auth_bg.jpg")]`}
    >
      <div className="pb-[30px]">
        <h1 className="font-poppins text-[32px] font-semibold leading-[120%] text-[#212121] text-center tracking-[0%]">
          Update Password
        </h1>
        <p className="font-poppins text-base font-normal leading-[150%] text-[#212121] text-center pt-2 tracking-[0%]">
          Create your new password
        </p>
      </div>
      <div className="w-full md:w-auto px-[20px]">
        {/* suspense use  */}
        <Suspense fallback={<div>Loading...</div>}>
          <UpdatePasswordForm />
        </Suspense>
      </div>
    </div>
  );
};

export default UpdatePassword;
