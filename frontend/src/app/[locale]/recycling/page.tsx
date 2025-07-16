import React from "react";
// import { useTranslations } from "next-intl";
import styles from "./Recycling.module.css";

export default function Recycling() {
  return (
    <div className={styles.container}>
      <section className={styles.recycling}>
        <h2 className={styles.recyclingTitle}>Переробка одягу</h2>
        <p className={styles.recyclingDescription}>
          <span className={styles.recyclingHighlight}>Переробка одягу</span> —
          це процес, у якому старий або непотрібний одяг перетворюється на нові
          речі з доданою цінністю. Це екологічний підхід, який допомагає
          зменшити текстильні відходи та створити унікальні вироби.
        </p>
        <h3 className={styles.recyclingSubtitle}>Як переробляється одяг?</h3>
        <div className={styles.recyclingBoxFirst}>
          <p>
            <span className={styles.recyclingNumber}>01.</span> Сортування та
            оцінка
          </p>
          <ul className={styles.recyclingList}>
            <li>
              Перевіряють стан одягу: що можна відновити, а що краще розібрати
              на матеріали.
            </li>
            <li>
              Визначають, які речі можна продати як секонд-хенд, а які підходять
              для переробки.
            </li>
          </ul>
        </div>
        <div>
          <img
            src="/recycling/recycling_1.png"
            // alt={t("aboutUs.imageAlt")}
            className={styles.recyclingImageFirst}
          />
        </div>
      </section>
      <section className={styles.recyclingItems}>
        <div className={styles.recyclingBox}>
          <p>
            <span className={styles.recyclingNumber}>02.</span>
            Ремонт та оновлення
          </p>
          <ul className={styles.recyclingList}>
            <li>Заміна гудзиків, блискавок, латання дірок.</li>
            <li>
              Фарбування або відбілювання тканини для зміни зовнішнього вигляду.
            </li>
            <li>Додавання нашивок, принтів, вишивки чи іншого декору.</li>
          </ul>
        </div>
        <div className={styles.recyclingImageBox}>
          <img
            src="/recycling/recycling_2.png"
            // alt={t("aboutUs.imageAlt")}
            className={styles.recyclingImage}
          />
        </div>
      </section>
      <section className={styles.recyclingItems}>
        <div className={styles.recyclingImageBox}>
          <img
            src="/recycling/recycling_3.png"
            // alt={t("aboutUs.imageAlt")}
            className={styles.recyclingImage}
          />
        </div>
        <div className={styles.recyclingBox}>
          <p>
            <span className={styles.recyclingNumber}>03.</span>
            Перешивання та модифікація
          </p>
          <ul className={styles.recyclingList}>
            <li>
              Зміна фасону: створення кроп-топів із футболок, джинсових шортів
              зі штанів, сумок із старого деніму.
            </li>
            <li>Комбінування тканин для створення нових дизайнів.</li>
            <li>
              Використання залишків тканини для аксесуарів (пов’язки, чохли,
              гаманці).
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.recyclingItems}>
        <div className={styles.recyclingBox}>
          <p>
            <span className={styles.recyclingNumber}>04.</span>
            Розбирання на матеріали
          </p>
          <ul className={styles.recyclingList}>
            <li>
              Речі, які не можна відремонтувати, ріжуть на клапті для подальшого
              використання.
            </li>
            <li>Виробництво нової пряжі зі старих светрів.</li>
            <li>
              Перетворення текстилю на ганчірки, утеплювач або навіть нові
              тканини.
            </li>
          </ul>
        </div>
        <div className={styles.recyclingImageBox}>
          <img
            src="/recycling/recycling_4.png"
            // alt={t("aboutUs.imageAlt")}
            className={styles.recyclingImage}
          />
        </div>
      </section>
      <section className={styles.recyclingItems}>
        <div className={styles.recyclingImageBox}>
          <img
            src="/recycling/recycling_5.png"
            className={styles.recyclingImage}
            alt="Переробка на фабриках"
          />
        </div>
        <div className={styles.recyclingBox}>
          <p>
            <span className={styles.recyclingNumber}>05.</span>
            Переробка на фабриках
          </p>
          <ul className={styles.recyclingList}>
            <li>
              Деякі компанії спеціалізуються на промисловій переробці:
              подрібнюють тканину, перетворюючи її на нову сировину для одягу,
              килимів, ізоляційних матеріалів.
            </li>
            <li>
              Переробка одягу не лише продовжує життя речам, а й допомагає
              зменшити екологічний слід текстильного виробництва.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
