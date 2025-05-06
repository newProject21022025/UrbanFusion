// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const isAdminRoute = request.nextUrl.pathname.startsWith("/AUF");

//   const userRole = request.cookies.get("userRole")?.value;

//   // Якщо сторінка тільки для адміна, а роль не адмін — редірект
//   if (isAdminRoute && userRole !== "admin") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// // Які маршрути перевіряти
// export const config = {
//   matcher: ["/AUF/:path*"],
// };
