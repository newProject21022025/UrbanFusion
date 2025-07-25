// src/app/[locale]/callback/page.tsx
"use client";

import React from "react";
import styles from "./Callback.module.css";
import CallbackForm from "@/components/callbackForm/CallbackForm";

export default function Callback() {
  return (
    <div className={styles.container}>
      <h2>callback</h2>
      <CallbackForm />
    </div>
  );
}
