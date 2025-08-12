import AsyncStorage from "@react-native-async-storage/async-storage";
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export async function getFromStorage(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function saveToStorage(key: string, data: object | string) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch {}
}
