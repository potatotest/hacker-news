
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import { BaseNews } from "../../interface/appInterface";
import PostItem from "./PostItem";
import { StoryLoadingView } from "./StoryLoadingView";

export interface TopStoryViewProps {
    data: BaseNews;
}

export function TopStoryView({ data: { data: postData, isLoading } }: TopStoryViewProps) {
    if (isLoading) {
        return <StoryLoadingView />
    }
    //virtual list not updating child attribute, workaround for polloptions


    const getChild = (data: any) => {
        if (data.type == "poll") {
            return <><Text>{`No of Options: ${data?.parts.length}`}</Text></>
        }

        return <></>
    }
    const navigation = useNavigation()
    return (<>
        <PostItem storyData={postData} onLinkPress={(url) => {
            navigation.navigate("Webview", { url: url })
        }} onCommentPress={(data) => {
            navigation.navigate("Details", { data: data })
        }} child={getChild(postData)} />
    </>)
}