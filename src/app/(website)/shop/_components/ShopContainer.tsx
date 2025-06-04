import { shopData } from '@/components/data/ShopData';
import ShopCart from '@/components/shared/ShopCart';
import React from 'react';

const ShopContainer = () => {
    return (
        <>
        <div className='container py-10 md:py-14 lg:py-[100px]'>
            <h2 className='text-2xl md:text-[28px] lg:text-[32px] text-[#131313] font-manrope font-semibold leading-[120%] tracking-[0%] uppercase pb-2'>LATEST IN SHOP</h2>
            <div className='w-[319px] !h-[2px] bg-[#424242]'/>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 pt-6'>
            {
                shopData?.map((shop)=>{
                    return <ShopCart key={shop.id} shop={shop} />
                })
            }

        </div>
        <div className='flex items-center justify-center mt-4'>
            <button className='bg-[#0253F7] rounded-[4px] py-[14px] px-[28px] text-lg font-bold font-manrope leading-[120%] tracking-[0%] uppercase text-white'>VIEW ALL</button>
        </div>
        </div>
        </>
    );
};

export default ShopContainer;