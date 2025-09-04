import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useNavigate } from '@tanstack/react-router'
import { 
  User, 
  Trophy, 
  Target, 
  Clock, 
  BookOpen, 
  Sun, 
  Moon, 
  RotateCcw, 
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
  Star,
  Play
} from 'lucide-react'

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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
      case 'intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
      case 'advanced':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800'
    }
  }

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gradient">
              AI Simulator
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Master real-world scenarios with AI-powered mentorship. 
            Build confidence, develop skills, and accelerate your career growth.
          </p>
          
          {/* Theme toggle and reset - centered */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center gap-3 p-1 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <Sun className={`h-4 w-4 transition-colors ${theme === 'light' ? 'text-primary' : 'text-gray-400'}`} />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className={`h-4 w-4 transition-colors ${theme === 'dark' ? 'text-primary' : 'text-gray-400'}`} />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetProgress}
              className="gap-2 hover-lift bg-white/50 backdrop-blur-sm border-gray-200/50 dark:bg-gray-900/50 dark:border-gray-700/50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Progress
            </Button>
          </div>
        </div>

        {/* Stats Cards - Centered grid */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-glass hover-lift group text-center">
              <CardHeader className="pb-3">
                <div className="mx-auto p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{userProgress.level}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                  <Star className="h-3 w-3" />
                  {userProgress.xp} XP earned
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass hover-lift group text-center">
              <CardHeader className="pb-3">
                <div className="mx-auto p-3 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors w-fit">
                  <Trophy className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{completedScenarios.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                  <Award className="h-3 w-3" />
                  scenarios mastered
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass hover-lift group text-center">
              <CardHeader className="pb-3">
                <div className="mx-auto p-3 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors w-fit">
                  <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{inProgressScenarios.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  active learning
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass hover-lift group text-center">
              <CardHeader className="pb-3">
                <div className="mx-auto p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors w-fit">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{availableScenarios.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                  <Zap className="h-3 w-3" />
                  ready to start
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Scenarios Section - Centered */}
        <div className="max-w-6xl mx-auto">
          
          {/* Continue Learning Section */}
          {inProgressScenarios.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-10">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Continue Learning</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Pick up where you left off</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {inProgressScenarios.map((scenario, index) => (
                  <Card
                    key={scenario.id}
                    className="group card-glass hover-lift hover-glow cursor-pointer border-gray-200/50 dark:border-gray-700/50 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleStartScenario(scenario.id)}
                  >
                    <CardHeader className="space-y-4">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {scenario.title}
                          </CardTitle>
                          <CardDescription className="mt-2 text-sm leading-relaxed">
                            {scenario.role}
                          </CardDescription>
                        </div>
                        <Badge className={`${getDifficultyColor(scenario.difficulty)} border text-xs px-2 py-1 font-medium shrink-0`}>
                          {scenario.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {scenario.description}
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>{scenario.estimatedTime}</span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Progress</span>
                            <span className="font-medium text-gray-900 dark:text-white">{Math.round(scenario.progress)}%</span>
                          </div>
                          <Progress 
                            value={scenario.progress} 
                            className="h-2"
                          />
                        </div>

                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-white gap-2 font-medium" 
                        >
                          Continue Learning
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Available Scenarios Section */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Start New Adventure</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Choose your next learning challenge</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {availableScenarios.map((scenario, index) => (
                <Card
                  key={scenario.id}
                  className="group card-glass hover-lift hover-glow cursor-pointer border-gray-200/50 dark:border-gray-700/50 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleStartScenario(scenario.id)}
                >
                  <CardHeader className="space-y-4">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {scenario.title}
                        </CardTitle>
                        <CardDescription className="mt-2 text-sm leading-relaxed">
                          {scenario.role}
                        </CardDescription>
                      </div>
                      <Badge className={`${getDifficultyColor(scenario.difficulty)} border text-xs px-2 py-1 font-medium shrink-0`}>
                        {scenario.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {scenario.description}
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{scenario.estimatedTime}</span>
                      </div>

                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white gap-2 font-medium"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStartScenario(scenario.id)
                        }}
                      >
                        <Play className="h-4 w-4" />
                        Start Challenge
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
              <div className="text-center mb-10">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Trophy className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Hall of Fame</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Your completed achievements</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {completedScenarios.map((scenario, index) => (
                  <Card 
                    key={scenario.id} 
                    className="card-glass border-emerald-200/50 dark:border-emerald-800/50 animate-scale-in text-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3 space-y-2">
                      <div className="mx-auto p-2 rounded-md bg-emerald-500/10 w-fit">
                        <Trophy className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <CardTitle className="text-base font-medium">{scenario.title}</CardTitle>
                      <CardDescription className="text-sm">{scenario.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 text-xs">
                        ✨ Mastered
                      </Badge>
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
