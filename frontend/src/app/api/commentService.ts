// src/api/commentService.ts

export interface CommentData {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
  } 

  export const commentService = {
    async addComment(
      clothesId: string,
      locale: string,
      commentData: CommentData
    ): Promise<void> {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes/${clothesId}/reviews`;
  
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(`Failed to add comment to clothes ${clothesId}:`, error);
        throw error;
      }
    },
  
    async deleteComment(
      clothesId: string,
      commentId: string,
      locale: string
    ): Promise<void> {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes/${clothesId}/reviews/${commentId}`;
  
        const response = await fetch(url, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(`Failed to delete comment ${commentId}:`, error);
        throw error;
      }
    },
  
    likeComment: async (clothesId: string, reviewId: string, locale: string, userId: string) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes/${clothesId}/reviews/${reviewId}/like`;
      console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    },
  
    dislikeComment: async (clothesId: string, reviewId: string, locale: string, userId: string) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes/${clothesId}/reviews/${reviewId}/dislike`;
  
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    },
  };
  