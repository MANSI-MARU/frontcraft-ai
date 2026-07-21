export interface Project {
    id: string;
    name: string;
    description?: string;
    template: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    isStarred: boolean;
}