// app/dashboard/page.tsx  <-- NO "use client" at top
import Navbar from "@/components/navbar";
import SummaryCard from "@/components/SummaryCard"; // server component
import Checkin from "@/components/Checkin";           // client‑only
import WeeklyActivity from "@/components/WeeklyActivity"; // client‑only
import Forecast from "@/components/Forecast";         // client‑only
import { getloggedInUser } from "@/lib/action/users.action";
import CarbonFootprint from "@/models/carbonFootprint";
import { connect } from "@/dbConfig/dbConfig";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // 1) Auth check
  const user = await getloggedInUser();
  if (!user) return redirect("/sign-in");

  // 2) Fetch from MongoDB on the server
  await connect();
  const latest: any = await CarbonFootprint.findOne({ userId: user.$id })
    .sort({ createdAt: -1 })
    .lean();
  const totalCO2 = (latest && !Array.isArray(latest) ? latest.carbonEmission : 0) ?? 0;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <SummaryCard totalCO2={totalCO2} change={-12} rank="Top 15%" />
        {/* these are client‑only, but the page remains a server component,
            because they’re *children* without forcing the whole tree client */}
        <Checkin />
        <WeeklyActivity />
        <Forecast />
      </div>
    </>
  );
}
