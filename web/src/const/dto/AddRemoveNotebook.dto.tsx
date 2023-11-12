export type AddRemoveNotebookDto = {
  id?: string;
  name: string;
};

export const makeEmptyNotebook = (): AddRemoveNotebookDto => {
  return {
    id: "",
    name: "Uncategorized",
  };
};

export const makeEmptyNotebookForAssign = () => {
  return {
    id: "",
    label: "Uncategorized",
  };
};
