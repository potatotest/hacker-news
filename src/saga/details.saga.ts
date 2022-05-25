import { createAction, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { SETTING } from '../constant/setting.constant'
import { URL_GLOBAL } from '../constant/url.constant'
import { BaseNews, Comment, Story } from '../interface/appInterface'
import { CommentResponse } from '../interface/base'
import { setCommentBase, setCommentsToLoad } from '../redux/detailReducer'
import { updateHomeLoading, updateHomeStory, updateStoryDetail, updateStoryLeft } from '../redux/homeReducer'

export const getPostDetails = createAction<number[]>("GET_POST_DETAILS")
export const getMoreDetails = createAction<void>("GET_MORE_POST_DETAILS")

// Our worker Saga: will perform the async increment task


export function* getComment(action: PayloadAction<number[]>) {
    try {
        
        if (action.payload.length > 0) {
            const commentList = action?.payload;
            const comments = commentList.slice(0, SETTING.INITIAL_COMMENT_DATA_COUNT);
            const commentsPending = commentList.slice(SETTING.INITIAL_COMMENT_DATA_COUNT)
            const commentToLoad: Comment[] = comments.map((comment: number) => {
                return { id: comment, isLoading: true } as Comment
            })

            yield put(setCommentBase(commentToLoad))
            yield put(setCommentsToLoad(commentsPending))
            const response: Comment[] = yield all(commentToLoad.map(p => call(getCommentsDetail, p)))
            yield put(setCommentBase(response))

        } else {
            yield put(setCommentBase([]))
            yield put(setCommentsToLoad([]))
        }

    } catch (err) {
        console.error(err)
    }
}


export function* getMoreComment() {
    const commentsToLoad: number[] = yield select(state => state.comment.commentsToLoad)
    const curComment: Comment[] = yield select(state => state.comment.comments)
    const comments = commentsToLoad.slice(0, SETTING.INITIAL_COMMENT_DATA_COUNT);
    const commentsPending = commentsToLoad.slice(SETTING.INITIAL_COMMENT_DATA_COUNT)
    const commentToLoad: Comment[] = comments.map((comment: number) => {
        return { id: comment, isLoading: true } as Comment
    })
    yield put(setCommentsToLoad(commentsPending))
    const response: Comment[] = yield all(commentToLoad.map(p => call(getCommentsDetail, p)))
    yield put(setCommentBase([...curComment, ...response]))


}

export function* getCommentsDetail(comment: Comment): any {
    try {
        var { data } = yield call(axios.get, URL_GLOBAL.BASE_URL + URL_GLOBAL.ITEM_DETAIL_URL.replace("{id}", comment.id + ""))
        const res = data as CommentResponse;
        const result = { ...comment, data: data, isLoading: false } as Comment;
        if (res?.kids?.length > 0) {
            const reply: Comment[] = yield all(res.kids.map(p => call(getCommentsDetail, { id: p, isLoading: true })))
            
            result.children = reply
        }
        return result
    } catch (err) {
        console.error(err)
        return comment
    }

}



// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* comments() {
    yield takeEvery(getPostDetails.type, getComment)
    yield takeEvery(getMoreDetails.type, getMoreComment)
}