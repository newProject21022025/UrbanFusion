
import styles from "./ForgotPassword.module.css";
import React from "react";
import { ForgotPasswordForm } from "@/components/forgotPasswordForm/ForgotPasswordForm";  


export default function ForgotPassword() {
  return (
    <div className={styles.container}>
      {/* <h2>12345</h2> */}
      <ForgotPasswordForm />
    {/* <form onSubmit={handleSubmit}>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <button type="submit">Надіслати новий пароль</button>
</form> */}
    </div>
  );
}
