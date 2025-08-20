import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, Target } from "lucide-react"

const achievements = [
  {
    icon: Trophy,
    title: "Academic Excellence",
    description: "Maintaining strong academic performance in Computer Science & Engineering program",
    category: "Academic",
    year: "2023-2024",
  },
  {
    icon: Award,
    title: "Coding Competition Participant",
    description: "Actively participating in various coding competitions and hackathons",
    category: "Competition",
    year: "2023-2024",
  },
  {
    icon: Star,
    title: "Technical Workshop Organizer",
    description: "Organized and conducted technical workshops for fellow students",
    category: "Leadership",
    year: "2024",
  },
  {
    icon: Target,
    title: "Project Innovation",
    description: "Developed innovative projects combining AI/ML with practical applications",
    category: "Innovation",
    year: "2023-2024",
  },
]

const categoryColors = {
  Academic: "bg-blue-100 text-blue-800",
  Competition: "bg-green-100 text-green-800",
  Leadership: "bg-purple-100 text-purple-800",
  Innovation: "bg-orange-100 text-orange-800",
}

export function Achievements() {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-work-sans font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Achievements & Recognition
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milestones and accomplishments that mark my journey in technology and academics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-work-sans font-semibold text-lg text-foreground">{achievement.title}</h3>
                        <span className="text-sm text-muted-foreground">{achievement.year}</span>
                      </div>
                      <p className="text-muted-foreground mb-3 leading-relaxed">{achievement.description}</p>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${categoryColors[achievement.category as keyof typeof categoryColors]}`}
                      >
                        {achievement.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
