interface RepositoryDetailResult {
  id: number,
  name: string,
  fullName: string,
  description: string,
  ownerName: string,
  stars: number,
  watches: number,
  forks: number,
  issues: number,
  language: string,
  ownerIconUrl: string,
  createdAt: Date,
  updatedAt: Date
}
export default RepositoryDetailResult;