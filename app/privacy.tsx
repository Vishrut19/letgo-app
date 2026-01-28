import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, DeviceMobile, Shield, Trash, WifiSlash } from "phosphor-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Privacy() {
    const router = useRouter();

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
                <Text className="text-xl font-bold text-primary tracking-tight">Privacy & Security</Text>
            </View>

            <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                <View className="bg-white/5 p-6 rounded-2xl mb-6 border border-white/10">
                    <View className="items-center mb-8 mt-2">
                        <View className="w-16 h-16 bg-white/5 rounded-full items-center justify-center mb-4 border border-white/10">
                            <Shield size={32} color="#6C7BFF" weight="light" />
                        </View>
                        <Text className="text-xl font-bold text-primary tracking-tight">Your data is yours</Text>
                    </View>

                    <Text className="text-secondary text-base leading-7 mb-8 text-center">
                        LetGo is designed with your privacy as the absolute priority.
                    </Text>

                    <View className="space-y-6">
                        <PrivacyPoint
                            icon={DeviceMobile}
                            title="Local Storage Only"
                            desc="All your entries are stored locally on your device. Nothing is uploaded to any cloud server."
                        />
                        <PrivacyPoint
                            icon={WifiSlash}
                            title="No Internet Required"
                            desc="The app works completely offline. We don't track your usage or collect analytics."
                        />
                        <PrivacyPoint
                            icon={Trash}
                            title="Control Only You Have"
                            desc="Since data is local, deleting the app will delete all your entries permanently."
                        />
                    </View>
                </View>

                <Text className="text-secondary/50 text-center text-xs pb-10 uppercase tracking-widest">
                    LetGo v1.0.0 • Built for peace of mind
                </Text>
            </ScrollView>
        </LinearGradient>
    );
}

function PrivacyPoint({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
    return (
        <View className="flex-row">
            <View className="mr-4 mt-1 bg-white/5 p-2 rounded-lg h-10 w-10 items-center justify-center border border-white/5">
                <Icon size={20} color="#9A9CAA" />
            </View>
            <View className="flex-1">
                <Text className="text-primary font-bold text-base mb-1 tracking-wide">{title}</Text>
                <Text className="text-secondary text-sm leading-6">{desc}</Text>
            </View>
        </View>
    );
}
