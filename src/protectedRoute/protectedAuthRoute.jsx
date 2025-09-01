import React, { Children, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedAuthRoute({children}) {
    const { isLoggedIn } = useContext(AuthContext);
  return !isLoggedIn ? children : <Navigate to="/" />;
}
