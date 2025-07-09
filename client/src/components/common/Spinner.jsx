const Loader = ({ size = "w-12 h-12", message = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[200px] gap-3">
      <div
        className={`border-4 border-blue-500 border-t-transparent rounded-full animate-spin ${size}`}
      ></div>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default Loader;
