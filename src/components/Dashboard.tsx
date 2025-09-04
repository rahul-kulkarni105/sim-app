import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useNavigate } from '@tanstack/react-router'
import { User, Trophy, Target, Clock, BookOpen, Sun, Moon, RotateCcw } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { userProgress, scenarios, theme, toggleTheme, resetProgress } = useAppStore()

  const completedScenarios = scenarios.filter(s => s.completed)
  const inProgressScenarios = scenarios.filter(s => s.progress > 0 && !s.completed)
  const availableScenarios = scenarios.filter(s => s.progress === 0)

  const handleStartScenario = (scenarioId: string) => {
    navigate({ to: '/chat/$scenarioId', params: { scenarioId } })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Simulator Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Your journey to becoming a tech expert starts here
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Label htmlFor="theme-toggle" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Switch
                  id="theme-toggle"
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
                <Moon className="h-4 w-4" />
              </Label>
            </div>

            {/* Reset Progress */}
            <Button variant="outline" size="sm" onClick={resetProgress} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset Progress
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProgress.level}</div>
              <p className="text-xs text-muted-foreground">{userProgress.xp} XP total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedScenarios.length}</div>
              <p className="text-xs text-muted-foreground">scenarios finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressScenarios.length}</div>
              <p className="text-xs text-muted-foreground">scenarios active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableScenarios.length}</div>
              <p className="text-xs text-muted-foreground">new scenarios</p>
            </CardContent>
          </Card>
        </div>

        {/* Scenarios Sections */}
        <div className="space-y-8">
          {/* In Progress Scenarios */}
          {inProgressScenarios.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Target className="h-6 w-6" />
                Continue Learning
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressScenarios.map(scenario => (
                  <Card
                    key={scenario.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{scenario.title}</CardTitle>
                          <CardDescription className="mt-1">{scenario.role}</CardDescription>
                        </div>
                        <Badge className={getDifficultyColor(scenario.difficulty)}>
                          {scenario.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{scenario.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {scenario.estimatedTime}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round(scenario.progress)}%</span>
                          </div>
                          <Progress value={scenario.progress} className="h-2" />
                        </div>

                        <Button className="w-full" onClick={() => handleStartScenario(scenario.id)}>
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Available Scenarios */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Start New Scenario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableScenarios.map(scenario => (
                <Card
                  key={scenario.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{scenario.title}</CardTitle>
                        <CardDescription className="mt-1">{scenario.role}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(scenario.difficulty)}>
                        {scenario.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{scenario.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {scenario.estimatedTime}
                      </div>

                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => handleStartScenario(scenario.id)}
                      >
                        Start Scenario
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Completed Scenarios */}
          {completedScenarios.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Completed Scenarios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {completedScenarios.map(scenario => (
                  <Card key={scenario.id} className="opacity-75">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{scenario.title}</CardTitle>
                      <CardDescription className="text-sm">{scenario.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
