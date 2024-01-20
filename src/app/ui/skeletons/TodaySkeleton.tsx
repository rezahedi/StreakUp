import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function TodaySkeleton({count = 1}: {count?: number})
{
  return (
    <div className="flex flex-col gap-6 p-4 my-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="w-[75px]">
            <Skeleton circle width={75} height={75} />
          </div>
          <div className="grow flex flex-col gap-2">
            <Skeleton count={1} height={15} width={60} />
            <Skeleton count={1} height={25} width={250} />
            <div className="flex gap-8">
              <Skeleton count={1} height={15} width={80} />
              <Skeleton count={1} height={15} width={80} />
            </div>
          </div>
          <Skeleton count={1} height={20} width={100} />
        </div>
      ))}
    </div>
  );
}
