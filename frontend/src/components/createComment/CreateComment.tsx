//src/components/createComment/CreateComment.tsx

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; 
import styles from "./CreateComment.module.css";
import { commentService } from "../../app/api/commentService";

interface CreateCommentProps {
  clothesId: string;
  locale: string;
  onCommentAdded: () => void;
}

export default function CreateComment({
  clothesId,
  locale,
  onCommentAdded,
}: CreateCommentProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0); // rating по дефолту 0
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const userId = user.userId;
  const userName = user.firstName
    ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : "Користувач";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !userId) return;

    setIsSubmitting(true);
    try {
      await commentService.addComment(clothesId, locale, {
        userId,
        userName,
        rating,  // відправляємо rating навіть якщо 0
        comment,
      });

      setComment("");
      setRating(0); // скидаємо рейтинг назад у 0
      onCommentAdded();
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Залишити коментар</h3>
      <div className={styles.rating}>
        <label>Оцінка:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={0}>Без оцінки</option> {/* Додана опція 0 */}
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Ваш коментар..."
        required
        className={styles.textarea}
      />
      <button
        type="submit"
        disabled={isSubmitting || !userId}
        className={styles.submitButton}
        title={!userId ? "Ви маєте увійти, щоб залишити коментар" : ""}
      >
        {isSubmitting ? "Відправка..." : "Відправити"}
      </button>
    </form>
  );
}
