export type Issue = {
    id: number,
    title: string,
    description: string,
    status: "OPEN" | "IN_PROGRESS" | "CLOSE",
    createdAt: Date
    updatedAt?: Date
}