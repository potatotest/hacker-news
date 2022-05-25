import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import createReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import mySaga from '../saga/index.saga';
import story from './homeReducer';
import comment from './detailReducer';

const baseReducer = combineReducers({
    story: story,
    comment: comment
})

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: baseReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware)

});
sagaMiddleware.run(mySaga)

// rootSaga.
export type RootState = ReturnType<typeof baseReducer>;


export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store