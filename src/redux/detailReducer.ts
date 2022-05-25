import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Comment } from "../interface/appInterface";
import { CommentResponse } from "../interface/base";

export interface CommentReducerState {
    comments: Comment[],
    commentsToLoad: number[]
}

const initialState: CommentReducerState = {
    comments: [],
    commentsToLoad: []
}

const comment = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {
        setCommentBase: (state, action: PayloadAction<Comment[]>) => { state.comments = action.payload },
        setCommentsToLoad: (state, action: PayloadAction<number[]>) => { state.commentsToLoad = action.payload },
        updateStoryDetail: (state, action: PayloadAction<{ data: CommentResponse }>) => {
            state.comments.map((obj) => {
                if (action.payload?.data?.id === obj.id) {
                    obj.isLoading = false
                    obj.data = action.payload.data
                }
                return obj
            })
        },
    },
})


export const { setCommentBase, setCommentsToLoad } = comment.actions;

export default comment.reducer;