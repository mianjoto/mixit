import Skeleton, { SkeletonProps } from "react-loading-skeleton";

interface WithSkeletonProps {
  content: React.JSX.Element | string | null | undefined;
  skeletonProps?: SkeletonProps;
}

const WithSkeleton = ({ content, skeletonProps }: WithSkeletonProps) => {
  // Content is loading
  if (content === undefined) {
    return <Skeleton {...skeletonProps} />;
  }

  // Content has no data
  else if (content === null) {
    // TODO: Replace with Radix's VisuallyHidden component
    return (
      <span aria-description="No data provided" className="hidden">
        No data provided
      </span>
    );
  } else return content;
};

export default WithSkeleton;
