import React from 'react'
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-[#e3e4e4] to-[#eaf3eb]">
            <div className="w-[90%] border-2 rounded-2xl bg-[#F9FFFb] border-[#1ebbcc] p-6 md:p-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="flex flex-col items-center text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl py-6 md:py-16 font-bold italic">
                            Note <span className="font-extrabold">App</span>
                        </h1>
                        <h6 className="italic px-2 md:px-6 text-base md:text-lg leading-relaxed">
                            Stay organized and never lose an idea again with our Note App. Whether
                            you’re jotting down quick thoughts, creating to-do lists, or organizing
                            detailed plans, our app makes it simple and efficient. With a clean
                            interface, cloud sync, and powerful search, you can access your notes
                            anytime, anywhere. Customize your workspace, set reminders, and keep
                            track of what matters most—all in one place.
                        </h6>
                        <h2 className='text-2xl italic font-bold py-20'>We Must Note Anything</h2>
                    </div>

                    <div className="w-full border border-[#1ebbcc] p-6 md:p-9 rounded-2xl">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
