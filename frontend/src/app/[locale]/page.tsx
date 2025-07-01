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
          <h3 className={styles.titleAboutUs}>{t("aboutUs.title")}</h3>
          <div className={styles.aboutUsBox}>
            <div className={styles.aboutUsImage}>
              <img
                src="/aboutUs_1.png"
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
                src="/aboutUs_2.png"
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
            {/* {t("planWork.title")} */}
            Етапи виконання роботи
          </h3>
          <div className={styles.planWorkContainer}>
            <div className={styles.planWorkBox}>
              <div className={styles.planWorkInfo}>
                <p className={styles.planWorkNumber}>01</p>
                <p className={styles.planWorkText}>
                  Вибір екологічних матеріалів
                </p>
              </div>
              <ul className={styles.planWorkList}>
                <li>Органічна бавовна (без пестицидів та хімікатів).</li>
                <li>
                  Льон, коноплі, бамбук (натуральні, швидко відновлювальні
                  волокна).
                </li>
                <li>
                  Перероблені матеріали (поліестер з пластикових пляшок,
                  перероблена шерсть).
                </li>
              </ul>
            </div>
            <div className={styles.planWorkBox}>
              <div className={styles.planWorkInfo}>
                <p className={styles.planWorkNumber}>02</p>
                <p className={styles.planWorkText}>
                  Екологічне фарбування та обробка тканин
                </p>
              </div>
              <ul className={styles.planWorkList}>
                <li>Використання натуральних або малотоксичних барвників.</li>
                <li>
                  Мінімізація використання води та енергії в процесі обробки.
                </li>
              </ul>
            </div>
            <div className={styles.planWorkBox}>
              <div className={styles.planWorkInfo}>
                <p className={styles.planWorkNumber}>03</p>
                <p className={styles.planWorkText}>Етичне виробництво</p>
              </div>
              <ul className={styles.planWorkList}>
                <li>Забезпечення справедливих умов праці.</li>
                <li>Відмова від дитячої та примусової праці.</li>
                <li>Контроль за викидами та відходами виробництва.</li>
              </ul>
            </div>
            <div className={styles.planWorkBox}>
              <div className={styles.planWorkInfo}>
                <p className={styles.planWorkNumber}>04</p>
                <p className={styles.planWorkText}>Дизайн та створення одягу</p>
              </div>
              <ul className={styles.planWorkList}>
                <li>Мінімізація залишків тканини.</li>
                <li>Використання крійових технологій, що зменшують відходи.</li>
                <li>
                  Універсальні дизайни, що подовжують життєвий цикл виробу.
                </li>
              </ul>
            </div>
            <div className={styles.planWorkBox}>
              <div className={styles.planWorkInfo}>
                <p className={styles.planWorkNumber}>05</p>
                <p className={styles.planWorkText}>Упаковка та логістика</p>
              </div>
              <ul className={styles.planWorkList}>
                <li>Біорозкладні або перероблені пакувальні матеріали.</li>
                <li>Оптимізація транспортування для зменшення викидів CO₂.</li>
              </ul>
            </div>
            <div className={styles.planWorkBox}>
              <div className={styles.planWorkInfo}>
                <p className={styles.planWorkNumber}>06</p>
                <p className={styles.planWorkText}>Продаж та споживання</p>
              </div>
              <ul className={styles.planWorkList}>
                <li>
                  Прозорість у виробництві (маркування екологічних
                  сертифікатів).
                </li>
                <li>
                  Освітні кампанії для споживачів щодо правильного догляду за
                  речами.
                </li>
              </ul>
            </div>
            <div className={`${styles.planWorkBox} ${styles.lastPlanWorkBox}`}>
              <div className={styles.planWorkInfo}>
                <p className={styles.planWorkNumber}>07</p>
                <p className={styles.planWorkText}>
                  Переробка та повторне використання
                </p>
              </div>
              <ul className={styles.planWorkList}>
                <li>
                  Збір старого одягу для вторинного використання або переробки.
                </li>
                <li>
                  Розвиток програм апсайклінгу (створення нових виробів зі
                  старих матеріалів)
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
