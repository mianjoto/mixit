import Skeleton, { SkeletonProps } from "react-loading-skeleton";

interface WithSkeletonProps {
  content: React.JSX.Element | string | null | React.ReactNode | undefined;
  skeletonProps?: SkeletonProps;
}

const WithSkeleton = ({ content, skeletonProps }: WithSkeletonProps) => {
  // Content is loading
  if (content === undefined) {
    return <Skeleton {...skeletonProps} />;
  }

  // Content has no data
  if (content === null) {
    // TODO: Replace with Radix's VisuallyHidden component
    return (
      <span aria-description="No data provided" className="hidden">
        No data provided
      </span>
    );
  }

  return content;
};

export default WithSkeleton;
