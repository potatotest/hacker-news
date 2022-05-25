import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, useWindowDimensions, View, VirtualizedList } from "react-native";
import TreeView from "react-native-final-tree-view";
import RenderHTML from "react-native-render-html";
import { useDispatch } from "react-redux";
import Divider from "../component/Divider";
import PostItem from "../component/story/PostItem";
import { StoryLoadingView } from "../component/story/StoryLoadingView";
import { useAppSelector } from "../redux/store";
import { getMoreDetails, getPostDetails } from "../saga/details.saga";
import { getTime } from "../utils/timeUtils";



export default function DetailsScreen({ route }: any) {
    const dispatch = useDispatch()
    const comments = useAppSelector(state => state.comment.comments)


    useEffect(() => {
        dispatch(getPostDetails(route?.params?.data?.kids ?? []))
    }, [])
    const getItemCount = (data: any) => data.length;
    const getItem = (data: any, index: number) => {
        return data[index]
    }

    const { width, height } = useWindowDimensions();
    const renders = ({ item, index }: any) => {
        if (item.isLoading) {
            return <View style={{ height: height * 30 }}>
                <StoryLoadingView></StoryLoadingView>
            </View>
        }

        return <TreeView
            initialExpanded={true}
            data={[item]} // defined above
            renderNode={({ node, level, isExpanded, hasChildrenNodes }: any) => {
                if (!item.data) {
                    return <View>
                        <Text style={{ fontStyle: 'italic' }}>item deleted</Text>
                    </View>
                }

                if (item.data.deleted || item.data.dead) {
                    return <Text style={{ fontStyle: 'italic' }}>item deleted</Text>
                }
                return (
                    <View>
                        <View
                            style={{
                                marginLeft: 10 * level,
                            }}
                        >
                            <View style={{ padding: 5, flexDirection: 'row', justifyContent: "space-between" }}>

                                <Text>{node?.data?.by}</Text>
                                <Text>{getTime(node?.data?.time)}</Text>
                            </View>
                            <View style={{ paddingHorizontal: 10 }}>
                                <RenderHTML
                                    contentWidth={width}
                                    source={{
                                        html: node?.data?.text ?? ""
                                    }}
                                />
                                <View style={{ padding: 5, flexDirection: 'row-reverse', justifyContent: "space-between" }}>
                                    {!isExpanded && hasChildrenNodes && <Text>{`${node?.children.length} Reply`}</Text>}
                                </View>
                                <Divider />
                            </View>
                        </View>
                    </View>
                )
            }}
        />

    }



    const endReached = () => {
        dispatch(getMoreDetails())
    }

    const navigation = useNavigation();
    return (
        <>
            <PostItem storyData={route?.params?.data ?? {}} onLinkPress={(url) => { navigation.navigate("Webview", { url: url }) }}
                onCommentPress={() => { }} />
            <VirtualizedList
                testID={"virtual-list-comment"}
                data={comments}
                initialNumToRender={3}
                renderItem={renders}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                onEndReached={endReached}
                refreshing={false}
                onRefresh={() => {
                    dispatch(getPostDetails(route?.params?.data?.kids ?? []))
                }}
                contentInset={{ bottom: 30 }}
            />
        </>
    );


}