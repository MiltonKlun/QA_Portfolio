# Proposal: Gamified Bug Enhancements

> **Goal**: Replace or Enhance existing static bugs with "Interactive" and "Entertaining" issues that simulate real-world QA frustrations, ensuring full responsiveness (Mobile/Desktop).

## Current State Analysis
| ID | Current Bug | Type | Rating | Issue |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `[Missing Name]` | Static Text | ⭐ | Boring. Just visual. |
| 2 | `http:///` Link | Broken Link | ⭐⭐ | Classic, but low interaction. |
| 3 | Red Border Icon | Visual Style | ⭐ | Hard to spot on mobile. |
| 4 | `[object Object]` | Data Render | ⭐⭐ | Funny for devs, static for users. |
| 5 | Overflow Text | CSS/Layout | ⭐ | Passive. Depends on screen size. |

## Proposed "Gamified" Bugs

We want bugs that require **User Action** to trigger, rewarding the "Hunter".

### 1. The "Ghost" Button (Replaces Broken Link)
**Concept**: A "Download Resume" or "Contact" button that is *technically* clickable but has a `z-index` issue with an invisible overlay, or requires a **Double Tap**.
-   **Behavior**:
    -   Click 1: Nothing happens (Console: `Uncaught TypeError: stopPropagation`).
    -   Click 2: Works (or triggers the Bug Modal).
-   **Bug Name**: "Event Handler Detached (Race Condition)".
-   **Why Fun**: Simulates the frustration of "I clicked it!" typical in JS-heavy apps.
-   **Mobile**: Works perfectly (Tap... Tap).

### 2. The "Infinite" Spinner (Replaces Red Border/Tech Stack)
**Concept**: "Load More Skills" button in Tech Stack.
-   **Behavior**: User clicks "Load More". A spinner appears. It never stops. After 5 seconds, it maybe times out with `[object Object]`.
-   **Bug Name**: "Async/Await Deadlock".
-   **Why Fun**: Universal pain point. Highly visible.
-   **Mobile**: Very touch-friendly interaction.

### 3. The "Confused" Toggles (Replaces Overflow Text? or New)
**Concept**: A "Filter" or "Sort" dropdown in Projects.
-   **Behavior**: Selecting "React" filters by "Python". Selecting "Python" shows "No Results".
-   **Bug Name**: "State Management Mismatch (Index Error)".
-   **Why Fun**: Shows logic errors rather than just code crashes. "It works, but wrong".
-   **Mobile**: Native dropdowns or custom UI work well.

### 4. The "Unruly" Form (New Section?)
**Concept**: Email input field.
-   **Behavior**: Every time you type a space, it deletes the last character. OR, it forces CAPS LOCK.
-   **Bug Name**: "Input Masking RegExp Fail".
-   **Why Fun**: Interactive "fight" with the UI.

## Recommendation for V1 Upgrade

I recommend implementing **Option 2 (Infinite Spinner)** and **Option 1 (Ghost Button/Double Click)** to replace the static "Red Border" and "Social Link" bugs.

### Plan
1.  **Modify `TechStackSection`**: Add a "Load More" button that hangs.
    -   *Logic*: `useState(isLoading)` that never sets false.
2.  **Modify `SocialLinks`**: Make the LinkedIn button require a double-click to register (using a Ref to track clicks).
    -   *Logic*: First click calls `.preventDefault()`.

This keeps the app responsive while adding "Feel" to the bugs.
