export interface Comment {
    id: number;
    content: string;
    authorId: string;
    postId: number;
    createdAt: Date,
    updatedAt: Date,
    comments?: Comment[],
}