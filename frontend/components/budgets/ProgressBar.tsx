"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="flex justify-center p-10">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: percentage >= 100 ? "#DC2626" : "#00A63E",
          trailColor: "#e1e1e1",
          textColor: percentage >= 100 ? "#DC2626" : "#00A63E",
          textSize: 8,
        })}
        text={`${percentage}% Gastado`}
        value={percentage}
      />
    </div>
  );
};
