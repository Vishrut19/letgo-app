import AsyncStorage from "@react-native-async-storage/async-storage";

export type Entry = {
  id: string;        // same as date or unique string
  date: string;      // YYYY-MM-DD
  text: string;
  words: number;
};

const STORAGE_KEY = "LETGO_ENTRIES";

/**
 * Get all saved entries
 */
export async function getEntries(): Promise<Entry[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to load entries:", error);
    return [];
  }
}

/**
 * Save or replace today's entry
 */
export async function saveEntry(text: string): Promise<void> {
  try {
    const existingEntries = await getEntries();

    // Use a more precise ID than just date if we want multiple entries per day,
    // but the request implied "daily" or simple thoughts.
    // Let's use ISO string for unique ID to allow multiple entries per day if user wants, 
    // or just 'date' if we want one per day. 
    // Given the "Let Go" nature, maybe multiple times a day is valid.
    // Let's stick to the previous logic: One entry per ID, but let's make ID unique per save 
    // so we don't overwrite checking-in multiple times a day? 
    // Actually, "LetGo" implies writing *now*. 
    // If I write at 10pm and 11pm, I probably want both kept.
    
    const now = new Date();
    const id = now.toISOString(); // Unique ID
    const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD for grouping if needed

    const words = text
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const newEntry: Entry = {
      id: id, 
      date: id, // Keeping date as ISO string for full context, or just YYYY-MM-DD? 
                // The previous code had `id: today` (overwriting). 
                // Let's use full timestamp for ID to allow multiple releases.
      text,
      words,
    };

    // Add new entry at the top
    const updatedEntries = [newEntry, ...existingEntries];

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedEntries)
    );
  } catch (error) {
    console.error("Failed to save entry:", error);
    throw error;
  }
}
