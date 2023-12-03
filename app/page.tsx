import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import LastIssues from "./LastIssues";

export default async function Home() {

  // Get count of issues
  const openCount = await prisma.issue.count({
    where: { status: 'OPEN' },
  });

  const inProgressCount = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  
  const closedCount = await prisma.issue.count({
    where: { status: 'CLOSE' },
  });

  return (
    <main>
      <IssueSummary open={openCount} inProgress={inProgressCount} closed={closedCount} />
      <div className="flex flex-col md:flex-row justify-center items-center gap-3">
        <IssueChart open={openCount} inProgress={inProgressCount} closed={closedCount} />
        <LastIssues />
      </div>
    </main>
  )
}
