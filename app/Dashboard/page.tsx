import React from "react";
import SummaryCard from "@/components/summaryCard";
import { Check } from "lucide-react";
import Checkin from "@/components/Checkin";
import WeeklyActivity from "@/components/WeeklyActivity";
import Forecast from "@/components/Forecast";
import Navbar from "@/components/navbar";
const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <h1>Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
      <SummaryCard />
      <Checkin />
      <WeeklyActivity />
      <Forecast />
    </div>
    </>
  );
};

export default Dashboard;
