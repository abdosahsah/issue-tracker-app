"use client"
import { Status } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

function IssueFilterStatuses() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const statuses: { label: string,value?: Status }[] = [
        { label: "all" },
        { label: "open",value: "OPEN" },
        { label: "in progress",value: "IN_PROGRESS" },
        { label: "closed",value: "CLOSE" },
    ];

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        searchParams.has("orderBy") 
            ? router.push(`/issues?status=${e.target.value}&orderBy=${searchParams.get("orderBy")}`) 
            : router.push(`/issues?status=${e.target.value}`);
    }

  return (
    <select 
        className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5"
        onChange={handleChangeStatus}
    >
        {statuses.map((status, index) => (
            <option key={index} value={status.value || ""}>
                {status.label}
            </option>
        ))}
    </select>
  )
}

export default IssueFilterStatuses