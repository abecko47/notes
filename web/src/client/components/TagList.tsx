import React, { useState } from "react";
import { TagAction, TagAffinity, TagDto } from "../../const/dto/tag.dto";
import { Button, TextField } from "@mui/material";
import { useTagsObserver } from "../../ctx/tag-update/context";
import { useApi } from "../../ctx/api/context";
import { Grid } from "@mui/joy";
import { DeleteTagButton, LastGridItem, MarginedContainer, SmallText } from "./StyledComponents";

export type TagsListArgs = {
  tags: TagDto[];
  tagAffinity: TagAffinity;
  noteId?: string;
  notebookId?: string;
};

export default function TagList({ tags, noteId, notebookId, tagAffinity }: TagsListArgs) {
  const { notify } = useTagsObserver();
  const { editNoteAndTag, editNotebookAndTag } = useApi();

  const [newTagName, setNewTagName] = useState("");

  if (noteId === undefined && notebookId === undefined) {
    return <></>;
  }

  const editTag = async (
    tagName: string,
    action: TagAction,
    noteId?: string,
    notebookId?: string,
  ) => {
    if (noteId !== undefined) {
      const result = await editNoteAndTag({
        tagName: tagName,
        action,
        noteId,
      });

      if (!result) {
        alert("Something went wrong.");
        return;
      }

      notify();
    }

    if (notebookId !== undefined) {
      const result = await editNotebookAndTag({
        tagName: tagName,
        action,
        notebookId,
      });

      if (!result) {
        alert("Something went wrong.");
        return;
      }

      notify();
    }
  };

  return (
    <Grid spacing={1} container xs={12}>
      {tags.length > 0 && (
        <Grid xs={12}>
          <SmallText>{`This ${tagAffinity} tags`}</SmallText>
        </Grid>
      )}

      <MarginedContainer container xs={12}>
        {tags.map((tag) => {
          return (
            <Grid key={tag.name} container xs={12} alignItems={"center"}>
              <Grid xs={6}>
                <SmallText>#{tag.name}</SmallText>
              </Grid>
              <LastGridItem xs={6}>
                <DeleteTagButton
                  size={"small"}
                  name={"remove-tag"}
                  variant={"contained"}
                  color={"error"}
                  onClick={() => {
                    editTag(tag.name, "remove", noteId, notebookId);
                  }}
                >
                  -
                </DeleteTagButton>
              </LastGridItem>
            </Grid>
          );
        })}
      </MarginedContainer>
      <MarginedContainer alignItems={"center"} container xs={12}>
        <Grid xs={8}>
          <TextField
            type="name"
            label={"Add new tag"}
            value={newTagName}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTagName(e.target.value);
            }}
          />
        </Grid>
        <LastGridItem xs={4}>
          <Button
            name={"add-tag"}
            variant={"contained"}
            onClick={() => {
              editTag(newTagName, "assign", noteId, notebookId);
            }}
          >
            +
          </Button>
        </LastGridItem>
      </MarginedContainer>
    </Grid>
  );
}
