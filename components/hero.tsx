"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <img
            src="/young-computer-science-student-headshot.png"
            alt="Avirup Saha"
            className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-primary shadow-lg"
          />
        </div>

        <h1 className="font-work-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
          Hi, I'm <span className="text-primary">Avirup Saha</span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
          2nd-year B.Tech student in Computer Science & Engineering
        </p>

        <p className="text-lg text-muted-foreground mb-8">
          Specializing in <span className="text-accent font-semibold">AI & ML</span> at MCKV Institute of Engineering
        </p>

        <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
          Passionate about coding and gaming, I'm on a journey to explore the fascinating world of artificial
          intelligence and machine learning while building innovative solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button onClick={scrollToContact} size="lg" className="font-semibold">
            Get In Touch
          </Button>
          <div className="flex gap-4">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/AvirupSaha69" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="mailto:avirupsaha040@gmail.com">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
