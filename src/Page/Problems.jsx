import { useEffect, useState } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { ProblemContentPage } from "../components/ProblemContentPage";
import { CodeEditor } from "../components/CodeEditor";
import { Code2, FileText, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { getProblemDetails } from "../appwrite/config";

export const Problems = () => {
	const { titleSlug } = useParams();
	const [questionDetails, setQuestionDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		getProblemDetails(titleSlug)
			.then((data) => setQuestionDetails(data))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [titleSlug]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen bg-black">
				<Loader2 className="size-8 text-emerald-500 animate-spin" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-screen bg-black text-red-400 text-lg">
				Failed to load problem: {error}
			</div>
		);
	}

	return (
		<div className="text-neutral-200 p-3 h-screen flex flex-col w-full bg-black">
			<div className="min-h-0 flex-1">
				<ReflexContainer orientation="vertical" className="space-x-1">
					<ReflexElement minSize={300}>
						<div className="h-full flex overflow-hidden flex-col rounded-xl border border-neutral-700 bg-neutral-800">
							<div className="py-2 px-4 border-b bg-neutral-700 rounded-t-xl border-neutral-700 whitespace-nowrap">
								<div className="flex items-center gap-2">
									<FileText className="inline size-5 text-blue-500" />
									Description
								</div>
							</div>
							<ProblemContentPage
								questionDetails={questionDetails}
							/>
						</div>
					</ReflexElement>
					<ReflexSplitter className="!w-1.5 shrink-0 !bg-transparent !border-none flex group">
						<div className="w-1 h-10 bg-neutral-500 mx-auto group-hover:h-full group-hover:bg-blue-500 group-active:h-full group-active:bg-blue-700 rounded-full my-auto"></div>
					</ReflexSplitter>
					<ReflexElement minSize={300}>
						<div className="h-full flex flex-col overflow-hidden bg-neutral-800 border rounded-xl border-neutral-700">
							<div className="px-4 py-2 flex items-center border-b bg-neutral-700 rounded-t-xl border-neutral-700">
								<Code2 className="text-green-500" />
								<span className="text-lg inline font-semibold ml-2">
									Code Editor
								</span>
							</div>
							<CodeEditor
								language="cpp"
								questionDetails={questionDetails}
							/>
						</div>
					</ReflexElement>
				</ReflexContainer>
			</div>
		</div>
	);
};
