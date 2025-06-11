'use-client'
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const WeeklyActivity = () => {
  return (
    <Card className="bg-gradient-to-br from-slate-100 to-slate-200 shadow-md rounded-2xl w-full max-w-2xl mx-auto min-h-44">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Weekly Activity</h2>
        <p className="text-sm text-slate-500 mb-2">This week, you have:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reduced your carbon footprint by 12%</li>
          <li>Engaged in 3 eco-friendly activities</li>
          <li>Ranked in the top 15% of the community</li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default WeeklyActivity;