import {Grid, styled} from "@mui/joy";
import {Button, TextField} from "@mui/material";

export const RootGrid = styled(Grid)`
  margin: 32px 32px 0 32px;
`;

export const LastGridItem = styled(Grid)`
  margin-left: auto;
  width: auto;
`;

export const AssignNotebookContainer = styled(Grid)`
  margin-left: 10px;
  width: auto;
`;

export const FullWidthTextField = styled(TextField)`
  width: 100%;
`;

export const FullGridButton = styled(Button)`
  width: 100%;
  height: 100%;
  margin-left: 8px;
`;

export const NotebookAddButtonContainer = styled(Grid)`
  height: 100%;
`;

export const NotebookBorderContainer = styled(Grid)`
    border: 1px solid black;
  border-radius: 10px;
  margin: 0 0 4px 0;
`;

export const NoteBorderContainer = styled(Grid)`
    border: 1px solid black;
  border-radius: 10px;
  margin: 0 0 16px 32px;
`;

export const BackgroundColorContainer = styled(Grid)`
    background-color: #61dafb;
  padding: -32px;
`;

export const MarginedHeader = styled("h4")`
    margin-left: 8px;
`;

export const MarginedSmallHeader = styled("h5")`
    margin-left: 8px;
`;

export const SmallText = styled("span")`
    font-size: small;
`;

export const DeleteTagButton = styled(Button)`
  margin: 0;
  padding: -30px;
  max-width: 10px;
`;

export const MarginedContainer = styled(Grid)`
    margin-left: 8px;
`;