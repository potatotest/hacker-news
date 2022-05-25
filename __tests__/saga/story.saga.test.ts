import 'react-native';
import store from '../../src/redux/store';
import { expectSaga } from 'redux-saga-test-plan';
import { URL_GLOBAL } from '../../src/constant/url.constant';
import { getinitialStories, getItemsDetail, getStoryIds } from '../../src/saga/story.saga';
import axios from 'axios'
import { updateHomeStory, updateStoryDetail, updateStoryLeft } from '../../src/redux/homeReducer';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
// jest.useFakeTimers()
// axios
// it('Axios Mocked', () => {

//     // expect(.isMocked).toBeM
//     console.log(axios)
// });
describe("test home getinitialStories redux saga", () => {
    it('call Init single Item', () => {
        let data: any = { data: [12345] }
        mockedAxios.get.mockReturnValueOnce(data)
        return expectSaga(getStoryIds, getinitialStories(URL_GLOBAL.TOP_STORY_URL))
            .withReducer(() => store.getState())
            .call(axios.get, URL_GLOBAL.BASE_URL + URL_GLOBAL.TOP_STORY_URL)
            .put(updateHomeStory([{ id: 12345, isLoading: true }]))
            .put(updateStoryLeft([]))
            .run();
    });

    it('call Init multi item', () => {
        let data: any = { data: [12345, 231, 33] }
        mockedAxios.get.mockReturnValueOnce(data)
        return expectSaga(getStoryIds, getinitialStories(URL_GLOBAL.TOP_STORY_URL))
            .withReducer(() => store.getState())
            .call(axios.get, URL_GLOBAL.BASE_URL + URL_GLOBAL.TOP_STORY_URL)
            .put(updateHomeStory([{ id: 12345, isLoading: true }, { id: 231, isLoading: true }, { id: 33, isLoading: true }]))
            .put(updateStoryLeft([]))
            .run();
    });
})


describe("test home getItemsDetail redux saga", () => {
    it('call getItemsDetail', () => {
        let data: any = {
            data: {
                "by": "dhouston",
                "descendants": 71,
                "id": 12345,
                "kids": [8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876],
                "score": 111,
                "time": 1175714200,
                "title": "My YC app: Dropbox - Throw away your USB drive",
                "type": "story",
                "url": "http://www.getdropbox.com/u/2/screencast.html"
            }
        }
        mockedAxios.get.mockReturnValueOnce(data)
        return expectSaga(getItemsDetail, { callback: updateStoryDetail.type, id: 12345 })
            .withReducer(() => store.getState())
            .call(axios.get, "https://hacker-news.firebaseio.com/v0/item/12345.json")
            .put(updateStoryDetail(
                {
                    data: {
                        "by": "dhouston",
                        "descendants": 71,
                        "id": 12345,
                        "kids": [8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876],
                        "score": 111,
                        "time": 1175714200,
                        "title": "My YC app: Dropbox - Throw away your USB drive",
                        "type": "story",
                        "url": "http://www.getdropbox.com/u/2/screencast.html"
                    }
                }
            )).run();
    });


})
