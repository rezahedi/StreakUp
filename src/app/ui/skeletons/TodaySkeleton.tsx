import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function TodaySkeleton()
{
  return (
      <div className="flex gap-4 w-full">
        <div className="w-16">
          <Skeleton circle height={64} />
        </div>
        <div className="grow">
          <Skeleton count={1} height={30} width={150} />
          <Skeleton count={1} height={20} width={250} />
          <Skeleton count={1} height={20} width={200} />
        </div>
      </div>
  );
}
