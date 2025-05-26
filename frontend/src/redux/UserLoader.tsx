// src/components/editProfile/EditProfile.tsx

"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

export const UserLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          dispatch(
            setUser({
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName || '',
              email: user.email || user.login,
              phone: user.phone || '',
              address: user.address || '',
              postOfficeDetails: user.postOfficeDetails || '',
              dateOfBirth: user.dateOfBirth || '',
              role: user.role || '',
            })
          );
        } catch (err) {
          console.error("Failed to parse user data from localStorage", err);
        }
      }
    }
  }, [dispatch]);

  return null;
};
