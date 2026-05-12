# Note App

A React Native notes app built with Expo. It includes a searchable notes list, a note editor, dark/light theme control, and local image selection for note headers.

## Preview

![Notes app mobile screen](assets/Screenshots/Mobile%20Screen.png)

<video controls playsinline src="assets/Screenshots/Mobile%20Screen.mp4" style="width:100%;max-width:720px;border-radius:12px;"></video>

## Features

- Notes listing with `FlatList`
- Search and filter notes
- Create and edit notes
- Delete existing notes
- Custom header images from device files
- Dark and light theme support
- Responsive layout for phones and tablets

## Run Locally

```bash
npm install
npm run web
```

Or start the native Expo dev server:

```bash
npx expo start
```

## Project Structure

- `src/app` for screens
- `src/components` for reusable UI
- `src/context` for shared notes state
- `src/data` for initial note data

