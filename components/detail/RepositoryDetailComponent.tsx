import CountCard from "./CountCard";
import DetailInfo from "./DetailInfo";

export default function RepositoryDetailComponent() {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 p-4 lg:w-2/3 w-full">
      <div className="col-span-4 row-span-2">
        <DetailInfo
          repositoryFullName="example/repo"
          langueage="JavaScript"
          iconUrl="https://avatars.githubusercontent.com/u/51810157?v=4"
        />
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4 row-span-1">
        <CountCard count={100} title="Star" />
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4 row-span-1">
        <CountCard count={50} title="Fork" />
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4 row-span-1">
        <CountCard count={200} title="Fork数" />
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4 row-span-1">
        <CountCard count={300} title="issue数" />
      </div>
    </div>
  );
}