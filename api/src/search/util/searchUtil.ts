export const queryToTsQueryWithAnd = (query: string) => {
  return query.replaceAll(' ', ' & ');
};

export const queryToTsQueryWithOr = (query: string) => {
  return query.replaceAll(' ', ' | ');
};
