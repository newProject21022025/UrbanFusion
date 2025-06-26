"use client";

import { useTranslations } from "next-intl";
import styles from "./page.module.css";
import RandomClothes from "../../components/randomClothes/RandomClothes";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* <p className={styles.content}>{t('content')}</p> */}
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
          <h3 className={styles.titleAboutUs}>Про нас</h3>
          <div className={styles.aboutUsBox}>
            <div className={styles.aboutUsImage}>
              <img
                src="/aboutUs_1.png"
                alt="Про нас"
                className={styles.aboutUsImageContent}
              />
            </div>
            <div className={styles.aboutUsTextBox}>
              <p className={styles.aboutUsText}>
                <span className={styles.aboutUsTextTitle}>Наша компанія</span> –
                це поєднання стилю, інновацій та відповідального ставлення до
                природи. Ми створюємо екоодяг із натуральних та перероблених
                матеріалів, дбаючи про комфорт, довговічність і мінімальний
                вплив на довкілля.
              </p>
              <p className={styles.aboutUsText}>
                <span className={styles.aboutUsTextTitle}>Наша місія</span> –
                довести, що мода може бути стильною, якісною та екологічно
                відповідальною. Обираючи наш одяг, ви не тільки виглядаєте
                чудово, а й робите крок до збереження природи.
              </p>
            </div>
          </div>
          <div className={styles.aboutUsBox}>
            <div className={styles.aboutUsTextBox}>
              <p className={styles.aboutUsText}>В основі нашого виробництва – принципи сталого розвитку:</p>
              <ul>
                <li className={styles.aboutUsText}>
                  <span className={styles.aboutUsTextTitle}>
                    Екологічні матеріали
                  </span>
                  – органічна бавовна, льон, коноплі, перероблений поліестер та
                  інші сертифіковані тканини.
                </li>
                <li className={styles.aboutUsText}>
                  <span className={styles.aboutUsTextTitle}>
                    Етичне виробництво
                  </span>
                  – ми підтримуємо чесну працю, співпрацюючи з фабриками, які
                  дотримуються етичних стандартів.
                </li>
                <li className={styles.aboutUsText}>
                  <span className={styles.aboutUsTextTitle}>
                    Безвідходні технології
                  </span>
                  – прагнемо мінімізувати відходи та використовувати екологічні
                  фарбники.
                </li>
              </ul>
            </div>
            <div className={styles.aboutUsImage}>
            <img
                src="/aboutUs_2.png"
                alt="Про нас"
                className={styles.aboutUsImageContent}
              />
            </div>
          </div>
        </section>
        <section className={styles.aboutBrand}></section>
        <section className={styles.planWork}></section>
      </main>
    </div>
  );
}
