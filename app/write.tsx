import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { X } from "phosphor-react-native";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { saveEntry } from "../lib/storage";

export default function Write() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

    const handleSave = async () => {
        if (!text.trim()) {
            return;
        }

        setIsSaving(true);
        try {
            await saveEntry(text);
            // Small delay for UX
            setTimeout(() => {
                router.replace("/done");
            }, 500);
        } catch (error) {
            Alert.alert("Error", "Failed to save your thoughts. Please try again.");
            setIsSaving(false);
        }
    };

    return (
        <LinearGradient
            colors={["#1c1e26", "#0f1021"]}
            style={{ flex: 1, paddingHorizontal: 24, paddingTop: 60 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                {/* Header */}
                <View className="flex-row justify-between items-center py-4 mb-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-3 bg-white/5 rounded-full border border-white/10"
                    >
                        <X size={20} color="#9A9CAA" />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text className="text-white text-lg font-bold tracking-wide">
                            Today
                        </Text>
                        <Text className="text-secondary text-xs font-medium tracking-wide uppercase opacity-70">
                            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </Text>
                    </View>
                    <View className="w-10" />
                </View>

                {/* Input Area */}
                <View className="flex-1 mt-4">
                    <TextInput
                        className="flex-1 text-primary text-xl leading-9"
                        placeholder="What feels heavy right now?"
                        placeholderTextColor="#6B7C95"
                        multiline
                        textAlignVertical="top"
                        value={text}
                        onChangeText={setText}
                        autoFocus
                        style={{ fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif' }}
                    />
                </View>

                {/* Footer / Action Bar */}
                <View className="py-6 flex-row justify-between items-center border-t border-white/10 mt-4">
                    <Text className="text-secondary text-sm font-medium">
                        {wordCount} {wordCount === 1 ? 'word' : 'words'}
                    </Text>

                    {text.trim() ? (
                        <TouchableOpacity
                            disabled={isSaving}
                            onPress={handleSave}
                            className="px-8 py-4 rounded-full bg-accent"
                            style={
                                Platform.OS === "ios"
                                    ? {
                                        shadowColor: "#6C7BFF",
                                        shadowOffset: { width: 0, height: 8 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 16,
                                    }
                                    : { elevation: 8 }
                            }
                        >
                            <Text className="font-bold tracking-wide text-white">
                                {isSaving ? "Letting go..." : "Let It Go"}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            disabled
                            className="px-8 py-4 rounded-full bg-surface border border-white/5"
                        >
                            <Text className="font-bold tracking-wide text-dim">
                                Let It Go
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
