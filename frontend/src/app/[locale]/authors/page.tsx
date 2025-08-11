// frontend/src/app/[locale]/authors/page.tsx

"use client";
import styles from "./Authors.module.css";
import { useTranslations } from "next-intl";

export default function Authors() {
  const t = useTranslations("Authors");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("title")}</h2>

      <p className={styles.description}>{t("description")}</p>

      <section className={styles.section}>
        <h3 className={styles.subtitle}>🎨 {t("designersTitle")}</h3>
        <ul className={styles.list}>
          <li>
            <strong>{t("designer1")}</strong>
          </li>
          <li>
            <strong>{t("designer2")}</strong>
          </li>
          <li>{t("designerResponsibilities1")}</li>
          <li>{t("designerResponsibilities2")}</li>
        </ul>
        <a
          href="https://www.behance.net/gallery/224820279/Presentation-UIUX-Design"
          target="_blank"
          rel="noopener noreferrer"
        >
          Behance
        </a>
      </section>

      <section className={styles.section}>
        <h3 className={styles.subtitle}>💻 {t("developersTitle")}</h3>
        <ul className={styles.list}>
          <li>
            <strong>{t("developer1")}</strong>
          </li>
          <li>
            <strong>{t("developer2")}</strong>
          </li>
          <li>{t("developerResponsibilities1")}</li>
          <li>{t("developerResponsibilities2")}</li>
        </ul>
      </section>

      <p className={styles.footer}>{t("footer")}</p>
    </div>
  );
}


// "use client";
// import styles from "./Authors.module.css";
// import { useTranslations } from "next-intl";

// export default function Authors() {
//   const t = useTranslations("Authors");
//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Автори проєкту</h2>

//       <p className={styles.description}>
//         Цей проєкт було створено завдяки спільній роботі талановитих дизайнерів
//         та розробників. Кожен учасник команди вніс свій внесок у візуальну
//         естетику, функціональність та загальну ідею платформи.
//       </p>

//       <section className={styles.section}>
//         <h3 className={styles.subtitle}>🎨 Дизайнери</h3>
//         <ul className={styles.list}>
//           <li>
//             <strong>Анна Христолюбова (anna.khristoliubova@gmail.com) </strong>
//           </li>
//           <li>
//             <strong>Жанна Манкаускайте </strong>
//           </li>
//           — відповідальні за основну концепцію дизайну, візуальний стиль та
//           інтерфейс користувача.
//           <br />— спеціалісти з UX, адаптація дизайну для мобільних пристроїв,
//           кольорова палітра.
//         </ul>
//         <a
//           href="https://www.behance.net/gallery/224820279/Presentation-UIUX-Design"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Behance
//         </a>
//       </section>

//       <section className={styles.section}>
//         <h3 className={styles.subtitle}>💻 Розробники</h3>
//         <ul className={styles.list}>
//           <li>
//             <strong>Денис Христолюбов (khristoliubov1986@gmail.com)</strong>
//           </li>
//           <li>
//             <strong>Андрій Дурицький (andy73594@gmail.com)</strong>
//           </li>
//           — бекенд-розробка, робота з базою даних, API та безпека проєкту.
//           <br />— фронтенд-розробка, інтеграція з перекладом, оптимізація
//           інтерфейсу та адаптивність.
//         </ul>
//       </section>

//       <p className={styles.footer}>
//         Дякуємо кожному учаснику за натхнення, ідеї та час, вкладений у
//         створення платформи!
//       </p>
//     </div>
//   );
// }
