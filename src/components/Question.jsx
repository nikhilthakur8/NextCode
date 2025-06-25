import React from "react";
import { Link } from "react-router-dom";

const difficulty = {
	Easy: {
		label: "Easy",
		color: "text-green-500",
	},
	Medium: {
		label: "Med.",
		color: "text-yellow-500",
	},
	Hard: {
		label: "Hard",
		color: "text-red-500",
	},
};
export const Question = ({ problem, key }) => {
	return (
		<Link
			to={`/problem/${problem.questionTitleSlug}`}
			target="_blank"
			className="bg-neutral-900 flex justify-between items-center rounded-xl my-5 text-gray-300 p-3 md:p-5"
			key={key}
		>
			<div className="flex flex-col space-x-2 text-lg md:text-xl">
				<div className="flex gap-2">
					<span>{problem.questionFrontendId}.</span>
					<h1>{problem.questionTitle}</h1>
				</div>
				<div className="flex gap-2 mt-2 flex-wrap">
					{problem.topicTags.map((tag, index) => (
						<span
							key={index}
							className="text-sm text-gray-200 py-1 px-3 font-semibold rounded-full bg-neutral-700"
						>
							{tag.name}
						</span>
					))}
				</div>
			</div>
			<div className="flex gap-5 text-base md:text-xl">
				<p>{problem.stats?.acRate}</p>
				<p
					className={`${
						difficulty[problem.questionDifficulty].color
					} font-semibold`}
				>
					{difficulty[problem.questionDifficulty].label}
				</p>
			</div>
		</Link>
	);
};
