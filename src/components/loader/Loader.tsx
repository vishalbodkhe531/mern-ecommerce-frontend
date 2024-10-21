function Loader() {
  return <div>loading...</div>;
}

export default Loader;

interface skeletonProps {
  width?: string;
  length?: number;
}

export const Skeleton = ({ width = "unset", length = 3 }: skeletonProps) => {
  const skeleton = Array.from({ length }, (_, idx) => (
    <div className="skeleton-shape" key={idx}></div>
  ));

  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeleton}
    </div>
  );
};
