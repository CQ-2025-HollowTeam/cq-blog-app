export interface Comment {
    id: number;
    content: string;
    authorId: string;
    post: number;
    createdAt: Date,
    updatedAt: Date,
    comments?: Comment[],
}