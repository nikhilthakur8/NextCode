import { Editor, loader } from "@monaco-editor/react";
import React, { useEffect, useRef } from "react";
import "react-reflex/styles.css";

export const CodeEditor = ({
	problemDetails,
	language = "cpp",
	theme = "leetcode-dark",
	codeChange,
}) => {
	const monacoRef = useRef(null);
	const editorInstanceRef = useRef(null);

	useEffect(() => {
		loader.init().then((monaco) => {
			monacoRef.current = monaco;

			monaco.editor.defineTheme("leetcode-dark", {
				base: "vs-dark",
				inherit: true,
				rules: [
					{ token: "keyword", foreground: "569CD6" },
					{ token: "type", foreground: "4EC9B0" },
					{ token: "identifier", foreground: "9CDCFE" },
					{ token: "number", foreground: "B5CEA8" },
					{ token: "string", foreground: "CE9178" },
					{ token: "comment", foreground: "6A9955" },
				],
				colors: {
					"editor.background": "#1E1E1E",
					"editorLineNumber.foreground": "#858585",
					"editorLineNumber.activeForeground": "#C6C6C6",
					"editor.foreground": "#D4D4D4",
				},
			});

			if (editorInstanceRef.current) {
				monaco.editor.setTheme("leetcode-dark");
			}
		});
	}, []);

	const handleEditorDidMount = (editor, monaco) => {
		editorInstanceRef.current = editor;
		if (codeChange) {
			editor.onDidChangeModelContent(() => {
				codeChange(editor.getValue());
			});
		}
	};

	return (
		<div className="flex-1">
			<div className="overflow-hidden h-full">
				<Editor
					height="100%"
					defaultLanguage={language}
					defaultValue={problemDetails?.codeSnippets}
					theme={theme}
					onMount={handleEditorDidMount}
					options={{
						fontSize: 16,
						fontFamily:
							"'Cascadia Code', 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace",
						fontWeight: "400",
						fontLigatures: true,
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						formatOnType: true,
						formatOnPaste: true,
						wordWrap: "on",
						lineNumbers: "on",
						renderLineHighlight: "all",
					}}
				/>
			</div>
		</div>
	);
};
