// src/components/likeDislike/LikeDislike.tsx:

"use client";

import { useState } from "react";
import { commentService } from "../../app/api/commentService";

interface LikeDislikeProps {
  clothesId: string;
  reviewId: string;
  userId: string | null;
  initialLikes: number;
  initialDislikes: number;
  locale: string;
  onChange: () => void;
  userVote?: "like" | "dislike" | null;
  authorId: string; 
}

const LikeDislike = ({
  clothesId,
  reviewId,
  userId,
  initialLikes,
  initialDislikes,
  locale,
  onChange,
  userVote = null,
  authorId, 
}: LikeDislikeProps) => {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [dislikes, setDislikes] = useState<number>(initialDislikes);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentVote, setCurrentVote] = useState<"like" | "dislike" | null>(
    userVote
  );

  const handleVote = async (type: "like" | "dislike") => {
    if (!userId) {
      alert("Будь ласка, увійдіть в акаунт, щоб голосувати.");
      return;
    }

    if (userId === authorId) {
      alert("Ви не можете голосувати за власний коментар.");
      return;
    }

    if (currentVote === type) {
      return;
    }

    try {
      setIsLoading(true);

      if (type === "like") {
        await commentService.likeComment(clothesId, reviewId, locale, userId);
        setLikes((prev) => prev + 1);
        if (currentVote === "dislike") {
          setDislikes((prev) => prev - 1);
        }
      } else {
        await commentService.dislikeComment(clothesId, reviewId, locale, userId);
        setDislikes((prev) => prev + 1);
        if (currentVote === "like") {
          setLikes((prev) => prev - 1);
        }
      }

      setCurrentVote(type);
      onChange();
    } catch (err) {
      console.error("Vote failed:", err);
      alert(err instanceof Error ? err.message : "Помилка під час голосування.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleVote("like");
        }}
        disabled={isLoading}
        style={{ opacity: currentVote === "like" ? 1 : 0.6 }}
      >
        👍 {likes}
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleVote("dislike");
        }}
        disabled={isLoading}
        style={{ opacity: currentVote === "dislike" ? 1 : 0.6 }}
      >
        👎 {dislikes}
      </button>
    </div>
  );
};

export default LikeDislike;
