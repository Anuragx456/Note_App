export type Note = {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  headerBgImage: string;
};

export const defaultHeaderBgImage =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&fit=crop&q=80";

export const notes: Note[] = [
  {
    id: "1",
    title: "Daily Plan",
    body: "Review today's tasks, finish the mobile UI, and organize notes for tomorrow. Keep the most important writing work in the morning.",
    timestamp: "May 12, 2026 at 10:30 AM",
    headerBgImage:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Project Ideas",
    body: "Build a simple habit tracker, improve the notes app editor, and create reusable card components for future mobile screens.",
    timestamp: "May 11, 2026 at 6:15 PM",
    headerBgImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Reading Notes",
    body: "Good writing tools reduce friction. The editor should feel quiet, predictable, and spacious enough for long-form drafting.",
    timestamp: "May 10, 2026 at 9:05 AM",
    headerBgImage:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Meeting Summary",
    body: "Finalize the screen structure, use readable typography, and keep controls easy to reach on both phones and tablets.",
    timestamp: "May 9, 2026 at 2:40 PM",
    headerBgImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&auto=format&fit=crop&q=80",
  },
];
