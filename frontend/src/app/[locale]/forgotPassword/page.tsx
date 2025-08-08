// src/app/[locale]/forgotPassword/page.tsx

import styles from "./ForgotPassword.module.css";
import React from "react";
import { ForgotPasswordForm } from "@/components/forgotPasswordForm/ForgotPasswordForm";  


export default function ForgotPassword() {
  return (
    <div className={styles.container}>      
      <ForgotPasswordForm />    
    </div>
  );
}
