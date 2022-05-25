

export const overlayNavigationOptions = () => {
    return {
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        gestureEnabled: false,
        cardStyleInterpolator: ({ current, next, layouts }: any) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateY: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.height, 0]
                            })
                        }
                    ]
                },
                overlayStyle: {
                    opacity: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.5]
                    })
                }
            };
        }
    }
}
