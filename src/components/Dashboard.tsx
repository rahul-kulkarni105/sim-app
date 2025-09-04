import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Toggle } from '@/components/ui/toggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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
  ArrowRight,
  Play,
  Settings,
  ChevronDown,
  Calendar,
  Brain,
  Code,
  Shield,
  Layers
} from 'lucide-react'

interface Scenario {
  id: string
  title: string
  role: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  completed: boolean
  progress: number
  category: string
}

interface ScenarioCardProps {
  scenario: Scenario
  index: number
  onStart: (id: string) => void
  getCategoryIcon: (category: string) => React.ReactElement
  getDifficultyColor: (difficulty: string) => string
}

// Helper component for scenario cards
function ScenarioCard({ 
  scenario, 
  index, 
  onStart, 
  getCategoryIcon, 
  getDifficultyColor 
}: ScenarioCardProps) {
  return (
    <Card
      className="group card-glass hover-lift hover-glow cursor-pointer border-gray-200/50 dark:border-gray-700/50 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onStart(scenario.id)}
    >
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {getCategoryIcon(scenario.category)}
              <span className="text-xs text-gray-500 dark:text-gray-400">{scenario.category}</span>
            </div>
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {scenario.title}
            </CardTitle>
            <CardDescription className="mt-2 text-sm leading-relaxed">
              {scenario.role}
            </CardDescription>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Badge className={`${getDifficultyColor(scenario.difficulty)} border text-xs px-2 py-1 font-medium shrink-0`}>
                {scenario.difficulty}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Difficulty: {scenario.difficulty}</p>
            </TooltipContent>
          </Tooltip>
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
              onStart(scenario.id)
            }}
          >
            <Play className="h-4 w-4" />
            Start Challenge
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Development':
        return <Code className="h-4 w-4" />
      case 'Operations':
        return <Layers className="h-4 w-4" />
      case 'Quality':
        return <Shield className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  // Enhanced stats cards data
  const statsCards = [
    {
      title: 'Current Level',
      value: userProgress.level,
      subtitle: `${userProgress.xp} XP earned`,
      icon: User,
      color: 'primary',
      trend: '+2 this week',
    },
    {
      title: 'Completed',
      value: completedScenarios.length,
      subtitle: 'scenarios mastered',
      icon: Trophy,
      color: 'emerald',
      trend: '+1 today',
    },
    {
      title: 'In Progress',
      value: inProgressScenarios.length,
      subtitle: 'active learning',
      icon: Target,
      color: 'amber',
      trend: 'Keep going!',
    },
    {
      title: 'Available',
      value: availableScenarios.length,
      subtitle: 'ready to start',
      icon: BookOpen,
      color: 'blue',
      trend: 'Start now',
    },
  ]

  return (
    <TooltipProvider>
      {/* Mobile-first responsive layout */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        
        {/* Container: Mobile-first with proper responsive padding */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
          
          {/* Header: Mobile-optimized */}
          <header className="py-4 sm:py-6 lg:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Logo and title - stacked on mobile, horizontal on sm+ */}
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    AI Simulator
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Master real-world scenarios</p>
                </div>
              </div>

              {/* Controls - horizontal on all sizes */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      pressed={theme === 'dark'}
                      onPressedChange={toggleTheme}
                      variant="outline"
                      size="sm"
                      className="gap-1 sm:gap-2"
                    >
                      {theme === 'dark' ? (
                        <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Switch to {theme === 'light' ? 'dark' : 'light'} mode</p>
                  </TooltipContent>
                </Tooltip>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                      <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Settings</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 sm:w-56">
                    <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      Learning Schedule
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600">
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset Progress
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reset All Progress?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            progress and reset all completed scenarios.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={resetProgress} className="bg-red-600 hover:bg-red-700">
                            Reset Everything
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Stats: Mobile-first responsive grid */}
          <section className="py-4 sm:py-6 lg:py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {statsCards.map((stat) => {
                const IconComponent = stat.icon
                const getColorClasses = (color: string) => {
                  switch (color) {
                    case 'emerald':
                      return 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300'
                    case 'amber':
                      return 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-300'
                    case 'blue':
                      return 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-300'
                    default:
                      return 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-950/50 dark:border-slate-800 dark:text-slate-300'
                  }
                }

                return (
                  <Card key={stat.title} className="hover:shadow-md transition-all duration-200 border-0 shadow-sm bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                            {stat.title}
                          </p>
                          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                            {stat.value}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 truncate">
                            {stat.subtitle}
                          </p>
                        </div>
                        <div className={`p-2 sm:p-3 rounded-lg ${getColorClasses(stat.color)} ml-2`}>
                          <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Main Scenarios Section - Now within the same container */}
          
          {/* Continue Learning Section */}
          {inProgressScenarios.length > 0 && (
            <section className="pb-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Continue Learning
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Pick up where you left off
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {inProgressScenarios.map((scenario, index) => (
                  <Card
                    key={scenario.id}
                    className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-0 shadow-sm bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleStartScenario(scenario.id)}
                  >
                    <CardHeader className="space-y-4">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(scenario.category)}
                            <span className="text-xs text-slate-500 dark:text-slate-400">{scenario.category}</span>
                          </div>
                          <CardTitle className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {scenario.title}
                          </CardTitle>
                          <CardDescription className="mt-2 text-sm leading-relaxed">
                            {scenario.role}
                          </CardDescription>
                        </div>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={`${getDifficultyColor(scenario.difficulty)} border text-xs px-2 py-1 font-medium shrink-0`}>
                              {scenario.difficulty}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Difficulty: {scenario.difficulty}</p>
                          </TooltipContent>
                        </Tooltip>
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

          {/* Available Scenarios Section with Tabs */}
          <section className="pb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Start New Adventure
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Choose your next learning challenge
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 max-w-md mb-6">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="Development" className="text-xs">Dev</TabsTrigger>
                <TabsTrigger value="Operations" className="text-xs">Ops</TabsTrigger>
                <TabsTrigger value="Quality" className="text-xs">QA</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {availableScenarios.map((scenario, index) => (
                    <ScenarioCard 
                      key={scenario.id} 
                      scenario={scenario} 
                      index={index} 
                      onStart={handleStartScenario}
                      getCategoryIcon={getCategoryIcon}
                      getDifficultyColor={getDifficultyColor}
                    />
                  ))}
                </div>
              </TabsContent>

              {['Development', 'Operations', 'Quality'].map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {availableScenarios
                      .filter(scenario => scenario.category === category)
                      .map((scenario, index) => (
                        <ScenarioCard 
                          key={scenario.id} 
                          scenario={scenario} 
                          index={index} 
                          onStart={handleStartScenario}
                          getCategoryIcon={getCategoryIcon}
                          getDifficultyColor={getDifficultyColor}
                        />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* Completed Scenarios */}
          {completedScenarios.length > 0 && (
            <section className="pb-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Hall of Fame
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Your completed achievements
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {completedScenarios.map((scenario, index) => (
                  <Card 
                    key={scenario.id} 
                    className="hover:shadow-md transition-all duration-200 border-0 shadow-sm bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm text-center border-emerald-200/30 dark:border-emerald-800/30"
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

          {/* Footer section */}
          <footer className="border-t border-slate-200/50 dark:border-slate-800/50 pt-8 pb-6 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>AI Simulator - Master real-world scenarios</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Progress is automatically saved</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Online</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  )
}
