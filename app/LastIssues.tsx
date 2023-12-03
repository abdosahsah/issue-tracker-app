import prisma from '@/prisma/client'
import { Issue } from '@prisma/client'
import React from 'react'
import IssueBadge from './components/IssueBadge';
import Link from 'next/link';

async function LastIssues() {

  const issues : Issue[] | null = await prisma.issue.findMany({ take : 5 });

  return (
    <div className="w-full md:w-1/2 p-3 border border-gray-200 rounded-lg">
      <h2 className="text-lg font-bold mb-3">Last Issues</h2>
      <table className="table-auto w-full text-sm text-gray-500">
        <tbody>
          {issues?.map((issue) => (
            <tr className="bg-white border-b" key={issue.id}>
              <td className="px-2 py-4 text-left">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </td>
              <td className="px-2 py-4 text-right">
                <IssueBadge status={issue.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LastIssues