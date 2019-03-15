import React from "react";
import styled from "@emotion/styled";

const StyledDropDownMenu = styled("div")`
  display: block;
  padding: 2px 4px;
  position: absolute;
  z-index: 100;
  top: ${props =>
    props.dropDownPosition
      ? props.dropDownPosition.bottom + window.pageYOffset + 4
      : 0}px;
  left: ${props =>
    props.dropDownPosition
      ? props.dropDownPosition.left + window.pageXOffset - 4
      : 0}px;
  margin-top: -2px;
  opacity: 0.8;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.9rem;
  background-color: #f8faf9;
  color: #585f65;
  border: 1px solid #dadddf;
  border-radius: 3px;
`;

const DropDownMenu = ({ currentSynonyms, dropDownPosition, dropDownIndex }) => {
  return (
    <StyledDropDownMenu dropDownPosition={dropDownPosition}>
      {currentSynonyms.map((item, index) =>
        index === dropDownIndex ? (
          <div key={index}>
            <span style={{ fontWeight: "bold" }}>{item}</span>
          </div>
        ) : (
          <div key={index}>{item}</div>
        )
      )}
    </StyledDropDownMenu>
  );
};

export default DropDownMenu;
