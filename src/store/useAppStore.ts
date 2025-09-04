import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  scenarioId?: string
}

export interface Scenario {
  id: string
  title: string
  role: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  completed: boolean
  progress: number
  category: string
  tasks: Task[]
}

export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  feedback?: string
}

export interface UserProgress {
  level: number
  xp: number
  completedScenarios: string[]
  currentScenario?: string
  achievements: string[]
}

interface AppState {
  // Chat state
  messages: Message[]
  isLoading: boolean
  currentScenario: Scenario | null

  // User progress
  userProgress: UserProgress

  // Available scenarios
  scenarios: Scenario[]

  // Theme
  theme: 'light' | 'dark'

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  clearMessages: () => void
  setLoading: (loading: boolean) => void
  setCurrentScenario: (scenario: Scenario | null) => void
  updateScenarioProgress: (scenarioId: string, progress: number) => void
  completeScenario: (scenarioId: string) => void
  completeTask: (scenarioId: string, taskId: string, feedback?: string) => void
  addXP: (amount: number) => void
  toggleTheme: () => void
  resetProgress: () => void
}

const initialScenarios: Scenario[] = [
  {
    id: 'frontend-dev-intro',
    title: 'Frontend Developer Onboarding',
    role: 'Frontend Developer',
    description: 'Learn the basics of frontend development in our tech stack',
    difficulty: 'beginner',
    estimatedTime: '30 mins',
    completed: false,
    progress: 0,
    category: 'Development',
    tasks: [
      {
        id: 'setup-env',
        title: 'Set up development environment',
        description: 'Install and configure necessary tools',
        completed: false,
      },
      {
        id: 'first-component',
        title: 'Create your first component',
        description: 'Build a simple React component',
        completed: false,
      },
      {
        id: 'styling',
        title: 'Apply styling',
        description: 'Style your component using our design system',
        completed: false,
      },
    ],
  },
  {
    id: 'backend-api-design',
    title: 'API Design Best Practices',
    role: 'Backend Developer',
    description: 'Design and implement RESTful APIs following company standards',
    difficulty: 'intermediate',
    estimatedTime: '45 mins',
    completed: false,
    progress: 0,
    category: 'Development',
    tasks: [
      {
        id: 'api-planning',
        title: 'Plan API structure',
        description: 'Design endpoints and data models',
        completed: false,
      },
      {
        id: 'implement-crud',
        title: 'Implement CRUD operations',
        description: 'Create, Read, Update, Delete operations',
        completed: false,
      },
      {
        id: 'error-handling',
        title: 'Add error handling',
        description: 'Implement proper error responses',
        completed: false,
      },
    ],
  },
  {
    id: 'devops-deployment',
    title: 'Application Deployment Pipeline',
    role: 'DevOps Engineer',
    description: 'Set up CI/CD pipeline for application deployment',
    difficulty: 'advanced',
    estimatedTime: '60 mins',
    completed: false,
    progress: 0,
    category: 'Operations',
    tasks: [
      {
        id: 'ci-setup',
        title: 'Configure CI pipeline',
        description: 'Set up automated testing and building',
        completed: false,
      },
      {
        id: 'deployment-config',
        title: 'Configure deployment',
        description: 'Set up staging and production environments',
        completed: false,
      },
      {
        id: 'monitoring',
        title: 'Add monitoring',
        description: 'Implement logging and alerting',
        completed: false,
      },
    ],
  },
  {
    id: 'qa-testing-strategy',
    title: 'Quality Assurance Testing Strategy',
    role: 'QA Tester',
    description: 'Develop comprehensive testing strategies for web applications',
    difficulty: 'intermediate',
    estimatedTime: '40 mins',
    completed: false,
    progress: 0,
    category: 'Quality',
    tasks: [
      {
        id: 'test-planning',
        title: 'Create test plan',
        description: 'Define testing scope and approach',
        completed: false,
      },
      {
        id: 'test-cases',
        title: 'Write test cases',
        description: 'Create detailed test scenarios',
        completed: false,
      },
      {
        id: 'automation',
        title: 'Automate tests',
        description: 'Implement automated testing',
        completed: false,
      },
    ],
  },
  {
    id: 'code-review-process',
    title: 'Code Review Best Practices',
    role: 'Code Reviewer',
    description: 'Learn effective code review techniques and standards',
    difficulty: 'intermediate',
    estimatedTime: '35 mins',
    completed: false,
    progress: 0,
    category: 'Development',
    tasks: [
      {
        id: 'review-checklist',
        title: 'Create review checklist',
        description: 'Define what to look for in code reviews',
        completed: false,
      },
      {
        id: 'constructive-feedback',
        title: 'Provide constructive feedback',
        description: 'Learn to give helpful, actionable feedback',
        completed: false,
      },
      {
        id: 'security-review',
        title: 'Security considerations',
        description: 'Identify potential security issues',
        completed: false,
      },
    ],
  },
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      messages: [],
      isLoading: false,
      currentScenario: null,
      userProgress: {
        level: 1,
        xp: 0,
        completedScenarios: [],
        achievements: [],
      },
      scenarios: initialScenarios,
      theme: 'light',

      // Actions
      addMessage: message => {
        const newMessage: Message = {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        }
        set(state => ({
          messages: [...state.messages, newMessage],
        }))
      },

      clearMessages: () => set({ messages: [] }),

      setLoading: loading => set({ isLoading: loading }),

      setCurrentScenario: scenario => set({ currentScenario: scenario }),

      updateScenarioProgress: (scenarioId, progress) => {
        set(state => ({
          scenarios: state.scenarios.map(scenario =>
            scenario.id === scenarioId
              ? { ...scenario, progress: Math.max(scenario.progress, progress) }
              : scenario
          ),
        }))
      },

      completeScenario: scenarioId => {
        const state = get()
        set({
          scenarios: state.scenarios.map(scenario =>
            scenario.id === scenarioId ? { ...scenario, completed: true, progress: 100 } : scenario
          ),
          userProgress: {
            ...state.userProgress,
            completedScenarios: [...state.userProgress.completedScenarios, scenarioId],
            xp: state.userProgress.xp + 100,
          },
        })
      },

      completeTask: (scenarioId, taskId, feedback) => {
        set(state => ({
          scenarios: state.scenarios.map(scenario => {
            if (scenario.id === scenarioId) {
              const updatedTasks = scenario.tasks.map(task =>
                task.id === taskId ? { ...task, completed: true, feedback } : task
              )
              const completedTasks = updatedTasks.filter(task => task.completed).length
              const progress = (completedTasks / updatedTasks.length) * 100

              return {
                ...scenario,
                tasks: updatedTasks,
                progress,
                completed: progress === 100,
              }
            }
            return scenario
          }),
        }))
      },

      addXP: amount => {
        const state = get()
        const newXP = state.userProgress.xp + amount
        const newLevel = Math.floor(newXP / 500) + 1

        set({
          userProgress: {
            ...state.userProgress,
            xp: newXP,
            level: newLevel,
          },
        })
      },

      toggleTheme: () => {
        const state = get()
        const newTheme = state.theme === 'light' ? 'dark' : 'light'
        set({ theme: newTheme })

        // Apply theme to document
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      resetProgress: () => {
        set({
          userProgress: {
            level: 1,
            xp: 0,
            completedScenarios: [],
            achievements: [],
          },
          scenarios: initialScenarios,
          messages: [],
          currentScenario: null,
        })
      },
    }),
    {
      name: 'ai-simulator-storage',
      partialize: state => ({
        userProgress: state.userProgress,
        scenarios: state.scenarios,
        theme: state.theme,
      }),
    }
  )
)
