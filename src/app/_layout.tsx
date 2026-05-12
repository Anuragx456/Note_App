import { Stack } from "expo-router";
import { NotesProvider } from "@/context/NotesContext";

export default function RootLayout() {
  return (
    <NotesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </NotesProvider>
  );
}
