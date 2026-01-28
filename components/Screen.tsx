import { clsx, type ClassValue } from "clsx";
import React from "react";
import { Platform, StatusBar, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ScreenProps extends ViewProps {
    children: React.ReactNode;
    safeArea?: boolean;
    className?: string;
}

export const Screen: React.FC<ScreenProps> = ({
    children,
    safeArea = true,
    className,
    ...props
}) => {
    const Container = safeArea ? SafeAreaView : View;

    return (
        <Container
            className={cn("flex-1 bg-bg", className)}
            style={{ paddingTop: safeArea && Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
            {...props}
        >
            <StatusBar barStyle="light-content" backgroundColor="#121318" />
            <View className="flex-1 px-6">{children}</View>
        </Container>
    );
};
