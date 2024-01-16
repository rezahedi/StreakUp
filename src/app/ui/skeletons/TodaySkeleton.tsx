import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function TodaySkeleton()
{
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444444">
      <div className="flex gap-4 w-full">
        <div className="w-16">
          <Skeleton circle width={64} />
        </div>
        <div className="grow">
          <Skeleton count={1} height={30} width={50} />
          <Skeleton count={1} height={20} width={150} />
          <Skeleton count={1} height={20} width={100} />
        </div>
      </div>
    </SkeletonTheme>
  );
}
