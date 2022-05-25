import { createAction, PayloadAction } from '@reduxjs/toolkit'
import axios, { Axios, AxiosResponse } from 'axios'
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects'
import { SETTING } from '../constant/setting.constant'
import { URL_GLOBAL } from '../constant/url.constant'
import { BaseNews, Story } from '../interface/appInterface'
import { PollResponse, POST_TYPE } from '../interface/base'
import { updateHomeLoading, updateHomeStory, updatePollOptions, updateStoryDetail, updateStoryLeft } from '../redux/homeReducer'

export const getinitialStories = createAction<string>("GET_INIT_STORIES")
export const getNextStories = createAction<void>("GET_NEXT_STORIES")
// Our worker Saga: will perform the async increment task


export function* getStoryIds(action: PayloadAction<string>) {
    try {
        const { data } = yield call(axios.get, URL_GLOBAL.BASE_URL + action.payload)

        const myStory = data.slice(0, SETTING.INITIAL_DATA_COUNT);
        const storyLeft = data.slice(SETTING.INITIAL_DATA_COUNT)
        const baseNews: BaseNews[] = myStory.map((story: number) => {
            return { id: story, isLoading: true } as BaseNews
        })
        // baseNews.push({ id: 126809, isLoading: true })
        yield put(updateHomeStory(baseNews))
        yield put(updateHomeLoading(false))
        yield put(updateStoryLeft(storyLeft))
        
        yield all(baseNews.map(item => fork(getItemsDetail, { callback: updateStoryDetail.type, id: item.id })));
        
    } catch (err) {
        console.error(err)
    }
}




export function* getItemsDetail({ callback, id }: any) {
    try {
        var { data } = yield call(axios.get, URL_GLOBAL.BASE_URL + URL_GLOBAL.ITEM_DETAIL_URL.replace("{id}", id))
        yield put({ type: callback, payload: { data: data } })

    } catch (err) {

    }
}

export function* getNextItems() {
    try {
        const totalStoryLeft: number[] = yield select(state => state.story.totalStoryLeft)
        const curStory: BaseNews[] = yield select(state => state.story.stories)

        const myStory = totalStoryLeft.slice(0, SETTING.INITIAL_DATA_COUNT);
        const newStoryLeft = totalStoryLeft.slice(SETTING.INITIAL_DATA_COUNT)
        const baseNews: BaseNews[] = myStory.map((story: number) => {
            return { id: story, isLoading: true } as BaseNews
        })
        yield put(updateHomeStory([...curStory, ...baseNews]))
        yield put(updateStoryLeft(newStoryLeft))
        yield all(baseNews.map(item => fork(getItemsDetail, { callback: updateStoryDetail.type, id: item.id })));

    } catch (err) {

    }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* story() {
    yield takeEvery(getinitialStories.type, getStoryIds)
    yield takeEvery(getNextStories.type, getNextItems)

}