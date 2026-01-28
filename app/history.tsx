import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { ArrowLeft, BookOpen, CaretRight } from "phosphor-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { Entry, getEntries } from "../lib/storage";

export default function History() {
    const router = useRouter();
    const [entries, setEntries] = useState<Entry[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
        const data = await getEntries();
        setEntries(data);
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const getDayLabel = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString(undefined, { weekday: 'long' });
        }
    };

    const renderItem = ({ item }: { item: Entry }) => (
        <TouchableOpacity
            onPress={() => router.push({ pathname: "/read", params: { ...item } })}
            activeOpacity={0.7}
            className="border-b border-white/5 py-5 mx-6 flex-row justify-between items-center"
        >
            <View className="flex-row items-center space-x-2">
                <Text className="text-white text-base font-medium tracking-wide">
                    {getDayLabel(item.date)}
                </Text>
                <Text className="text-secondary text-lg font-normal mx-2">
                    {item.words} words
                </Text>
            </View>
            <CaretRight size={16} color="#3f3f46" weight="bold" />
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={["#1c1e26", "#0f1021"]}
            style={{ flex: 1, paddingTop: 60 }}
        >
            <View className="flex-row items-center mb-2 px-6">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-3 -ml-3"
                >
                    <ArrowLeft size={24} color="#9A9CAA" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-primary tracking-tight">Past days</Text>
            </View>

            <FlatList
                data={entries}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="items-center justify-center mt-32 px-10">
                        <BookOpen size={48} color="#6C7BFF" weight="light" />
                        <Text style={{ color: '#ECECF1' }} className="mt-6 text-center text-lg font-medium">No entries yet.</Text>
                        <Text style={{ color: '#9A9CAA' }} className="text-sm mt-2 text-center leading-5">Start writing to capture your thoughts.</Text>
                    </View>
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6C7BFF" />
                }
            />
        </LinearGradient>
    );
}
