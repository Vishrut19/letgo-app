import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { ArrowRight, MoonStars } from "phosphor-react-native";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-bg">
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={["#1c1e26", "#0f1021"]}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <View className="flex-1 justify-center items-center w-full px-8">
                    <View className="items-center mb-16 space-y-4">
                        <View
                            className="bg-white/5 p-6 rounded-full border border-white/10 mb-6"
                            style={{
                                shadowColor: "#6C7BFF",
                                shadowOffset: { width: 0, height: 10 },
                                shadowOpacity: 0.2,
                                shadowRadius: 20,
                                elevation: 10
                            }}
                        >
                            <MoonStars size={48} color="#6C7BFF" weight="light" />
                        </View>
                        <Text className="text-5xl font-bold text-primary tracking-tight text-center">
                            LetGo
                        </Text>
                        <Text className="text-secondary text-lg text-center font-medium leading-7 max-w-[260px]">
                            A quiet place for your thoughts
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => router.push("/write")}
                        className="w-full max-w-xs"
                    >
                        <LinearGradient
                            colors={["#6C7BFF", "#5a68e0"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ borderRadius: 9999, paddingVertical: 18, alignItems: "center", shadowColor: "#6C7BFF", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16 }}
                        >
                            <View className="flex-row items-center space-x-2">
                                <Text className="text-white text-xl font-bold tracking-wide mr-2">
                                    Start Writing
                                </Text>
                                <ArrowRight size={20} color="white" weight="bold" />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center space-x-16 w-full pb-16 absolute bottom-0">
                    <Link href="/history" asChild>
                        <TouchableOpacity className="py-4 px-6 active:opacity-50">
                            <Text className="text-secondary text-sm font-medium tracking-wide">Past Days</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/privacy" asChild>
                        <TouchableOpacity className="py-4 px-6 active:opacity-50">
                            <Text className="text-secondary text-sm font-medium tracking-wide">Privacy</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </LinearGradient>
        </View>
    );
}
