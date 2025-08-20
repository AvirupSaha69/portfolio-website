import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "Student Developer",
    company: "MCKV Institute of Engineering",
    location: "Howrah, West Bengal",
    period: "2023 - Present",
    description:
      "Currently pursuing B.Tech in Computer Science & Engineering with specialization in AI & ML. Actively participating in coding competitions and technical workshops.",
    skills: ["Python", "Machine Learning", "Web Development", "Data Structures"],
  },
  {
    title: "Coding Club Member",
    company: "College Technical Society",
    location: "MCKV Institute",
    period: "2023 - Present",
    description:
      "Active member of the college coding club, participating in hackathons, organizing coding workshops, and mentoring junior students.",
    skills: ["Leadership", "Team Collaboration", "Problem Solving", "Mentoring"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-work-sans font-bold text-3xl sm:text-4xl text-foreground mb-4">Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My journey in technology and the experiences that have shaped my skills.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="font-work-sans font-semibold text-xl text-foreground mb-1">{experience.title}</h3>
                    <p className="text-primary font-medium mb-2">{experience.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span className="text-sm">{experience.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} />
                      <span className="text-sm">{experience.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-foreground mb-4 leading-relaxed">{experience.description}</p>

                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
