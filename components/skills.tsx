"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "Java", level: 75 },
      { name: "C++", level: 70 },
    ],
  },
  {
    title: "Web Technologies",
    skills: [
      { name: "React", level: 80 },
      { name: "HTML/CSS", level: 90 },
      { name: "Node.js", level: 75 },
      { name: "TypeScript", level: 70 },
    ],
  },
  {
    title: "AI/ML & Data Science",
    skills: [
      { name: "Machine Learning", level: 75 },
      { name: "TensorFlow", level: 65 },
      { name: "Data Analysis", level: 70 },
      { name: "Neural Networks", level: 60 },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git/GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Linux", level: 70 },
      { name: "Docker", level: 60 },
    ],
  },
]

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById("skills")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-work-sans font-bold text-3xl sm:text-4xl text-foreground mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={category.title} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-work-sans text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress
                      value={isVisible ? skill.level : 0}
                      className="h-2"
                      style={{
                        transition: `all ${0.5 + skillIndex * 0.1}s ease-in-out ${categoryIndex * 0.2}s`,
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
