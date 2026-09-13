MEMORY WEBSITE — VS CODE PROJECT

Files:
- index.html  : page structure and all text/quotes
- style.css   : design, fonts, spacing, buttons and responsive layout
- script.js   : photo order, puzzle sequence and page interactions
- photos/     : 25 memory photos + 5 puzzle photos

IMPORTANT — EDITING PHOTOS / PUZZLE
Open script.js. At the very top you will find:

1) memoryPhotoOrder
Change these numbers to change the photo shown on Memory 1 → Memory 25.
Example: [5, 2, 1, ...] means Memory 1 uses photo-05.jpg, Memory 2 uses photo-02.jpg, etc.

2) puzzleCorrectSequence
Change these numbers to change the correct puzzle order.
Example: [3,1,5,2,4] means the correct sequence is puzzle-03 → puzzle-01 → puzzle-05 → puzzle-02 → puzzle-04.

You do NOT need an Arrange Photos button. The photo arrangement is controlled directly from script.js.

TEXT / QUOTES
Edit the text directly in index.html. The existing layout and Next buttons are kept in the template style.

To run:
Open index.html in a browser, or use VS Code Live Server.
