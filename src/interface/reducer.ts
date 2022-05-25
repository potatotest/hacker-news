import { BaseNews } from "./appInterface";

export interface HomeReducerState {
    isLoading: boolean
    stories: BaseNews[]
    totalStoryLeft: number[]

} 