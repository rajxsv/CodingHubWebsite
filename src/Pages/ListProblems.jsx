import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {GreenAlert} from "../componenets/GreenAlert";
import Loader from "../componenets/Loader";
import {useUser} from "../UserContext";

const params = new URLSearchParams(document.location.search);

export default function NewListProblems() {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState();
    const [problems, setProblems] = useState();
    const [totalProblems, setTotalProblems] = useState();
    const [page, setPage] = useState(params.get("page") || 1);
    const [pageSize, setPageSize] = useState(10);
    const {user} = useUser();
    const [search, setSearch] = useState(params.get("query"));
    const navigate = useNavigate();
    const url = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // console.log(API_BASE_URL);

    const fetchData = async () => {
        await axios
            .get(
                API_BASE_URL + "/public/problems?page=" +
                String(page) +
                "&pagesize=" +
                String(pageSize),
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                setProblems(response.data.problemsPerPage);
                setTotalProblems(response.data.totalProblems);
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDeleteProblem = async (_id) => {
        try {
            const url = API_BASE_URL + "/user/deleteproblem/" + _id;
            await axios
                .delete(url)
                .then((res) => {
                    setShowAlert(true);
                    setMessage("Problem Deleted");

                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3 * 1000);
                })
                .catch(() => {
                    throw new Error();
                });
        } catch (error) {
            console.log(error);
            alert("There was some issue");
        }
    };

    const makeTag = (tags) => {
        if (tags) {
            let tagsWithoutQuotes = "";
            const n = tags.length;
            for (let i = 0; i < n; i++) {
                tagsWithoutQuotes += tags[i] == '"' ? "" : tags[i];
            }
            return tagsWithoutQuotes.split(" ");
        }
        return "";
    };

    const handleSearch = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:3000/public/search?page=${page}&query=${search}`
            );
            setProblems(data.problemsPerPage);
            setTotalProblems(data.totalProblems);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const load = async () => {
            if (search) {
                await handleSearch();
            } else {
                await fetchData();
            }
        };
        load();
    }, [page]);

    return problems ? (
        <section className="w-4/5 mt-6 mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between w-full">
                    <div className="w-full">
                        <div className="flex w-full justify-between">
                            <h2 className="text-bold mb-5 text-4xl leading-7 font-bold">
                                Problems
                            </h2>
                            <div className="flex gap-7 items-center justify-end">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        id="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="rounded-md"
                                    ></input>
                                    <Link to={`/content/list?page=1&query=${search}`}>
                                        <button
                                            className="bg-black text-white p-3 rounded-md"
                                            onClick={handleSearch}
                                        >
                                            Search
                                        </button>
                                    </Link>
                                </div>
                                <Link to="/content/addProblem">
                                    <button className="bg-black text-white p-3 rounded-md">
                                        Add Problem
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">
                            This is a list of all Problems.
                        </p>
                    </div>
                    <div>{showAlert && <GreenAlert message={message}/>}</div>
                </div>
            </div>
            <div className="mt-6 flex flex-col w-full">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full py-2 align-middle ">
                        <div className="overflow-hidden border border-gray-200">
                            <table className="min-w-full  divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr className=" bg-white m-0 divide-x divide-gray-200">
                                    <th
                                        scope="col"
                                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 "
                                    >
                                        Tag
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                    >
                                        id
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                    >
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                {problems.map((item, index) => {
                                    return (
                                        <tbody
                                            key={index}
                                            className="divide-y divide-gray-200 bg-white"
                                        >
                                        <tr className="divide-x divide-gray-200">
                                            <td className="whitespace-nowrap px-12 py-4">
                                                <div className="text-sm text-gray-900">
                                                    <Link
                                                        key={index}
                                                        to={`/content/problems?problemid=${item._id}`}
                                                        state={{id: item.id}}
                                                        className="bg-1 bg-gray-200 p-2 rounded-md hover:bg-gray-400"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {item.done ? (
                                                    <span
                                                        className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Done
                            </span>
                                                ) : (
                                                    <span
                                                        className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                              Not Done
                            </span>
                                                )}
                                            </td>
                                            <td className="flex justify-between whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                {item.tags &&
                                                    makeTag(item.tags).map((item) => `${item} `)}
                                            </td>
                                            <td>
                                                <p className="flex justify-between whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                    {item.id}
                                                </p>
                                            </td>
                                            <td className="flex justify-evenly">
                                                <Link to={"/content/editProblem"} state={item}>
                                                    <button
                                                        className="mr-3 bg-blue-100 text-blue-900 px-2 p-1 rounded-md">
                                                        Edit
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    );
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="px-5 py-2">Page {page}</div>
                <div className="flex gap-10 justify-end">
                    <Link to={`/content/list?page=${page - 1}`}>
                        {page != 1 && (
                            <button
                                className="bg-black text-white px-5 py-2 rounded-md"
                                onClick={() => setPage(page - 1)}
                            >
                                {"<-"} Prev
                            </button>
                        )}
                    </Link>
                    <Link
                        to={
                            search
                                ? `/content/list?page=${page + 1}&query=${search}`
                                : `/content/list?page=${page + 1}`
                        }
                    >
                        {page < totalProblems / pageSize && (
                            <button
                                onClick={() => setPage(page + 1)}
                                className="bg-black text-white px-5 py-2 rounded-md"
                            >
                                Next {"->"}
                            </button>
                        )}
                    </Link>
                </div>
            </div>

            <div className="flex justify-cḛnter">
                <p>
                    {" "}
                    Showing {problems.length} of {totalProblems} problems{" "}
                </p>
            </div>
        </section>
    ) : (
        <Loader/>
    );
}
