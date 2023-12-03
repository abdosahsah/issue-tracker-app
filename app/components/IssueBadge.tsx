import React from 'react'
import clsx from "clsx";

interface StatusProps {
    status: "OPEN" | "IN_PROGRESS" | "CLOSE",
}

const statusStyles = {
    OPEN: {
      className: "bg-red-100 text-red-800",
      label: "Open",
    },
    IN_PROGRESS: {
      className: "bg-purple-100 text-purple-800",
      label: "In Progress",
    },
    CLOSE: {
      className: "bg-green-100 text-green-800",
      label: "Closed",
    },
  };

function IssueBadge({ status } : StatusProps) {


    const { className, label } = statusStyles[status] || {};

    return (
        <span className={clsx("text-sm font-medium px-2.5 py-0.5 rounded", className)}>{label}</span>
      )
}

export default IssueBadge