import CountCard from "./CountCard";
import DetailInfo from "./DetailInfo";

interface RepositoryDetailComponentProps {
  fullName: string;
  stars: number;
  watchers: number;
  forks: number;
  issues: number;
  language: string,
  ownerIconUrl: string;
}

export default function RepositoryDetailComponent({
  fullName,
  stars,
  forks,
  issues,
  watchers,
  language,
  ownerIconUrl,
}: RepositoryDetailComponentProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 p-4 lg:w-2/3 w-full">
      <div className="col-span-4 row-span-2">
        <DetailInfo
          repositoryFullName={fullName}
          langueage={language}
          iconUrl={ownerIconUrl}
        />
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4 row-span-1">
        <CountCard count={stars} title="Star" />
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4 row-span-1">
        <CountCard count={watchers} title="Watcher数" />
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4 row-span-1">
        <CountCard count={forks} title="Fork数" />
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4 row-span-1">
        <CountCard count={issues} title="issue数" />
      </div>
    </div>
  );
}