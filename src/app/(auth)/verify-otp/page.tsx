import React, { Suspense } from "react";
import OtpForm from "./_components/OtpForm";

const Otp = () => {
  return (
    <div
      className={`h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-[url("/assets/images/auth_bg.jpg")]`}
    >
      <div className="pb-[30px]">
        <h1 className="font-poppins text-[32px] font-semibold leading-[120%] text-[#212121] text-center tracking-[0%]">
          Verify OTP
        </h1>
        <p className="font-poppins text-base font-normal leading-[150%] text-[#212121] text-center pt-2 tracking-[0%]">
          We&apos;ll send a verification code to your email.{" "}
          <br className="block md:hidden" /> Check your{" "}
          <br className="hidden md:block" /> inbox and enter the code here.
        </p>
      </div>
      <div className="w-full px-[20px] md:w-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <OtpForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Otp;
