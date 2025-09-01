import React from 'react'
import { Outlet } from 'react-router-dom'
import AppNavbar from '../pages/Navbar';

export default function MainLayout() {
    return (
      <div>
        {/* <Navbar /> */}
        <AppNavbar />
        <Outlet />
      </div>
    );
}
