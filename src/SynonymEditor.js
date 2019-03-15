import React, { Component } from "react";
import { Value } from "slate";
import { Editor } from "slate-react";
import styled from "@emotion/styled";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import thesaurus from "thesaurus";
import isHotKey from "is-hotkey";

import { EditorFunctions } from "./EditorFunctions";
import DropDownMenu from "./DropDownMenu";
import initialValue from "./initialValue.json";

const StyledEditor = styled.div`
  margin: 0 auto;
  max-width: 960px;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.9rem;
  .Editor {
    margin-top: 15px;
    padding: 25px;
    background-color: #f8faf9;
    color: #585f65;
    border: 1px solid #dadddf;
    border-radius: 3px;
  }
`;

const plugins = [EditorFunctions];

const searchThesaurus = text => {
  return thesaurus.find(text);
};
const debounceSearch = AwesomeDebouncePromise(searchThesaurus, 500);

export default class SynonymEditor extends Component {
  state = {
    value: Value.fromJSON(initialValue),
    currentWord: "",
    currentSynonyms: [],
    dropDownPosition: null,
    dropDownIndex: 0
  };

  onChange = async ({ value }) => {
    const { editor } = this;
    this.setState({
      value,
      currentWord: editor.getWordAtSelection()
    });

    const { currentWord } = this.state;
    if (currentWord) {
      this.setState({
        currentSynonyms: await debounceSearch(currentWord),
        dropDownPosition: editor.getCurrentCursorCoords()
      });
    } else {
      this.setState({
        currentSynonyms: [],
        dropDownIndex: 0
      });
    }
  };

  onKeyDown = (event, editor, next) => {
    const { currentSynonyms, dropDownIndex, currentWord } = this.state;
    if (currentSynonyms.length <= 0) return next();
    if (isHotKey("up", event)) {
      event.preventDefault();
      if (dropDownIndex > 0)
        this.setState({
          dropDownIndex: dropDownIndex - 1
        });
      return true;
    }
    if (isHotKey("down", event)) {
      event.preventDefault();
      if (dropDownIndex < currentSynonyms.length - 1)
        this.setState({
          dropDownIndex: dropDownIndex + 1
        });
      return true;
    }
    if (isHotKey("enter", event)) {
      event.preventDefault();
      editor
        .deleteCurrentWord(currentWord)
        .insertText(currentSynonyms[dropDownIndex]);
    }
  };

  render() {
    const {
      value,
      currentSynonyms,
      dropDownPosition,
      dropDownIndex
    } = this.state;

    return (
      <StyledEditor>
        <Editor
          ref={editor => (this.editor = editor)}
          className="Editor"
          plugins={plugins}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder={"This is going to be awesome!"}
          autoFocus={false}
        />
        {currentSynonyms.length > 0 ? (
          <DropDownMenu
            currentSynonyms={currentSynonyms.slice(0, 10)}
            dropDownPosition={dropDownPosition}
            dropDownIndex={dropDownIndex}
          />
        ) : null}
      </StyledEditor>
    );
  }
}
