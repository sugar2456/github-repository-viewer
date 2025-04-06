class SearchResult {
  constructor(
    public id: number,
    public repositoryName: string,
    public repositoryFullName: string,
    public description: string,
    public ownerIconUrl: string,
  ) {}
}
export default SearchResult;