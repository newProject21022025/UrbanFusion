"use client";

import { useTranslations } from "next-intl";
import styles from "./page.module.css";
import RandomClothes from "../../components/randomClothes/RandomClothes";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const t = useTranslations("Home");
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  useEffect(() => {
    const visitData = {
      timestamp: new Date().toISOString(),
      ip: "unknown", // IP можна отримувати на сервері, або лишити так
      url: window.location.pathname,
      userAgent: navigator.userAgent,
    };
  
    fetch(`${backendUrl}/uk/visits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitData),
    }).catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>       
        <section className={styles.newCollection}>
          <h2 className={styles.titleNewCollection}>{t("title")}</h2>
          <Link href="/catalog" className={styles.buyLink}>
            {t("buy")}
          </Link>
        </section>
        <section className={styles.ekoInfo}>
          <div className={styles.ekoInfoBox}>
            <p className={styles.ekoInfoNumber}>95 %</p>
            <p className={styles.ekoInfoText}>{t("eco.materials")}</p>
          </div>
          <div className={styles.ekoInfoBox}>
            <p className={styles.ekoInfoNumber}>80 %</p>
            <p className={styles.ekoInfoText}>{t("eco.production")}</p>
          </div>
          <div className={styles.ekoInfoBox}>
            <p className={styles.ekoInfoNumber}>100 %</p>
            <p className={styles.ekoInfoText}>{t("eco.labor")}</p>
          </div>
          <div className={styles.ekoInfoBox}>
            <p className={styles.ekoInfoNumber}>80 %</p>
            <p className={styles.ekoInfoText}>{t("eco.sustainability")}</p>
          </div>
        </section>
        <RandomClothes />
        <section className={styles.aboutUs}>
          <h3 className={styles.titleAboutUs}>{t("aboutUs.title")}</h3>
          <div className={styles.aboutUsBox}>
            <div className={styles.aboutUsImage}>
              <img
                src="/home/aboutUs_1.png"
                alt={t("aboutUs.imageAlt")}
                className={styles.aboutUsImageContent}
              />
            </div>
            <div className={styles.aboutUsTextBox}>
              <p className={styles.aboutUsText}>
                <span className={styles.aboutUsTextTitle}>
                  {t("aboutUs.companyTitle")}
                </span>{" "}
                –{t("aboutUs.companyText")}
              </p>
              <p className={styles.aboutUsText}>
                <span className={styles.aboutUsTextTitle}>
                  {t("aboutUs.missionTitle")}
                </span>{" "}
                –{t("aboutUs.missionText")}
              </p>
            </div>
          </div>

          <div className={styles.aboutUsBox}>
            <div className={styles.aboutUsTextBox}>
              <p className={styles.aboutUsText}>
                {t("aboutUs.sustainabilityPrinciples")}
              </p>
              <ul>
                <li className={styles.aboutUsText}>
                  <span className={styles.aboutUsTextTitle}>
                    {t("aboutUs.ecoMaterialsTitle")}
                  </span>{" "}
                  – {t("aboutUs.ecoMaterialsText")}
                </li>
                <li className={styles.aboutUsText}>
                  <span className={styles.aboutUsTextTitle}>
                    {t("aboutUs.ethicalProductionTitle")}
                  </span>{" "}
                  – {t("aboutUs.ethicalProductionText")}
                </li>
                <li className={styles.aboutUsText}>
                  <span className={styles.aboutUsTextTitle}>
                    {t("aboutUs.zeroWasteTitle")}
                  </span>{" "}
                  – {t("aboutUs.zeroWasteText")}
                </li>
              </ul>
            </div>
            <div className={styles.aboutUsImage}>
              <img
                src="/home/aboutUs_2.png"
                alt={t("aboutUs.imageAlt")}
                className={styles.aboutUsImageContent}
              />
            </div>
          </div>
        </section>

        <section className={styles.aboutBrand}>
          <div className={styles.aboutBrandBox}>
            <div className={styles.aboutBrandBoxText}>
              <p className={styles.aboutBrandTextUp}>
                <span className={styles.aboutBrandName}>Urban Fusion </span>–
                {t("aboutBrand.brandIntro")}
              </p>
              <p className={styles.aboutBrandText}>
                <span className={styles.aboutBrandName}>Urban Fusion </span>–
                {t("aboutBrand.brandStyle")}
              </p>
            </div>
            <div className={styles.aboutBrandBoxSlogan}>
              <p className={styles.aboutBrandSlogan}>
                {t("aboutBrand.sloganStart")}
                <span className={styles.aboutBrandName}> Urban Fusion </span>–
                {t("aboutBrand.sloganEnd")}
              </p>
            </div>
          </div>
          <div className={styles.aboutBrandLine}>
            <div className={styles.aboutBrandLineInner}>
              <div className={styles.lineContent}>
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
              </div>
              <div className={styles.lineContent}>
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
                <span className={styles.aboutBrandLineDecor}>UF</span>
                {t("aboutBrand.brandLine")}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.planWork}>
  <h3 className={styles.titlePlanWork}>
    {t("planWork.title")}
  </h3>
  <div className={styles.planWorkContainer}>
    <div className={styles.planWorkBox}>
      <div className={styles.planWorkInfo}>
        <p className={styles.planWorkNumber}>01</p>
        <p className={styles.planWorkText}>
          {t("planWork.step1.title")}
        </p>
      </div>
      <ul className={styles.planWorkList}>
        <li>{t("planWork.step1.item1")}</li>
        <li>{t("planWork.step1.item2")}</li>
        <li>{t("planWork.step1.item3")}</li>
      </ul>
    </div>
    <div className={styles.planWorkBox}>
      <div className={styles.planWorkInfo}>
        <p className={styles.planWorkNumber}>02</p>
        <p className={styles.planWorkText}>
          {t("planWork.step2.title")}
        </p>
      </div>
      <ul className={styles.planWorkList}>
        <li>{t("planWork.step2.item1")}</li>
        <li>{t("planWork.step2.item2")}</li>
      </ul>
    </div>
    <div className={styles.planWorkBox}>
      <div className={styles.planWorkInfo}>
        <p className={styles.planWorkNumber}>03</p>
        <p className={styles.planWorkText}>
          {t("planWork.step3.title")}
        </p>
      </div>
      <ul className={styles.planWorkList}>
        <li>{t("planWork.step3.item1")}</li>
        <li>{t("planWork.step3.item2")}</li>
        <li>{t("planWork.step3.item3")}</li>
      </ul>
    </div>
    <div className={styles.planWorkBox}>
      <div className={styles.planWorkInfo}>
        <p className={styles.planWorkNumber}>04</p>
        <p className={styles.planWorkText}>
          {t("planWork.step4.title")}
        </p>
      </div>
      <ul className={styles.planWorkList}>
        <li>{t("planWork.step4.item1")}</li>
        <li>{t("planWork.step4.item2")}</li>
        <li>{t("planWork.step4.item3")}</li>
      </ul>
    </div>
    <div className={styles.planWorkBox}>
      <div className={styles.planWorkInfo}>
        <p className={styles.planWorkNumber}>05</p>
        <p className={styles.planWorkText}>
          {t("planWork.step5.title")}
        </p>
      </div>
      <ul className={styles.planWorkList}>
        <li>{t("planWork.step5.item1")}</li>
        <li>{t("planWork.step5.item2")}</li>
      </ul>
    </div>
    <div className={styles.planWorkBox}>
      <div className={styles.planWorkInfo}>
        <p className={styles.planWorkNumber}>06</p>
        <p className={styles.planWorkText}>
          {t("planWork.step6.title")}
        </p>
      </div>
      <ul className={styles.planWorkList}>
        <li>{t("planWork.step6.item1")}</li>
        <li>{t("planWork.step6.item2")}</li>
      </ul>
    </div>
    <div className={`${styles.planWorkBox} ${styles.lastPlanWorkBox}`}>
      <div className={styles.planWorkInfo}>
        <p className={styles.planWorkNumber}>07</p>
        <p className={styles.planWorkText}>
          {t("planWork.step7.title")}
        </p>
      </div>
      <ul className={styles.planWorkList}>
        <li>{t("planWork.step7.item1")}</li>
        <li>{t("planWork.step7.item2")}</li>
      </ul>
    </div>
  </div>
</section>
      </main>
    </div>
  );
}
