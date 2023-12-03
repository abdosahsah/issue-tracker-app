"use client"
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';

interface IssueChartProps {
  open: number;
  inProgress: number;
  closed: number;
}

function IssueChart({ open, inProgress, closed }: IssueChartProps) {

  const data: {
    label: string;
    value: number;
  }[] = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart data={data} >
        <XAxis dataKey="label" />
        <YAxis />
        <Bar dataKey="value" barSize={60} fill="#00ACC1" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default IssueChart