import React from "react";
import { Pressable, Text, View } from "react-native";
import { JobResponse, PollResponse, POST_TYPE, StoryResponse } from "../../interface/base";
import { getTime } from "../../utils/timeUtils";
import Divider from "../Divider";
import Header from "../Header";



export default function PostItem(props: { storyData: JobResponse | StoryResponse | PollResponse | undefined, onLinkPress: (url: string) => void, onCommentPress: (data: JobResponse | StoryResponse | PollResponse) => void, child?: JSX.Element }) {

    const { storyData, onLinkPress, child, onCommentPress } = props;

    if (!storyData) {
        return <></>
    }

    return (
        <>
            <View style={{ padding: 10 }}>
                <Header>{`[${storyData?.type.toUpperCase()}] ${storyData?.title}` ?? ""}</Header>
                {storyData?.url !== undefined && <Pressable onPress={() => {
                    onLinkPress(storyData.url)
                }}>
                    <Text style={{ textDecorationLine: 'underline', margin: 5 }}>{storyData?.url}</Text>
                </Pressable>}
                <View style={{ flexDirection: 'row-reverse', padding: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{getTime(storyData?.time)}</Text>
                        <Text>{` by ${storyData?.by}`}</Text>
                    </View>
                    {child}
                </View>

                {storyData?.descendants !== null && <Pressable onPress={() => {
                    onCommentPress(storyData)
                }}>
                    <View style={{ flexDirection: 'row', backgroundColor: "#d3d3d3", padding: 5, justifyContent: 'space-between' }}>
                        <Text>{` Score: ${storyData?.score}`}</Text>
                        {storyData.type !== POST_TYPE.JOB && <Text>{`${storyData?.descendants} Comments`}</Text>}
                    </View>
                </Pressable>}
            </View>
            <Divider />
        </>)
}