class RepositoryDetailResult {
  constructor(
    public id: number,
    public name: string,
    public fullName: string,
    public description: string,
    public ownerName: string,
    public stars: number,
    public forks: number,
    public issues: number,
    public language: string,
    public ownerIconUrl: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
export default RepositoryDetailResult;