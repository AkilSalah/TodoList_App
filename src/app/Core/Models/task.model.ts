export enum Priority {
    HIGH = 'HAUTE',
    MEDIUM = 'MOYENNE',
    LOW = 'BASSE'
}

export enum Status {
    COMPLETED = 'Done',
    IN_PROGRESS = 'Doing',
    NOT_STARTED = 'ToDo'
}

export class Task {
    id: number = 0;
    title?: string;
    description?: string;
    dueDate?: Date;
    priority?: Priority;
    status?: Status;
    categoryId?: number; 
}