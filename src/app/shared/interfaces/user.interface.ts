export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    role: number;
    img: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
