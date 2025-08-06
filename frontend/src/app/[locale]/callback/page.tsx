// src/app/[locale]/callback/page.tsx
"use client";

import React from "react";
import styles from "./Callback.module.css";
// import CallbackForm from "@/components/callbackForm/CallbackForm";
import dynamic from "next/dynamic";

const CallbackForm = dynamic(() => import("@/components/callbackForm/CallbackForm"), {
  ssr: false, // виключити серверний рендеринг
});

export default function Callback() {
  return (
    <div className={styles.container}>
      <h2>callback</h2>
      <CallbackForm />
    </div>
  );
}
