import React from "react";
import Header from "./Header";
import Info from "../componenets/Info";
import { useLocation, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../componenets/Loader";
import Compiler from "./Compiler";

export default function Problems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const problemId = searchParams.get("problemid");
  const [problem, setProblem] = useState({});
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProblem = async () => {
      const url = API_BASE_URL +"/" + problemId;
      let response;
      try {
        response = await axios.get(url);
        console.log(response);
      } catch (error) {
        console.log(error);
      }

      setProblem(response.data.problem);
    };
    fetchProblem();
  }, []);

  console.log(problem);

  return problem ? (
    <div className="flex justify-center w-full">
      <div className="w-4/5 flex justify-center" > 
        <Info problem={problem} />
      </div>
    </div>
  ) : (
    <Loader />
  );
}
