import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/validation/issueSchemas"



export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {

    // Validate the request body
    const body = await req.json();

    const validatedBody = createIssueSchema.safeParse(body);

    if(!validatedBody.success)
    {
        return NextResponse.json(validatedBody.error.format(), { status: 400 });
    }

    // Find the issue
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue){
        return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
    }

    // Update the issue
    const { title, description, assignedToUserId } = validatedBody.data;

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
          title,
          description,
          assignedToUserId,
        },
      });
    
      return NextResponse.json(updatedIssue, { status: 200 });
    
}