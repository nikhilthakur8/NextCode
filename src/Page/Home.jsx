import { useEffect, useState, useRef, useCallback } from "react";
import { getAllProblems, fetchProblems } from "../appwrite/config";
import { Question } from "../components/Question";
import { ChevronLeft, ChevronRight, Search, Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export const Home = () => {
	const [allProblems, setAllProblems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [search, setSearch] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [loading, setLoading] = useState(true);
	const debounceRef = useRef(null);

	const loadProblems = useCallback(async () => {
		setLoading(true);
		try {
			const skip = (currentPage - 1) * ITEMS_PER_PAGE;
			const result = search.length > 0
				? await fetchProblems(search, skip, ITEMS_PER_PAGE, difficulty)
				: await getAllProblems(skip, ITEMS_PER_PAGE, difficulty);
			setAllProblems(result.allProblems);
			setTotalPage(Math.ceil(result.totalDocs / ITEMS_PER_PAGE) || 1);
		} catch (error) {
			console.error("Error loading problems:", error);
			setAllProblems([]);
			setTotalPage(1);
		} finally {
			setLoading(false);
		}
	}, [search, currentPage, difficulty]);

	useEffect(() => {
		loadProblems();
	}, [loadProblems]);

	const handleSearchChange = (e) => {
		clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			setSearch(e.target.value);
			setCurrentPage(1);
		}, 400);
	};

	const handleDifficultyChange = (e) => {
		setDifficulty(e.target.value);
		setCurrentPage(1);
	};

	const handleNextPage = () => {
		if (currentPage < totalPage) setCurrentPage((p) => p + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage((p) => p - 1);
	};

	return (
		<div className="flex flex-col items-center min-h-screen w-full bg-black text-gray-400 p-5">
			<h1 className="text-3xl font-bold mb-6 text-gray-200">
				All Premium Problems
			</h1>

			<div className="w-full flex flex-col sm:flex-row gap-3 mb-2">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
					<input
						type="text"
						className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder:text-gray-500 text-gray-300"
						placeholder="Search problems..."
						onChange={handleSearchChange}
					/>
				</div>
				<select
					value={difficulty}
					onChange={handleDifficultyChange}
					className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
				>
					<option value="">All Difficulties</option>
					<option value="Easy">Easy</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
			</div>

			<div className="w-full flex-1">
				{loading ? (
					<div className="flex items-center justify-center py-20">
						<Loader2 className="size-8 text-emerald-500 animate-spin" />
					</div>
				) : allProblems.length === 0 ? (
					<div className="text-center py-20 text-gray-500 text-lg">
						No problems found.
					</div>
				) : (
					allProblems.map((problem) => (
						<Question
							problem={problem}
							key={problem.questionTitleSlug}
						/>
					))
				)}
			</div>

			{!loading && totalPage > 1 && (
				<div className="flex justify-center items-center mt-4">
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 1}
						className={`mx-2 px-3 md:px-4 py-1 md:py-1.5 flex items-center bg-gray-800/90 rounded-md hover:bg-gray-700 transition-colors ${
							currentPage === 1
								? "opacity-50 cursor-not-allowed"
								: "cursor-pointer"
						}`}
					>
						<ChevronLeft className="mr-1 size-4" />
						<span>Previous</span>
					</button>
					<span className="mx-3 text-gray-200">
						Page {currentPage} of {totalPage}
					</span>
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPage}
						className={`mx-2 px-3 md:px-4 py-1 md:py-1.5 flex items-center bg-gray-800/90 rounded-md hover:bg-gray-700 transition-colors ${
							currentPage === totalPage
								? "opacity-50 cursor-not-allowed"
								: "cursor-pointer"
						}`}
					>
						<span>Next</span>
						<ChevronRight className="ml-1 size-4" />
					</button>
				</div>
			)}
		</div>
	);
};
