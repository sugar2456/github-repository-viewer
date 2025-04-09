export default function CountCard({ count, title }: { count: number; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold pb-4">{title}</h2>
      <p className="text-3xl font-semibold">{count}</p>
    </div>
  );
}