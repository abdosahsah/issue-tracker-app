import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/validation/issueSchemas"



export async function POST(req: NextRequest) {

    // Validate the request body
    const body = await req.json();

    const validatedBody = createIssueSchema.safeParse(body);

    if(!validatedBody.success)
    {
        return NextResponse.json(validatedBody.error.format(), { status: 400 });
    }

    // Create the issue
    const { title, description } = validatedBody.data;

    const newIssue = await prisma.issue.create({
        data: {
            title,
            description
        }
    });

    // Return the created issue
    return NextResponse.json(newIssue, { status: 201 });
}