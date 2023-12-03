import React from 'react'
import prisma from "@/prisma/client";
import { Issue } from "@/app/types/issueType";
import NotFound from '@/app/components/NotFound';
import IssueForm from '../../_components/IssueForm';

async function issueEditPage({ params: { id } }: { params: { id: string } }) {

    console.log(id);
    const issue: Issue | null = await prisma.issue.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!issue) {
        return (
            <NotFound />
        )
    }

  return (
    <IssueForm heading="Edit Issue" btnName="Edit" issue={issue} />
  )
}

export default issueEditPage