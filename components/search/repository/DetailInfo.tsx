import Image from "next/image";

export default function DetailInfo({
  repositoryFullName,
  langueage,
  iconUrl,
}: {
  repositoryFullName: string;
  langueage: string;
  iconUrl: string;
}) {
  return (
    <div className="grid grid-cols-3 grid-rows-2 p-4 bg-white shadow-md rounded-lg">
      <Image
        src={iconUrl}
        alt={`${repositoryFullName} icon`}
        width={64}
        height={64}
        className="row-span-2 mx-auto self-center"
      />
      <div className="col-span-2">
        <h2 className="text-3xl font-bold pb-4">{repositoryFullName}</h2>
      </div>
      <div className="col-span-2">
        <p className="text-lg font-semibold">言語: {langueage}</p>
      </div>
    </div>
  );
}
