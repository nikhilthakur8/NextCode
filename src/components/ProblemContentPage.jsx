import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const difficultyColor = {
	Easy: "text-green-500",
	Medium: "text-yellow-500",
	Hard: "text-red-500",
};

export const ProblemContentPage = ({ questionDetails }) => {
	const [open, setOpen] = useState({
		topicTags: false,
		similarQuestions: false,
	});

	const scrollToAndToggle = (id, key) => {
		document
			.getElementById(id)
			?.scrollIntoView({ behavior: "smooth", block: "center" });
		setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<div className="overflow-auto flex-1 flex flex-col">
			<div className="px-5 py-5 flex flex-1 overflow-x-hidden min-w-[500px] overflow-y-auto flex-col gap-5">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">
						{questionDetails?.questionFrontendId}
						{". "}
						{questionDetails?.questionTitle}
					</h1>
					<div className="flex gap-2 text-lg">
						<button
							className={`px-3 rounded-full bg-neutral-700 ${
								difficultyColor[questionDetails?.questionDifficulty]
							}`}
						>
							{questionDetails?.questionDifficulty}
						</button>
						<button
							className="px-3 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors"
							onClick={() => scrollToAndToggle("topics", "topicTags")}
						>
							Topics
						</button>
					</div>
				</div>
				<div
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
							{questionDetails?.topicTags?.map((tag, index) => (
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
				{questionDetails?.similarQuestionList?.length > 0 && (
					<div className="py-2 border-b border-neutral-700">
						<div
							id="similar"
							className="flex justify-between items-center cursor-pointer"
							onClick={() =>
								setOpen((prev) => ({
									...prev,
									similarQuestions: !prev.similarQuestions,
								}))
							}
						>
							<p className="text-base md:text-lg">Similar Questions</p>
							{open.similarQuestions ? <ChevronUp /> : <ChevronDown />}
						</div>
						{open.similarQuestions && (
							<div className="flex flex-wrap gap-2 my-3">
								{questionDetails.similarQuestionList.map((q, index) => (
									<span
										key={index}
										className={`text-sm rounded-full px-2 py-0.5 bg-gray-700 ${
											difficultyColor[q.difficulty] || "text-neutral-200"
										}`}
									>
										{q.title}
									</span>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
