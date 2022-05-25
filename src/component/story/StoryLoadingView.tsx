import React from "react";
import { ActivityIndicator, View } from "react-native";
import Divider from "../Divider";



export function StoryLoadingView() {

    return (<>
        <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>
                <ActivityIndicator />
            </View>
            <Divider/>
        </View>
    </>)
}