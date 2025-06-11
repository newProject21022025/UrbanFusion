// src/api/callback/callbackApi.ts

export async function updateCallbackStatus(id: string, isProcessed: boolean) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/callback/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isProcessed }),
    });
  
    if (!res.ok) {
      throw new Error("Status update failed");
    }
  
    return await res.json();
  }
  
  