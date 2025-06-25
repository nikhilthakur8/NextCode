import { Query, Client, Databases, ID } from "node-appwrite";

const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your Appwrite Endpoint
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Appwrite Project ID

const databases = new Databases(client);

function questionDetailsParser(response) {
	const problemDetail = response;
	problemDetail.statusList = problemDetail?.statusList?.map((status) =>
		JSON.parse(status)
	);
	problemDetail.topicTags = problemDetail?.topicTags?.map((tag) =>
		JSON.parse(tag)
	);
	problemDetail.similarQuestionList = problemDetail?.similarQuestionList?.map(
		(question) => JSON.parse(question)
	);
	problemDetail.metaData = problemDetail?.metaData
		? JSON.parse(problemDetail?.metaData)
		: null;
	problemDetail.codeSnippets = problemDetail?.codeSnippets?.map((snippet) =>
		JSON.parse(snippet)
	);
	problemDetail.languageList = problemDetail?.languageList?.map((language) =>
		JSON.parse(language)
	);
	problemDetail.stats = problemDetail?.stats
		? JSON.parse(problemDetail?.stats)
		: null;
	return problemDetail;
}

export const getProblemDetails = async (titleSlug) => {
	try {
		const response = await databases.listDocuments(
			import.meta.env.VITE_APPWRITE_DATABASE_ID, // Replace with your database ID
			import.meta.env.VITE_APPWRITE_COLLECTION_ID, // Replace with your collection ID
			[Query.equal("questionTitleSlug", titleSlug)]
		);

		if (response.documents.length > 0) {
			return questionDetailsParser(response.documents[0]);
		} else {
			throw new Error("Problem not found");
		}
	} catch (error) {
		console.error("Error fetching problem details:", error);
		throw error;
	}
};
export const getAllProblems = async (skip = 0, limit = 10) => {
	try {
		const response = await databases.listDocuments(
			import.meta.env.VITE_APPWRITE_DATABASE_ID,
			import.meta.env.VITE_APPWRITE_COLLECTION_ID,
			[
				Query.limit(limit),
				Query.offset(skip),
				Query.select([
					"questionTitleSlug",
					"questionTitle",
					"questionFrontendId",
					"questionDifficulty",
					"stats",
					"topicTags",
				]),
				Query.orderAsc("questionFrontendId"),
			]
		);
		if (response.documents.length > 0) {
			const parsedData = response.documents.map((doc) =>
				questionDetailsParser(doc)
			);
			return {
				totalDocs: response.total,
				allProblems: parsedData,
			};
		}
		// } else {
		// 	throw new Error("Problem not found");
		// }
	} catch (error) {
		console.error("Error fetching problem details:", error);
		throw error;
	}
};

export const fetchProblems = async (search, skip = 0, limit = 10) => {
	try {
		const response = await databases.listDocuments(
			import.meta.env.VITE_APPWRITE_DATABASE_ID,
			import.meta.env.VITE_APPWRITE_COLLECTION_ID,
			[
				Query.limit(limit),
				Query.offset(skip),
				Query.search("questionTitle", search),
				Query.select([
					"questionTitleSlug",
					"questionTitle",
					"questionFrontendId",
					"questionDifficulty",
					"stats",
					"topicTags",
				]),
				Query.orderAsc("questionFrontendId"),
			]
		);
		if (response.documents.length > 0) {
			const parsedData = response.documents.map((doc) =>
				questionDetailsParser(doc)
			);
			return {
				totalDocs: response.total,
				allProblems: parsedData,
			};
		}
	} catch (error) {
		console.error("Error fetching problems:", error);
		throw error;
	}
};
