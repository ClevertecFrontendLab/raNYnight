export interface Period {
    text: string;
    cost: number;
    days: number;
}

export interface Tariff {
    _id: string;
    name: string;
    periods: Period[];
}

export interface CreateTariffRequest {
    tariffId: string;
    days: number;
}

export interface UserData {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff?: {
        tariffId: string;
        expired: string;
    };
}
