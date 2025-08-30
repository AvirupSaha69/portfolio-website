"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
	getAuth,
	signInAnonymously,
	onAuthStateChanged,
	Auth,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	query,
	orderBy,
	onSnapshot,
	addDoc,
	Firestore,
	DocumentData,
	Query,
} from "firebase/firestore";

// --- Constants ---
const APP_ID = "my-coding-assistant";
const SENDER_USER = "user";
const SENDER_AI = "ai";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-preview-05-20:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;

// --- Type Definitions ---
interface Message {
	id: string;
	text: string;
	sender: "user" | "ai";
	timestamp: string;
}

// --- Firebase Configuration ---
// IMPORTANT: Replace with your Firebase project's configuration.
// It's highly recommended to use environment variables for this sensitive data.
// Example .env.local file:
// NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
// NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
// NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
// NEXT_PUBLIC_GEMINI_API_KEY="your-gemini-api-key"

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const AIChatbot = () => {
	// --- State Variables ---
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [userId, setUserId] = useState<string | null>(null);
	const [db, setDb] = useState<Firestore | null>(null);
	const [auth, setAuth] = useState<Auth | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// --- Firebase Initialization and Authentication ---
	useEffect(() => {
		try {
			if (
				!firebaseConfig.apiKey ||
				!firebaseConfig.projectId ||
				!process.env.NEXT_PUBLIC_GEMINI_API_KEY
			) {
				console.warn(
					"Firebase or Gemini API key is not configured. Please check your environment variables."
				);
				return;
			}
			const app: FirebaseApp = initializeApp(firebaseConfig);
			const firestore: Firestore = getFirestore(app);
			const firebaseAuth: Auth = getAuth(app);

			setDb(firestore);
			setAuth(firebaseAuth);

			const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
				if (user) {
					setUserId(user.uid);
				} else {
					await signInAnonymously(firebaseAuth);
				}
			});

			return () => unsubscribe();
		} catch (error) {
			console.error("Error initializing Firebase:", error);
		}
	}, []);

	// --- Real-time Chat Updates ---
	useEffect(() => {
		if (db && userId) {
			const chatCollectionPath = `artifacts/${APP_ID}/users/${userId}/chat_sessions`;
			const q: Query<DocumentData> = query(
				collection(db, chatCollectionPath),
				orderBy("timestamp")
			);

			const unsubscribe = onSnapshot(
				q,
				(snapshot) => {
					const fetchedMessages = snapshot.docs.map(
						(doc) =>
							({
								id: doc.id,
								...doc.data(),
							} as Message)
					);
					setMessages(fetchedMessages);
				},
				(error) => {
					console.error("Error fetching messages from Firestore:", error);
				}
			);
			return () => unsubscribe();
		}
	}, [db, userId]);

	// --- Auto-scrolling ---
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// --- Send Message Handler ---
	const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!input.trim() || loading || !db || !userId) return;

		setLoading(true);
		const userMessage: Omit<Message, "id"> = {
			text: input,
			sender: SENDER_USER,
			timestamp: new Date().toISOString(),
		};

		const chatCollectionPath = `artifacts/${APP_ID}/users/${userId}/chat_sessions`;

		try {
			await addDoc(collection(db, chatCollectionPath), userMessage);
			setInput("");

			const systemPrompt =
				"You are a friendly and helpful coding assistant. You can provide code snippets, explain concepts, debug code, and offer best practices. Please provide clear, concise, and accurate responses. Format code snippets using Markdown code blocks.";
			const userQuery = `Act as a coding assistant. Here is my request:\n\n${userMessage.text}`;

			const payload = {
				contents: [{ parts: [{ text: userQuery }] }],
				systemInstruction: { parts: [{ text: systemPrompt }] },
				tools: [{ google_search: {} }],
			};

			const response = await fetch(GEMINI_API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error(`API call failed with status: ${response.status}`);
			}

			const result = await response.json();
			const aiText =
				result?.candidates?.[0]?.content?.parts?.[0]?.text ||
				"Sorry, I couldn't process that request.";

			const aiMessage: Omit<Message, "id"> = {
				text: aiText,
				sender: SENDER_AI,
				timestamp: new Date().toISOString(),
			};

			await addDoc(collection(db, chatCollectionPath), aiMessage);
		} catch (error) {
			console.error("Error sending message:", error);
			const errorMessage: Omit<Message, "id"> = {
				text: "There was an error processing your request. Please try again.",
				sender: SENDER_AI,
				timestamp: new Date().toISOString(),
			};
			if (db) {
				await addDoc(collection(db, chatCollectionPath), errorMessage);
			}
		} finally {
			setLoading(false);
		}
	};

	// --- Render Method ---
	return (
		<div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
			<header className="flex items-center justify-between p-4 bg-gray-800 shadow-md">
				<h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
					AI Coding Assistant
				</h1>
				{userId && (
					<div className="text-xs text-gray-400">
						User ID: <span className="font-mono text-gray-200">{userId}</span>
					</div>
				)}
			</header>

			<main className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.length === 0 && !loading && (
					<div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
						<div className="relative w-48 h-48 mb-4">
							<Image
								src="/ai-chatbot-interface.png"
								alt="AI Chatbot Interface"
								layout="fill"
								objectFit="contain"
								className="opacity-20"
							/>
						</div>
						<h2 className="text-2xl font-bold text-gray-400 mb-2">
							How can I help you code today?
						</h2>
						<p className="text-md">
							Ask a question or provide a code snippet to get started.
						</p>
					</div>
				)}

				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${
							msg.sender === SENDER_USER ? "justify-end" : "justify-start"
						}`}
					>
						<div
							className={`p-4 rounded-lg max-w-3xl shadow-lg whitespace-pre-wrap font-sans text-sm ${
								msg.sender === SENDER_USER
									? "bg-blue-600 text-white rounded-br-none"
									: "bg-gray-700 text-gray-200 rounded-bl-none"
							}`}
						>
							{msg.text}
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</main>

			<form
				onSubmit={handleSendMessage}
				className="p-4 bg-gray-800 shadow-lg flex items-center"
			>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={
						loading ? "Generating response..." : "Type your question here..."
					}
					className="flex-1 p-3 rounded-l-full bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
					disabled={loading || !userId}
				/>
				<button
					type="submit"
					className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-r-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={loading || !input.trim() || !userId}
				>
					{loading ? (
						<svg
							className="animate-spin h-5 w-5 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="22" y1="2" x2="11" y2="13"></line>
							<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
						</svg>
					)}
				</button>
			</form>
		</div>
	);
};

export default AIChatbot;
