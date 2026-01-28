import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Check } from "phosphor-react-native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function Done() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/");
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <LinearGradient
            colors={["#1c1e26", "#0f1021"]}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 32 }}
        >
            <View className="bg-emerald-500/10 p-10 rounded-full mb-10 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                <Check size={64} color="#34D399" weight="light" />
            </View>

            <Text className="text-4xl font-bold text-primary mb-4 text-center tracking-tight">
                Thoughts Released
            </Text>
            <Text className="text-secondary text-center leading-relaxed text-lg max-w-[280px]">
                You've let it go for today.{"\n"}You don’t need to carry this tonight.
            </Text>
        </LinearGradient>
    );
}
