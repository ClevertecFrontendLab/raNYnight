export type BaseTraining = {
    _id?: string;
    name: string;
    date: string;
    isImplementation: boolean;
    parameters: TrainingParameters;
};

export type TrainingParameters = {
    repeat: boolean;
    period: number | null;
    jointTraining: boolean;
    participants: string[] | null;
};

export type Exercise = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
    selected?: boolean;
    index?: number;
    _id?: string;
};

export interface TrainingItem {
    name: 'Силовая' | 'Ноги' | 'Руки' | 'Грудь' | 'Спина';
    key: 'strength' | 'legs' | 'hands' | 'chest' | 'back';
}

export type ModifiedTraining = BaseTraining & {
    exercises: Exercise[];
};

export type Training = { name: string };

export enum Trainings {
    Силовая = 'strength',
    Ноги = 'legs',
    Руки = 'hands',
    Грудь = 'chest',
    Спина = 'back',
    Кардио = 'cardio',
}
