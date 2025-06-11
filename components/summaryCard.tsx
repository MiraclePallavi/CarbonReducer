"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Trophy } from "lucide-react";

export default function summaryCard({
totalCO2 = 52.6,
change = -12,
rank = "Top 15%",
}) {
const isDecrease = change < 0;

return (
<Card className="bg-gradient-to-br from-slate-100 to-slate-200 shadow-md rounded-2xl w-full max-w-1xl mx-auto min-h-44">
<CardHeader>
<CardTitle className="text-xl font-bold text-slate-800">
Weekly Carbon Summary
</CardTitle>
</CardHeader>
  <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {/* Total CO2 */}
    <div className="flex flex-col items-start justify-center">
      <p className="text-sm text-slate-500">This Week</p>
      <p className="text-3xl font-bold text-green-700">{totalCO2.toFixed(1)} kg</p>
      <p className="text-xs text-slate-500">CO₂ emitted</p>
    </div>

    {/* Change from Last Week */}
    <div className="flex flex-col items-start justify-center">
      <p className="text-sm text-slate-500">Compared to Last Week</p>
      <div className="flex items-center gap-1">
        {isDecrease ? (
          <TrendingDown className="w-5 h-5 text-emerald-500" />
        ) : (
          <TrendingUp className="w-5 h-5 text-red-500" />
        )}
        <p className={`text-2xl font-semibold ${isDecrease ? "text-emerald-600" : "text-red-600"}`}>
          {isDecrease ? "↓" : "↑"} {Math.abs(change)}%
        </p>
      </div>
      <p className="text-xs text-slate-500">
        {isDecrease ? "Good job!" : "Needs improvement"}
      </p>
    </div>

    {/* Rank */}
    <div className="flex flex-col items-start justify-center">
      <p className="text-sm text-slate-500">Leaderboard</p>
      <div className="flex items-center gap-1 text-yellow-600">
        <Trophy className="w-5 h-5" />
        <p className="text-2xl font-bold">{rank}</p>
      </div>
      <p className="text-xs text-slate-500">Community standing</p>
    </div>
  </CardContent>
</Card>
);
}