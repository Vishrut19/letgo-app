import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Read() {
    const router = useRouter();
    const params = useLocalSearchParams<{ date: string; text: string; words: string }>();

    const { date, text, words } = params;

    return (
        <LinearGradient
            colors={["#1c1e26", "#0f1021"]}
            style={{ flex: 1, paddingTop: 60 }}
        >
            <View className="flex-row items-center mb-6 px-6">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-3 bg-white/5 rounded-full border border-white/10 mr-4"
                >
                    <ArrowLeft size={20} color="#9A9CAA" />
                </TouchableOpacity>
                <View>
                    <Text className="text-secondary text-xs uppercase tracking-widest opacity-70 mb-1">Entry On</Text>
                    <Text className="text-primary font-bold text-lg">
                        {new Date(date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
                    </Text>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <View className="bg-white/5 p-8 rounded-3xl min-h-[400px] border border-white/10 shadow-lg">
                    <Text className="text-primary text-xl leading-9 tracking-wide font-normal" style={{ fontFamily: 'System' }}>
                        {text}
                    </Text>
                </View>

                <View className="mt-8 mb-12 items-center">
                    <Text className="text-primary text-sm font-medium mb-1">Written earlier</Text>
                    <Text className="text-secondary text-xs">Subtle reminder that this moment has passed.</Text>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
