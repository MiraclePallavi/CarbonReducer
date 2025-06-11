'use-client'
import { Card, CardContent } from "@/components/ui/card";
import React from "react";  

const Forecast = () => {
  return (
    <Card className="bg-gradient-to-br from-slate-100 to-slate-200 shadow-md rounded-2xl w-full max-w-2xl mx-auto min-h-44">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Forecast</h2>
        <p className="text-sm text-slate-500 mb-2">Next week, you can expect:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Increased engagement in eco-friendly activities</li>
          <li>Potential for a 15% reduction in carbon footprint</li>
          <li>Opportunities to rank higher in the community</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default Forecast;