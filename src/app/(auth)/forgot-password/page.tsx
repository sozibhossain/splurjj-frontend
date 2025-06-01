import React from "react";
import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-[url("/assets/images/auth_bg.jpg")]`}>
      <div className="pb-[30px]">
        <h1 className="font-poppins text-[32px] font-semibold leading-[120%] text-[#212121] text-center tracking-[0%]">
          Forgot Password
        </h1>
        <p className="font-poppins text-base font-normal leading-[150%] text-[#212121] text-center pt-2 tracking-[0%]">
          Enter the email address associated with your account. <br className="hidden md:block"/> We&#39;ll send you an OTP to your email. 
        </p>
      </div>
      <div className="w-full md:w-auto px-[20px]">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
