import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "AI-Powered Chatbot",
    description:
      "A conversational AI chatbot built using natural language processing techniques and machine learning algorithms.",
    image: "/ai-chatbot-interface.png",
    technologies: ["Python", "TensorFlow", "NLP", "Flask"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Smart Task Manager",
    description:
      "A web application that helps users organize tasks with intelligent prioritization using machine learning.",
    image: "/clean-task-dashboard.png",
    technologies: ["React", "Node.js", "MongoDB", "ML"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Game Analytics Dashboard",
    description:
      "A comprehensive dashboard for analyzing gaming performance and statistics with interactive visualizations.",
    image: "/gaming-analytics-dashboard.png",
    technologies: ["JavaScript", "D3.js", "Python", "API"],
    githubUrl: "#",
    liveUrl: "#",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-work-sans font-bold text-3xl sm:text-4xl text-foreground mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I've worked on that showcase my skills and passion for technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-work-sans text-xl">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
