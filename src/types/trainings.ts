export type BaseTraining = {
    name: string;
    date: string;
    isImplementation: boolean;
    parameters: TrainingParameters;
};

export type TrainingParameters = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
};

export type Exercise = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
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
