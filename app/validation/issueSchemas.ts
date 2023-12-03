import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required"),
    assignedToUserId: z.string().min(1, "AssignedToUserId is required.").max(255).optional().nullable(),
});