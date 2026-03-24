# Quest Log
Quest Log

A fantasy-themed productivity app that transforms your to-do list into an adventure. Instead of checking off chores, you complete quests.

"One does not simply finish a task; one completes a quest."
![screenshot of progress](<images/Screenshot 2026-03-22 at 8.51.51 PM.png>)

Overview
Most to-do apps feel like work. The Quest Log is designed to feel like an adventure. It is a functional Study Companion that lives in your browser — built with vanilla HTML, CSS, and JavaScript, and styled with a retro fantasy aesthetic featuring pixel-art fonts, a parchment scroll UI, and an atmospheric forest environment.

Features
✅ Currently Implemented (Stage 1 — The Foundations)

Add Quests — Enter a new task via the input field and add it to the scroll
Delete Quests — Remove completed or unwanted quests from the list
Dynamic List Rendering — Tasks are managed and displayed using JavaScript arrays
Particle Effects — Ambient environmental particles add atmosphere to the scene
Retro Fantasy UI — Pixel-art fonts, parchment/scroll background, and a forest environment backdrop

🔄 Planned (Stage 2 — The Alchemist's Workshop)

The Burning Effect — A custom CSS animation where completed quest text glows red and dissolves character by character, replacing the standard strike-through
Custom Quill Cursor — A themed cursor that interacts with the UI
Quill Movement Animation — The quill animates when new quests are added

🗺️ Planned (Stage 3 — The Open Road)

Environment & Motion — Additional atmospheric effects and game-feel enhancements


Tech Stack
TechnologyUsageHTMLApp structure and layoutCSSStyling, animations, fantasy themeJavaScriptCRUD logic, DOM manipulation, array management

Project Structure
quest-log/
├── index.html        # Main app structure
├── style.css         # Fantasy theme, layout, animations
├── script.js         # Task logic and DOM interactions
└── images/
    ├── background/   # Forest environment image
    └── scroll/       # Scroll image

Setup & Usage
No dependencies or build tools required.

Clone the repository:

bash   git clone https://github.com/daphneblum/quest-log.git

Navigate into the project folder:

bash   cd quest-log

Open index.html in your browser:

bash   open index.html
Or simply double-click index.html in your file explorer.

How It Works
Adding a Quest
Type your task into the input field at the top of the scroll and press the + button (or hit Enter). The task is pushed into a JavaScript array and rendered as a new list item on the scroll.
Deleting a Quest
Each quest has a delete control on the right side. Clicking it removes the item from the array and updates the DOM.
Particle Effects
Ambient particles are generated and animated via CSS/JavaScript to float across the forest scene, adding environmental depth without impacting app performance.

Development Log
DateUpdateStage 1 CompleteCore CRUD functionality, pixel-art UI, particle effects, and forest environment implementedStage 2Burn animation, quill cursor — in progressStage 3Environment motion — planned

Acknowledgements
Base to-do list structure adapted from the tutorial by CSSnippets on YouTube.
![https://www.youtube.com/watch?v=gRkaen6MeQc]
All fantasy theming, visual design, and feature extensions by daphneblum.