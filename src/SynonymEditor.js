import React, { Component } from "react";
import { Editor } from "slate-react";
import styled from "@emotion/styled";

const StyledEditor = styled.div`
  margin: 0 auto;
  max-width: 960px;
  .Editor {
    margin-top: 15px;
    padding: 25px;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.9rem;
    background-color: #f8faf9;
    color: #585f65;
    border: 1px solid #dadddf;
    border-radius: 3px;
  }
`;

export default class SynonymEditor extends Component {}
