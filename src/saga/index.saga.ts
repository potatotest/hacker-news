import { all } from 'redux-saga/effects';
import { comments } from './details.saga';
import { story } from './story.saga'
function* rootSaga() {
    yield all([story(), comments()]);
}

export default rootSaga;
