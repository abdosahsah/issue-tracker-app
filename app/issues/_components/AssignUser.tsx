"use client"
import React, { useEffect, useState } from 'react'
import { Issue } from '@prisma/client';
import { useQuery } from '@tanstack/react-query'

function AssignUser({ issue } : { issue: Issue }) {

    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch(`/api/users`).then((res) => res.json()),
        retry: 3,
    });

    const handleAssignedUser = (e: React.ChangeEvent<HTMLSelectElement>) => {

        fetch(`/api/issues/update/${issue.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...issue, assignedToUserId: e.target.value || null }),
        });
    }


    if (isLoading) {
        return <div className="my-6" >Loading...</div>
    }
    if(error) {
        return (
            <div>Something went wrong...</div>
        )
    }

  return (
    <select
        className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        defaultValue={issue?.assignedToUserId || ""}
        onChange={handleAssignedUser}
    >
        {data?.map((user : any) => (
            <option key={user?.id} value={user?.id}>
                {user?.name}
            </option>
        ))}
    </select>
  )
}

export default AssignUser