import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import {
  defaultHeaderBgImage,
  notes as initialNotes,
  type Note,
} from "@/data/notes";

type NoteDraft = {
  id?: string;
  title: string;
  body: string;
  headerBgImage: string;
};

type NotesContextValue = {
  notes: Note[];
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  saveNote: (draft: NoteDraft) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

const formatTimestamp = () =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  useEffect(() => {
    setIsDark(systemColorScheme === "dark");
  }, [systemColorScheme]);

  const saveNote = (draft: NoteDraft) => {
    const timestamp = formatTimestamp();
    const title = draft.title.trim() || "Untitled note";
    const body = draft.body.trim();
    const headerBgImage = draft.headerBgImage.trim() || defaultHeaderBgImage;

    setNotes((currentNotes) => {
      if (draft.id) {
        return currentNotes.map((note) =>
          note.id === draft.id
            ? {
                ...note,
                title,
                body,
                headerBgImage,
                timestamp,
              }
            : note
        );
      }

      const newNote: Note = {
        id: `${Date.now()}`,
        title,
        body,
        headerBgImage,
        timestamp,
      };

      return [newNote, ...currentNotes];
    });
  };

  const deleteNote = (id: string) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
  };

  const value = useMemo(
    () => ({ notes, isDark, setIsDark, saveNote, deleteNote }),
    [isDark, notes]
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("useNotes must be used inside NotesProvider");
  }

  return context;
};
