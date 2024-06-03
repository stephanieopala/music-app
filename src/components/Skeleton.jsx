const Skeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-4 space-x-4">
      <div className="h-4 bg-light-gray rounded"></div>
      <div className="h-4 bg-light-gray rounded"></div>
      <div className="h-4 bg-light-gray rounded"></div>
    </div>
  );
};

export default Skeleton;
