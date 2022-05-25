import React, { useEffect, useState } from "react"
import { Button, View, VirtualizedList } from "react-native"
import { TopStoryView } from "../component/story/TopStoryView"
import { URL_GLOBAL } from "../constant/url.constant"
import { updateHomeLoading } from "../redux/homeReducer"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { getinitialStories, getNextStories } from "../saga/story.saga"



export function HomeScreen() {
    const dispatch = useAppDispatch()
    const { isLoading, stories } = useAppSelector((state) => state.story)
    const [curStories, setCurStories] = useState(URL_GLOBAL.TOP_STORY_URL)
    useEffect(() => {
        dispatch(updateHomeLoading(true))
        dispatch(getinitialStories(curStories))
    }, [curStories])

    const getItemCount = (data: any) => data.length;
    const getItem = (data: any, index: number) => {
        return data[index]
    }

    const endReached = () => {
        dispatch(getNextStories())
    }

    return <>

        <View style={{ paddingHorizontal: 10, paddingVertical: 5, flexDirection: "row", justifyContent: "space-between" }}>
            <Button testID={"top-story-btn"} title="Top Stories" onPress={() => {
                setCurStories(URL_GLOBAL.TOP_STORY_URL)
            }} />
            <Button testID={"new-story-btn"} title="New Stories" onPress={() => {
                setCurStories(URL_GLOBAL.NEW_STORY_URL)
            }} />
            <Button testID={"best-story-btn"} title="Best Stories" onPress={() => {
                setCurStories(URL_GLOBAL.BEST_STORY_URL)
            }} />
        </View>
        <VirtualizedList
            testID={"virtual-list-story"}
            data={stories}
            initialNumToRender={4}
            renderItem={({ item, index }: any) => <>
                <TopStoryView data={item} /></>}
            keyExtractor={item => item.id}
            getItemCount={getItemCount}
            getItem={getItem}
            onEndReached={endReached}
            refreshing={isLoading}
            onRefresh={() => {
                dispatch(updateHomeLoading(true))
                dispatch(getinitialStories(curStories))
            }}
            contentInset={{ bottom: 30 }}
        />

    </>
}