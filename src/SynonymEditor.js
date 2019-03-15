import React, { Component } from "react";
import { Value } from "slate";
import { Editor } from "slate-react";
import styled from "@emotion/styled";

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

export default class SynonymEditor extends Component {
  state = {
    value: Value.fromJSON(initialValue)
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  render() {
    return (
      <StyledEditor>
        <Editor
          className="Editor"
          value={this.state.value}
          onChange={this.onChange}
          placeholder={"This is going to be awesome!"}
          autoFocus={true}
        />
      </StyledEditor>
    );
  }
}
