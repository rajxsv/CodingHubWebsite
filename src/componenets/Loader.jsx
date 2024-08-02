import React from "react";
import { LineWave } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <div className="flex flex-col justify-center items-center overflow-clip h-lvh w-full">
        <h1> Since I am using Free tier for Backend Service , it may take 2-5 minutes for the first call to start the
          server, Kindly wait </h1>
        <LineWave
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
        />
      </div>
    </>
  );
}
