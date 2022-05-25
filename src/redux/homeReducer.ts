import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseNews, PollOptions } from "../interface/appInterface";
import { PollOptResponse, StoryResponse } from "../interface/base";
import { HomeReducerState } from "../interface/reducer";

const initialState: HomeReducerState = {
    isLoading: true,
    stories: [],
    totalStoryLeft: []
}

const story = createSlice({
    name: 'story',
    initialState: initialState,
    reducers: {
        updateHomeLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload },
        updateHomeStory: (state, action: PayloadAction<BaseNews[]>) => { state.stories = action.payload },
        updateStoryDetail: (state, action: PayloadAction<{ data: StoryResponse }>) => {
            state.stories.map((obj) => {
                if (action.payload?.data?.id === obj.id) {
                    obj.isLoading = false
                    obj.data = action.payload.data
                }
                return obj
            })
        },
        updatePollOptions: (state, action: PayloadAction<{ data: PollOptResponse, parentId: number }>) => {

            state.stories.map((obj) => {
                if (action.payload.parentId === obj.id) {

                    // obj.isLoading = false
                    if (obj.pollOptions) {
                        obj.pollOptions = [...obj.pollOptions, action.payload.data]
                    } else {
                        obj.pollOptions = [action.payload.data]
                    }
                }
                return obj
            })
        },
        updateStoryLeft: (state, action: PayloadAction<number[]>) => { state.totalStoryLeft = action.payload },
    },
})


export const { updateHomeLoading, updateHomeStory, updateStoryDetail, updateStoryLeft, updatePollOptions } = story.actions;

export default story.reducer;