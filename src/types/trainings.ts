export type BaseTraining = {
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
    replays: string;
    weight: string;
    approaches: string;
    isImplementation?: boolean;
    selected?: boolean;
    index?: number;
};

export type ExerciseResponse = Exercise & {
    _id: string;
};

export type NewTrainingRequest = BaseTraining & {
    exercises: Exercise[];
};

export type NewTrainingResponse = BaseTraining & {
    _id: string;
    exercises: ExerciseResponse[];
};

export interface TrainingItem {
    name: 'Силовая' | 'Ноги' | 'Руки' | 'Грудь' | 'Спина';
    key: 'strength' | 'legs' | 'hands' | 'chest' | 'back';
}
