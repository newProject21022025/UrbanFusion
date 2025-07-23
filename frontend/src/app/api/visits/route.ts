// // src/app/api/visits/route.ts


// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs/promises";
// import path from "path";

// const filePath = path.join(process.cwd(), "public", "logs", "visits.json");

// async function readVisits() {
//   try {
//     const data = await fs.readFile(filePath, "utf-8");
//     return data.trim() ? JSON.parse(data) : [];
//   } catch {
//     return [];
//   }
// }

// async function writeVisits(visits: any[]) {
//   await fs.mkdir(path.dirname(filePath), { recursive: true });
//   await fs.writeFile(filePath, JSON.stringify(visits, null, 2), "utf-8");
// }

// async function getGeoLocation(ip: string | undefined) {
//   if (!ip) return { city: "невідомо", country: "невідомо" };
//   try {
//     const res = await fetch(`https://ipapi.co/${ip}/json/`);
//     if (!res.ok) throw new Error("Не вдалося отримати геодані");
//     const data = await res.json();
//     return {
//       city: data.city || "невідомо",
//       country: data.country_name || "невідомо",
//     };
//   } catch {
//     return { city: "невідомо", country: "невідомо" };
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const newVisit = await request.json();

//     const forwardedFor = request.headers.get("x-forwarded-for");
//     const ip = forwardedFor?.split(",")[0].trim() || "невідомо";

//     const location = await getGeoLocation(ip);

//     newVisit.ip = ip;
//     newVisit.city = location.city;
//     newVisit.country = location.country;

//     const visits = await readVisits();
//     visits.push(newVisit);

//     await writeVisits(visits);

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Помилка запису в visits.json:", error);
//     return NextResponse.json(
//       { success: false, error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   const visits = await readVisits();
//   return NextResponse.json({ success: true, visits });
// }
