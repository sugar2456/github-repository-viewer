import CountCard from "./CountCard";
import DetailInfo from "./DetailInfo";

export default function RepositoryDetailComponent() {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 p-4 w-2/3">
      <div className="col-span-4 row-span-1">
        <DetailInfo
          repositoryFullName="example/repo"
          langueage="JavaScript"
          iconUrl="https://avatars.githubusercontent.com/u/51810157?v=4"
        />
      </div>
      <div className="col-span-1 row-span-1">
        <CountCard count={100} title="Star" />
      </div>
      <div className="col-span-1 row-span-1">
        <CountCard count={50} title="Fork" />
      </div>
      <div className="col-span-1 row-span-1">
        <CountCard count={200} title="Fork数" />
      </div>
      <div className="col-span-1 row-span-1">
        <CountCard count={300} title="issue数" />
      </div>
    </div>
  );
}