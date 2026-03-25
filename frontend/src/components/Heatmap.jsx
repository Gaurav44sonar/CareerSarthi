import React from "react";

function HeatMap({ activity = [] }) {

  // Convert activity into map
  const activityMap = {};
  activity.forEach(day => {
    activityMap[day.date] = day.count || 0;
  });

  // Get last 4 months
  const getLast4Months = () => {
    const months = [];
    const today = new Date();

    for (let i = 3; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);

      months.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        label: d.toLocaleString("default", { month: "short" })
      });
    }

    return months;
  };

  const months = getLast4Months();

  // Generate days for a month
  const generateMonthDays = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      const key = date.toISOString().split("T")[0];

      days.push({
        date: key,
        count: activityMap[key] || 0,
        day: date.getDay()
      });

      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  // Group into weeks
  const groupWeeks = (days) => {
    const weeks = [];
    let week = new Array(7).fill(null);

    days.forEach(day => {
      const d = new Date(day.date).getDay();
      week[d] = day;

      if (d === 6) {
        weeks.push(week);
        week = new Array(7).fill(null);
      }
    });

    if (week.some(d => d !== null)) {
      weeks.push(week);
    }

    return weeks;
  };

  // Color scale
  const getColor = (count) => {
    if (count === 0) return "bg-gray-200";
    if (count < 2) return "bg-green-200";
    if (count < 4) return "bg-green-400";
    if (count < 6) return "bg-green-500";
    return "bg-green-700";
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h3 className="text-xl font-bold mb-6 text-gray-800">
        🔥 Consistency Tracker
      </h3>

      {/* MONTHS IN ONE ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {months.map((m, i) => {

          const days = generateMonthDays(m.year, m.month);
          const weeks = groupWeeks(days);

          return (

            <div
              key={i}
              className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >

              {/* Month Title */}
              <h4 className="text-sm font-semibold text-gray-600 mb-3 text-center">
                {m.label}
              </h4>

              {/* Heatmap */}
              <div className="flex justify-center gap-1">

                {weeks.map((week, wi) => (

                  <div key={wi} className="flex flex-col gap-1">

                    {week.map((day, di) => (

                      <div
                        key={di}
                        title={
                          day
                            ? `${day.date} • ${day.count} activities`
                            : ""
                        }
                        className={`
                          w-4 h-4 rounded
                          transition-all duration-200
                          hover:scale-125
                          ${day ? getColor(day.count) : "bg-transparent"}
                        `}
                      />

                    ))}

                  </div>

                ))}

              </div>

            </div>

          );

        })}

      </div>

      {/* LEGEND */}
      <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
        <span>Less</span>
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="w-4 h-4 bg-green-200 rounded"></div>
        <div className="w-4 h-4 bg-green-400 rounded"></div>
        <div className="w-4 h-4 bg-green-500 rounded"></div>
        <div className="w-4 h-4 bg-green-700 rounded"></div>
        <span>More</span>
      </div>

    </div>
  );
}

export default HeatMap;