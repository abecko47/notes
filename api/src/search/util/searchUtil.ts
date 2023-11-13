export const queryToTsQueryWithAnd = (query: string) => {
  const words = query.trim().replace(/\s\s+/g, ' ').trim().split(' ');
  return `${words.join(':* & ')}:*`;
};

export const queryToTsQueryWithOr = (query: string) => {
  const words = query.trim().replace(/\s\s+/g, ' ').trim().split(' ');
  return `${words.join(':* | ')}:*`;
};
