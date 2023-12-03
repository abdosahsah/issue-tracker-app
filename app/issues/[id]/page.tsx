import Heading from "@/app/components/Heading";
import IssueBadge from "@/app/components/IssueBadge";
import NotFound from "@/app/components/NotFound";
import prisma from "@/prisma/client";
import ReactMarkdown from "react-markdown";
import { Issue } from "@/app/types/issueType";
import Link from "next/link";
import DeleteIssue from "../_components/DeleteIssue";
import AssignUser from "../_components/AssignUser";



interface IssueDetailProps {
  params: { id: string };
}

async function issueDetailPage({ params }: IssueDetailProps ) {

  const { id } = params;

  const issueDetail: Issue | any  = await prisma.issue.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!issueDetail) {
    return (
      <NotFound />
    )
  }

  return (
    <div>
      <Heading title={issueDetail?.title} />
      <div className="flex flex-col md:flex-row items-start gap-5 w-full">
        <div className="w-full md:w-1/2">
          <div className="mb-5">
            <IssueBadge status={issueDetail?.status} />
            <span className="ml-5">{issueDetail?.createdAt.toDateString()}</span>
          </div>
          <div className="w-full border px-8 py-5 mb-5">
            <ReactMarkdown>{issueDetail?.description}</ReactMarkdown>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {/* Assign to user */}
          <AssignUser issue={issueDetail}/>
          {/* Buttons actions */}
          <div className="flex flex-row gap-4">
            <Link href={`/issues/edit/${id}`}>
              <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded">Edit</button>
            </Link>
            <DeleteIssue issueId={id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default issueDetailPage