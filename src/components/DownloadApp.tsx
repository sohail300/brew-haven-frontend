const DownloadApp = () => {
  return (
    <div className="bg-stone-200 w-full p-8 sm:px-20 lg:px-56">
      <div className="flex flex-col justify-between sm:flex-row sm:justify-center sm:items-center">
        <div className="flex flex-col mb-8 sm:mb-0 sm:w-1/2 px-2">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-950 opacity-75">
            For better experience, download
            <span className="ml-2">the app now</span>
          </h2>
        </div>
        <div className="flex flex-row items-center justify-between sm:w-2/4">
          <img
            src="./play_store.png"
            alt="play-store"
            className="w-2/4 h-auto cursor-pointer mx-1 lg:mx-2"
          />
          <img
            src="./app_store.png"
            alt="app-store"
            className="w-2/4 h-auto cursor-pointer mx-1 lg:mx-2"
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
