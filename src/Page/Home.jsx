import React, { useEffect, useState } from "react";
import { getAllProblems, fetchProblems } from "../appwrite/config";
import { Question } from "../components/Question";
import { ChevronLeft, ChevronRight } from "lucide-react";
export const Home = () => {
	const [allProblems, setAllProblems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [search, setSearch] = useState("");
	useEffect(() => {
		if (search.length > 0)
			fetchProblems(search, (currentPage - 1) * 10, 10).then(
				({ totalDocs, allProblems }) => {
					setAllProblems(allProblems);
					const totalPages = Math.ceil(totalDocs / 10);
					setTotalPage(totalPages);
				}
			);
		else {
			getAllProblems((currentPage - 1) * 10, 10).then(
				({ totalDocs, allProblems }) => {
					setAllProblems(allProblems);
					const totalPages = Math.ceil(totalDocs / 10);
					setTotalPage(totalPages);
				}
			);
		}
	}, [search, currentPage]);
	const handleNextPage = () => {
		if (currentPage < totalPage) {
			setCurrentPage((prev) => prev + 1);
		}
	};
	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};
	useEffect(() => {
		if (search.length > 0) return;
		getAllProblems((currentPage - 1) * 10, 10).then(
			({ totalDocs, allProblems }) => {
				setAllProblems(allProblems);
				const totalPages = Math.ceil(totalDocs / 10);
				setTotalPage(totalPages);
			}
		);
	}, [currentPage]);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-gray-500 p-5">
			<Message />
			<h1 className="text-3xl font-bold mb-4">All Premium Problems</h1>
			<input
				type="text"
				className="w-full focus:outline-none focus:ring-3 focus:ring-emerald-600 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-md placeholder:text-gray-500 text-gray-300"
				placeholder="Search company..."
				onChange={(e) =>
					setTimeout(() => setSearch(e.target.value), 1000)
				}
			/>

			<div className="w-full">
				{allProblems.map((problem, idx) => (
					<Question problem={problem} key={idx} />
				))}
			</div>
			<div className="flex justify-center items-center">
				<button
					onClick={handlePrevPage}
					className={`mx-2 px-2 md:px-4 py-0.5 md:py-1.5 flex items-center justify-center bg-gray-800/90  rounded-md hover:bg-gray-700
                                                ${
													currentPage === 1
														? " opacity-50 cursor-not-allowed"
														: "cursor-pointer"
												}`}
				>
					<ChevronLeft className="mr-1.5" />
					<span>Previous</span>
				</button>
				<span className="mx-2 text-gray-200">
					Page {currentPage} of {totalPage}
				</span>
				<button
					onClick={handleNextPage}
					className={`mx-2 px-2 md:px-4 py-0.5 md:py-1.5 flex items-center justify-center bg-gray-800/90  rounded-md hover:bg-gray-700 ${
						currentPage === totalPage
							? " opacity-50 cursor-not-allowed"
							: "cursor-pointer"
					} `}
				>
					<span>Next</span>
					<ChevronRight className="mr-1.5" />
				</button>
			</div>
		</div>
	);
};

function Message() {
	return (
		<div className="bg-yellow-100 flex flex-row gap-2 text-yellow-800 p-4 rounded-lg mb-4">
			Note:
			<div className="">
				<p className="text-lg font-semibold">
					This website is under development and temporary available
					for premium question access{" "}
				</p>
				<p>
					If anyone can help with testcase generation, please Mail us
					at{" "}
					<a
						className="text-blue-600 underline"
						href="mailto:support@nextleet.com"
					>
						Email Us
					</a>
				</p>
			</div>
		</div>
	);
}
