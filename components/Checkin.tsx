"use client";

import { useState, useEffect } from "react";
import { format, subDays } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";
import { useRouter } from "next/navigation";

type Status = "done" | "partial" | "missed" | "none";

const dayColors: Record<Status, string> = {
  done: "text-green-500",
  partial: "text-yellow-400",
  missed: "text-red-500",
  none: "text-gray-400",
};

export default function Checkin() {
  const router = useRouter();
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) =>
    format(subDays(today, 6 - i), "yyyy-MM-dd")
  );

  const defaultStatus: Record<string, Status> = last7Days.reduce(
    (acc, date) => {
      acc[date] = "none";
      return acc;
    },
    {} as Record<string, Status>
  );

  const [checkinStatus, setCheckinStatus] =
    useState<Record<string, Status>>(defaultStatus);

  useEffect(() => {
  }, []);

  const handleCheckIn = () => {
    const todayKey = format(today, "yyyy-MM-dd");
    setCheckinStatus((prev) => ({
      ...prev,
      [todayKey]: "done",
    }));
router.push("/Dashboard/form"); 
  };

  return (
    <main className="p-6 flex justify-center">
      <Card className=" bg-gray-100 shadow-md rounded-xl text-center w-full max-w-1xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Daily Check-in Status
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between items-center px-4 py-2 mb-6">
            {last7Days.map((dateStr) => {
              const displayDay = format(new Date(dateStr), "EEE"); // e.g. "Mon"
              return (
                <div
                  key={dateStr}
                  className="flex flex-col items-center text-sm"
                >
                  <Circle
                    className={`w-5 h-5 ${dayColors[checkinStatus[dateStr]]}`}
                  />
                  <span className="mt-1 text-gray-700">{displayDay}</span>
                </div>
              );
            })}
          </div>

          <Button
            onClick={handleCheckIn}
            className="bg-green-500 hover:bg-green-600 w-full"
          >
          Check in for Today
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
