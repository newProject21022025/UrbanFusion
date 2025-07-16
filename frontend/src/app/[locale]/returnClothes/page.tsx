import React from "react";
// import { useTranslations } from "next-intl";
import styles from "./ReturnClothes.module.css";

export default function ReturnClothes() {
  return (
    <div className={styles.container}>
      <section className={styles.returnClothes}>
        <h2 className={styles.returnClothesTitle}>
          Як повернути одяг для переробки
        </h2>
        <p className={styles.returnClothesDescription}>
          Ми в{" "}
          <span className={styles.returnClothesHighlight}>UrbanFusion</span> —
          прагнемо стійкого майбутнього, і ви можете стати частиною цього руху!
          Якщо у вас є старі речі нашого бренду, які вже не носяться, ми
          пропонуємо зручний та екологічний спосіб їхньої переробки.
        </p>
        <div className={styles.returnClothesImageBox}>
          <img
            src="/returnClothes/1.png"
            // alt={t("aboutUs.imageAlt")}
            className={styles.returnClothesImage}
          />
        </div>
      </section>
      <section className={styles.returnClothesItems}>
        <div className={styles.returnClothesBox}>
          <h2 className={styles.returnClothesTitle}>
            Покрокова інструкція з повернення одягу:
          </h2>
          <p>
            <span className={styles.returnClothesNumber}>01.</span> Перевірте
            стан – переконайтеся, що одяг чистий та сухий. Ми приймаємо речі з
            незначними дефектами, але сильно пошкоджені чи забруднені вироби
            краще утилізувати в інший спосіб.
          </p>
          <p>
            <span className={styles.returnClothesNumber}>02.</span> Упакуйте
            речі – складіть одяг у будь-яку чисту упаковку (пакет чи коробку).
          </p>
        </div>
        <div className={styles.returnClothesImageBox}>
          <img
            src="/returnClothes/2.png"
            // alt={t("aboutUs.imageAlt")}
            className={styles.returnClothesImage}
          />
          <img
            src="/returnClothes/3.png"
            // alt={t("aboutUs.imageAlt")}
            className={styles.returnClothesImage}
          />
        </div>
      </section>
      <section className={styles.returnClothesItems}>
        <div className={styles.returnClothesBox}>
          <h2 className={styles.returnClothesTitle}>
            Виберіть спосіб повернення:
          </h2>
          <p>
            <span className={styles.returnClothesNumber}>01.</span> Віднесіть до
            нашого фірмового магазину – знайдіть найближчу точку збору на карті
            https://www.google.com/maps/place/%D0%A3%D0%BA%.
          </p>
          <p>
            <span className={styles.returnClothesNumber}>02.</span> Надішліть
            посилкою – оформіть повернення через кур'єрську службу, вказавши
            нашу адресу.
          </p>
          <p>
            <span className={styles.returnClothesNumber}>03.</span> Отримайте
            бонус – за участь у програмі переробки ми даруємо вам знижку чи
            бонусні бали на наступну покупку. Докладніше про умови акції:
            https://urban-fusion-5fee.vercel.app/uk
          </p>
        </div>
        <div className={styles.returnClothesImageBox}>
          <img
            src="/returnClothes/4.png"
            // alt={t("aboutUs.imageAlt")}
            className={styles.returnClothesImage}
          />
        </div>
      </section>
      <section className={styles.returnClothesItems}>
        <div className={styles.returnClothesBox}>
          <h2 className={styles.returnClothesTitle}>
            Що відбувається з одягом після повернення?
          </h2>
          <p>
            <span className={styles.returnClothesNumber}>01.</span> Зібрані речі
            вирушають на переробку, де вони здобувають друге життя. Матеріали
            переробляються на нові тканини, утеплювачі чи інші корисні
            матеріали, зменшуючи негативний вплив на довкілля.
          </p>
          <p>
            <span className={styles.returnClothesNumber}>02.</span> Приєднуйтесь
            до нас у створенні екологічнішого майбутнього! Якщо ви маєте
            запитання, зв'яжіться з нами через пошту project21022025@proton.me.
          </p>
        </div>
        <div className={styles.returnClothesImageBox}>
          <img
            src="/returnClothes/5.png"
            // alt={t("aboutUs.imageAlt")}
            className={styles.returnClothesImage}
          />
        </div>
      </section>
    </div>
  );
}
