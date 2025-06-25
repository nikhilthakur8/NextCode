import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

const color = {
	Easy: "text-green-500",
	Medium: "text-yellow-500",
	Hard: "text-red-500",
};
export const ProblemContentPage = ({ questionDetails }) => {
	const [open, setOpen] = React.useState({
		topicTags: false,
		similarQuestions: false,
		Companies: false,
	});
	const topItems = {
		Topics: {
			onClick: () => {
				document
					.getElementById("topics")
					.scrollIntoView({ behavior: "smooth", block: "center" });
				setOpen((prev) => ({ ...prev, topicTags: true }));
			},
		},
		// "Companies": [],
		Hint: {
			onClick: () => {
				document
					.getElementById("hints")
					.scrollIntoView({ behavior: "smooth", block: "center" });
				setOpen((prev) => ({
					...prev,
					similarQuestions: !prev.similarQuestions,
				}));
			},
		},
	};
	return (
		<div className="overflow-auto flex-1  flex flex-col">
			<div className="px-5 py-5 flex flex-1 overflow-x-hidden min-w-[500px] overflow-y-auto flex-col gap-5">
				{/* heading which includes title and top items */}
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">
						{questionDetails?.questionFrontendId}
						{". "}
						{questionDetails?.questionTitle}
					</h1>
					<div className="flex gap-2 text-lg">
						<button
							className={`px-3 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors ${
								color[questionDetails?.questionDifficulty]
							}`}
						>
							{questionDetails?.questionDifficulty}
						</button>
						{Object.keys(topItems).map((item, index) => (
							<div key={index} onClick={topItems[item].onClick}>
								<button className="px-3 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors">
									{item}
								</button>
							</div>
						))}
					</div>
				</div>
				<div
					// className="prose prose-invert max-w-none text-white"
					dangerouslySetInnerHTML={{
						__html: questionDetails?.questionContent,
					}}
				/>
				<div className="py-2 border-t border-neutral-700 border-b">
					<div
						id="topics"
						className="flex justify-between items-center cursor-pointer"
						onClick={() =>
							setOpen((prev) => ({
								...prev,
								topicTags: !prev.topicTags,
							}))
						}
					>
						<p className="text-base md:text-lg">Topics</p>
						{open.topicTags ? <ChevronUp /> : <ChevronDown />}
					</div>
					{open.topicTags && (
						<div className="flex flex-wrap gap-2 my-3">
							{questionDetails?.topicTags.map((tag, index) => (
								<span
									key={index}
									className="text-sm text-neutral-200 bg-gray-700 rounded-full px-2 py-0.5"
								>
									{tag?.name}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
			{/* <div className="bg-neutral-800 p-4 text-neutral-400 whitespace-nowrap">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, et.
			</div> */}
		</div>
	);
};
