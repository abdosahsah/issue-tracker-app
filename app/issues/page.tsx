import prisma from '@/prisma/client';
import Heading from '../components/Heading';
import IssueBadge from '../components/IssueBadge';
import { Issue } from "@/app/types/issueType";
import Link from 'next/link';
import IssueFilterStatuses from './_components/IssueFilterStatuses';
import { Status } from '@prisma/client';
import Pagination from '../components/Pagination';

interface IssueProps { 
  searchParams: { status: Status, orderBy: keyof Issue, page: string }
}

async function IssuesPage({ searchParams } : IssueProps ) {

  // Columns data
  const columns: { label: string, key: keyof Issue }[] = [
    {
      label: "Issue",
      key: "title",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "CreatedAt",
      key: "createdAt",
    },
  ];
  
  // Validate status param
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) 
    ? searchParams.status
    : undefined;

  // Validate orderBy param
  const orderBy = columns
    .map(column => column.key)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' } 
    : undefined;

  // Pagination
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  // Get issues
  const issues: Issue[] | any[] = await prisma.issue.findMany(
    { 
      where : { 
        status: status // Filter by status
      },
      orderBy: orderBy, // Column sort
      skip: (page - 1) * pageSize, // Skip pages
      take: pageSize, // Pages size
    }
  );

  // Get total issues
  const issuesCount = await prisma.issue.count({ where: { status: status }});

  return (
    <div className="overflow-x-auto">
        <Heading title={"Isssues List"} />

        {/* Issue Actions */}
        <div className="flex flex-row gap-2 justify-between">
          {/* Create new issue */}
          <Link href="/issues/new">
            <button 
                className="w-auto bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded" 
                type="submit">
                    Create Issue
            </button>
          </Link>
          {/* Filter Issues */}
          <IssueFilterStatuses />
        </div>

        {/* Issues Table */}
        <table className="table-auto w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th className="px-6 py-3" key={column.key}>
                  <Link href={{
                    pathname: "/issues",
                    query: { ...searchParams, orderBy: column.key },
                  }}>
                    {column.label}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {issues?.map((issue) => (
              <tr className="bg-white border-b" key={issue.id}>
                <td className="px-6 py-4">
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                </td>
                <td className="px-6 py-4">
                  <IssueBadge status={issue.status} />
                </td>
                <td className="px-6 py-4">{issue.createdAt.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <Pagination itemsCount={issuesCount} itemsPerPage={pageSize} currentPage={page} />
    </div>
  )
}

export const dynamic = "force-dynamic";

export default IssuesPage