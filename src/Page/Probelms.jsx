import React, { useEffect, useState } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { ProblemContentPage } from "../components/ProblemContentPage";
import { CodeEditor } from "../components/CodeEditor";
import { Editor } from "@monaco-editor/react";
import {
	CloudUploadIcon,
	Code2,
	DonutIcon,
	FileText,
	Play,
} from "lucide-react";
import { Button } from "../components/Button";
import { useParams } from "react-router-dom";
import { getProblemDetails } from "../appwrite/config";
export const Problems = () => {
	const { titleSlug } = useParams();
	const [questionDetails, setQuestionDetails] = useState(null);
	const [typedCode, setTypedCode] = useState(null);
	useEffect(() => {
		getProblemDetails(titleSlug)
			.then((data) => {
				setQuestionDetails(data);
			})
			.catch((error) => {
				console.error("Error fetching problem details:", error);
			});
	}, [titleSlug]);

	const handleCodeChange = (updatedCode) => {
		setTypedCode(updatedCode);
	};
	return (
		<div className="text-neutral-200 p-3 h-screen flex flex-col  w-full bg-black ">
			{/* <Header /> */}
			<div className="min-h-0 flex-1">
				<ReflexContainer orientation="vertical" className="space-x-1">
					<ReflexElement minSize={300}>
						<div className="h-full flex overflow-hidden flex-col rounded-xl border border-neutral-700 bg-neutral-800 ">
							<div className="py-2  px-4 border-b bg-neutral-700 rounded-t-xl border-neutral-700 whitespace-nowrap">
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
						<div className="h-full flex flex-col overflow-hidden bg-neutral-800 border rounded-xl border-neutral-700 ">
							<CodeEditorHeader />
							<CodeEditor
								defaultCode={`int main() {\n  return 0;\n}`}
								language="cpp"
								codeChange={handleCodeChange}
								questionDetails={questionDetails}
							/>
						</div>
					</ReflexElement>
				</ReflexContainer>
			</div>
		</div>
	);
};

function Header() {
	return (
		<div className="flex items-center justify-center gap-3 py-2.5 bg-transparent">
			<Button className={"bg-neutral-800/90 border-neutral-700"}>
				<Play className="fill-neutral-500 text-neutral-500" />
			</Button>
			<Button
				className={
					"text-green-500 bg-neutral-800/90 border-neutral-700"
				}
			>
				<CloudUploadIcon className="mr-2" />
				Submit
			</Button>
		</div>
	);
}

function CodeEditorHeader() {
	return (
		<div className="px-4 py-2 flex items-center border-b bg-neutral-700 rounded-t-xl border-neutral-700">
			<Code2 className="text-green-500" />
			<span className="text-lg  inline font-semibold ml-2">
				Code Editor
			</span>
		</div>
	);
}
