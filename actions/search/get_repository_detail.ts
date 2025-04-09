import RepositoryDetailResult from "@/lib/repositories/responses/repositoryDetailResult";
import GithubApiRepository from "@/lib/repositories/rest_api/githubApiRepository";
import GithubService from "@/lib/services/github_service";

export default async function getRepositoryDetail(
  owner: string,
  repo: string,
): Promise<RepositoryDetailResult> {
  const service = new GithubService(new GithubApiRepository());
  const repositoryDetail = await service.getRepositoryDetails(owner, repo);
  return repositoryDetail;
}