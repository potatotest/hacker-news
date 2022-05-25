import { CommentResponse, JobResponse, PollOptResponse, PollResponse, StoryResponse } from "./base";

export interface Story {
    id: number;
    data?: StoryResponse
    isloading: boolean;
    comments?: Comment[]
}
export interface Comment {
    id: number;
    isLoading: boolean;
    data?: CommentResponse
    children?: Comment[];
}

export interface Job {
    data: JobResponse
    comments: Comment[]
}
export interface Poll {
    data: PollResponse
    comments: Comment[]
}

export interface PollOptions {
    data: PollOptResponse
    comments: Comment[]
}


export interface BaseNews {
    id: number;
    data?: StoryResponse | JobResponse | PollResponse;
    pollOptions?: PollOptResponse[];
    isLoading: boolean
}