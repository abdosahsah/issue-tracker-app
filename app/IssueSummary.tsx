import { Status } from '@prisma/client';
import Link from 'next/link';
import React from 'react'

interface IssueSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
}
function IssueSummary({ open, inProgress, closed }: IssueSummaryProps) {

  const cards: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSE' },
  ]

  return (
    <div className="flex flex-row justify-center items-center gap-3 mb-9">
      {cards.map(({ label, value, status }) => (
        <div className="flex flex-col items-center w-1/3 p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100" key={status}>
          <div className="text-3xl font-bold">
            <Link href={`/issues?status=${status}`}>{value}</Link>
          </div>
          <div className="text-sm">
            <Link href={`/issues?status=${status}`}>{label}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default IssueSummary