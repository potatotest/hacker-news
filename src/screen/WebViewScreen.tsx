import React, { useEffect } from "react"
import { View } from "react-native"
import WebView from "react-native-webview"
import { StoryLoadingView } from "../component/story/StoryLoadingView"



export function WebViewScreen({ route }: any) {
    if (!route.params.url) {
        return <StoryLoadingView></StoryLoadingView>
    }
    return <>
        <View style={{ flexGrow: 1 }}>
            <WebView source={{ uri: route.params.url }} style={{ flexGrow: 1 }} />
        </View>
    </>
}