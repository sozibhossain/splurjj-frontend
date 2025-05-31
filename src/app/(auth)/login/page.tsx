import React from "react";
import { LogingForm } from "./_components/LoginForm";

const Login = () => {
  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-[url("/assets/images/auth_bg.jpg")]`}>
      <div className="pb-[30px]">
        <h1 className="text-[32px] font-semibold leading-[120%] text-[#212121] text-center tracking-[0%]">
          Hello,Welcome!
        </h1>
        <p className="text-base font-normal leading-[150%] text-[#212121] text-center pt-2 tracking-[0%]">
          Please Enter Your Details Below to Continue
        </p>
      </div>
      <div>
        <LogingForm />
      </div>
    </div>
  );
};

export default Login;
