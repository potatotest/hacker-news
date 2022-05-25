import React from "react";
import { Text } from "react-native";

export default function Header({ children }: {
    children: string
}) {
    return (
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {children}
        </Text>)
}