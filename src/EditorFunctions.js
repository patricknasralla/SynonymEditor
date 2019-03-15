export const EditorFunctions = {
  commands: {
    deleteCurrentWord(editor, word) {
      if (word.length > 0) {
        editor
          .moveTo(editor.getCurrentWordStartOffset())
          .moveEndForward(word.length)
          .delete();
      }
    }
  },
  queries: {
    getWordAtSelection(editor) {
      const { value } = editor; //note that we need to pass editor rather than value
      const { startText, selection } = value;
      if (!startText) return "";
      const { text } = startText;
      if (selection.isExpanded) return "";
      const allWords = text.split(" ");
      const currentIndex =
        text.slice(0, selection.start.offset).split(" ").length - 1;
      return allWords[currentIndex];
    },

    getCurrentWordStartOffset(editor) {
      const { value } = editor;
      const { selection, startText } = value;
      if (selection.start.offset > 0) {
        return (
          selection.start.offset -
          startText.text
            .slice(0, selection.start.offset)
            .split(" ")
            .pop().length
        );
      } else {
        return 0;
      }
    },

    getCurrentCursorCoords(editor) {
      const sel = window.getSelection();
      if (!sel) return null;
      const coordinateRange = new Range();
      const offset = editor.getCurrentWordStartOffset();
      if (offset === 0) {
        coordinateRange.setStart(sel.anchorNode, 0);
      } else {
        coordinateRange.setStart(
          sel.anchorNode,
          offset > sel.anchorOffset ? sel.anchorOffset : offset
        );
      }
      return coordinateRange.getBoundingClientRect();
    }
  }
};
