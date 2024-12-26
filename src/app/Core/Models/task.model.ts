export enum Priority {
    HIGH = 'HAUTE',
    MEDIUM = 'MOYENNE',
    LOW = 'BASSE'
}

export enum Status {
    COMPLETED = 'TERMINÉ',
    IN_PROGRESS = 'EN COURS',
    NOT_STARTED = 'PAS COMMENCÉ'
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