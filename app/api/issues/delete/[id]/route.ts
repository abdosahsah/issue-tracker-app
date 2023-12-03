import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {

    // Find the issue
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });
  
    if (!issue)
      return NextResponse.json(
        { error: "Invalid issue" },
        { status: 404 }
      );
  
    // Delete the issue
    await prisma.issue.delete({
      where: { id: issue.id },
    });
  
    return NextResponse.json({ message: "Issue deleted" });
  }