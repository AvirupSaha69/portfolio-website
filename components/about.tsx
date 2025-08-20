import { Card, CardContent } from "@/components/ui/card"
import { Code, Gamepad2, GraduationCap } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-work-sans font-bold text-3xl sm:text-4xl text-foreground mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my journey, interests, and what drives me in the world of technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              I'm currently pursuing my B.Tech in Computer Science & Engineering with a specialization in AI & ML at
              MCKV Institute of Engineering. As a second-year student, I'm deeply fascinated by the potential of
              artificial intelligence and machine learning to solve real-world problems.
            </p>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              My journey in technology is driven by curiosity and a passion for creating innovative solutions. I believe
              in continuous learning and staying updated with the latest technological advancements.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new games or working on personal projects that challenge my
              problem-solving skills.
            </p>
          </div>

          <div className="grid gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <GraduationCap className="text-primary" size={24} />
                  </div>
                  <h3 className="font-work-sans font-semibold text-xl">Education</h3>
                </div>
                <p className="text-muted-foreground">
                  B.Tech in Computer Science & Engineering (AI & ML) at MCKV Institute of Engineering
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Code className="text-primary" size={24} />
                  </div>
                  <h3 className="font-work-sans font-semibold text-xl">Passion</h3>
                </div>
                <p className="text-muted-foreground">
                  Coding and developing innovative solutions using cutting-edge technologies
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Gamepad2 className="text-primary" size={24} />
                  </div>
                  <h3 className="font-work-sans font-semibold text-xl">Interests</h3>
                </div>
                <p className="text-muted-foreground">
                  Gaming enthusiast who enjoys exploring virtual worlds and game mechanics
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
