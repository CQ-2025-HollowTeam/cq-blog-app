export interface User {
    id:        string;
    username:  string;
    email:     string;
    name:      string;
    password:  string;
    role:      number;
    isActive:  boolean;
    createdAt: Date;
    updatedAt: Date;
}