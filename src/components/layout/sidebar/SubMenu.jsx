import React, { forwardRef } from 'react';

const SubMenu = forwardRef(({ subItems, isOpenSideBar }, ref) => {
    return (
        <ul
            className="sub_item_list flex flex-col gap-[16px] bg-[rgba(65,_172,_90,_0.08)]
                 px-[12px] py-[8px] rounded-[6px] text-white "
            ref={ref}
        >
            {subItems && subItems.map((subItem, index) => (
                <div className=' flex items-center' key={index}>
                    <img src={subItem.icon} alt="ic" className='min-h-[20px]' />
                    {
                        isOpenSideBar &&
                        <div className='flex flex-1 justify-between ml-[8px]'>
                            <p>{subItem.title}</p>
                            <div className='flex'>
                                <p>({subItem?.count}+)</p>
                            </div>
                        </div>
                    }
                </div>
            ))}
        </ul>
    );
});

export default SubMenu;