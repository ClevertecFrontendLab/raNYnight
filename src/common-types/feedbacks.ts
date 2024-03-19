export interface Feedback {
    id: string;
    fullname: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
}
export interface FeedbackRequest {
    message: string | null;
    rating: number;
}
