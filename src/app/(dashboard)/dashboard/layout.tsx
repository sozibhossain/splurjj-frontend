import React from 'react';
import "@/app/globals.css"
import DashboardHeader from './_components/dashboardHeader';
import Sideber from './_components/sideber';

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className='h-screen w-full bg-cover bg-no-repeat bg-center bg-[url("/assets/images/bgDashboard.jpg")]'>
            <DashboardHeader />
            <div className='flex p-6'>
                <div className='w-1/6'>
                    <Sideber />
                </div>
                <div className='w-5/6'>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;