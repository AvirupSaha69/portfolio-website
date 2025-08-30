import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Achievements } from "@/components/achievements";
import { Contact } from "@/components/contact";
import { Navigation } from "@/components/navigation";
import { BackToTop } from "@/components/back-to-top";
import AIChatbot from "@/components/ai-chat-bot";

export default function Home() {
	return (
		<main className="min-h-screen bg-background">
			<Navigation />
			<Hero />
			<About />
			<Skills />
			<Projects />
			<Experience />
			<Achievements />
			<Contact />
			<BackToTop />
			<AIChatbot />
		</main>
	);
}
