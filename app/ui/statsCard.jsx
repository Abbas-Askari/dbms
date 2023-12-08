import React from "react";
import "./style.css";

function StatsCard({ title, value, index }) {
  return (
    <div
      style={{ "--delay": `${index * 150}ms` }}
      className="stats-card  select-none aspect-square text-center p-4  bg-gray-900 rounded-xl"
    >
      <div className="">{title}</div>
      <div className="">{value}</div>
    </div>
  );
}

export default StatsCard;
