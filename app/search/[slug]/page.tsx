import getRepositoryDetail from "@/actions/search/get_repository_detail";
import RepositoryDetailComponent from "@/components/search/repository/RepositoryDetailComponent";

interface SearchPageProps {
  searchParams: {
    repositoryName: string;
    ownerName: string;
  };
}
export default async function Page({
  searchParams
}: SearchPageProps) {
  const params = await searchParams;
  const repositoryName = params.repositoryName;
  const ownerName = params.ownerName;
  const repositoryDetail = await getRepositoryDetail(
    ownerName,
    repositoryName
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <RepositoryDetailComponent
        fullName={repositoryDetail.fullName}
        language={repositoryDetail.language}
        ownerIconUrl={repositoryDetail.ownerIconUrl}
        stars={repositoryDetail.stars}
        watchers={repositoryDetail.watchers}
        forks={repositoryDetail.forks}
        issues={repositoryDetail.issues}
      />
    </div>
  );
}