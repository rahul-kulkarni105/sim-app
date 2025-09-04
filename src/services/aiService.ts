export interface ChatRequest {
  message: string
  scenarioId?: string
  context?: string
}

export interface ChatResponse {
  message: string
  suggestions?: string[]
  taskUpdate?: {
    taskId: string
    completed: boolean
    feedback?: string
  }
  scenarioProgress?: number
}

// Mock AI service - replace with actual AI service integration
export class AIService {
  private static mockResponses: Record<string, string[]> = {
    'frontend-dev-intro': [
      "Welcome to the Frontend Developer onboarding! I'm here to guide you through our development process. Let's start by setting up your development environment. Do you have Node.js installed?",
      "Great! Now let's create your first React component. In our codebase, we follow these naming conventions...",
      "Excellent work! Now let's apply some styling using our design system. We use Tailwind CSS with custom components...",
    ],
    'backend-api-design': [
      "Welcome to API Design! As a backend developer, you'll be creating robust APIs. Let's start by discussing RESTful principles. What do you know about REST?",
      "Perfect! Now let's design your first endpoint. We need to create a user management API...",
      "Good thinking! Let's implement proper error handling for your API...",
    ],
    'devops-deployment': [
      "Welcome to DevOps! We'll be setting up a complete CI/CD pipeline. First, let's understand your current deployment knowledge...",
      "Excellent! Let's start with continuous integration. We'll use GitHub Actions...",
      "Great progress! Now let's configure the deployment pipeline...",
    ],
    'qa-testing-strategy': [
      "Welcome to QA! Testing is crucial for maintaining code quality. Let's start with test planning. What types of testing are you familiar with?",
      "Perfect! Let's create a comprehensive test plan for our web application...",
      "Excellent! Now let's implement some automated tests...",
    ],
    'code-review-process': [
      "Welcome to Code Review training! Effective code reviews are essential for team collaboration. What's your experience with code reviews?",
      "Great! Let's establish a review checklist. Here are the key things to look for...",
      "Excellent! Now let's practice giving constructive feedback...",
    ],
  }

  static async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    const { message, scenarioId } = request

    // Mock response based on scenario
    if (scenarioId && this.mockResponses[scenarioId]) {
      const responses = this.mockResponses[scenarioId]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      // Simulate task completion based on keywords
      let taskUpdate
      let scenarioProgress

      if (message.toLowerCase().includes('done') || message.toLowerCase().includes('completed')) {
        taskUpdate = {
          taskId: 'mock-task-' + Date.now(),
          completed: true,
          feedback: "Great job! You've successfully completed this task.",
        }
        scenarioProgress = Math.min(100, Math.random() * 30 + 20) // Random progress increase
      }

      return {
        message: randomResponse,
        suggestions: [
          'Tell me more about this topic',
          'What should I do next?',
          'Can you give me an example?',
          'I need help with this step',
        ],
        taskUpdate,
        scenarioProgress,
      }
    }

    // Default responses
    const defaultResponses = [
      "I understand you're asking about: " + message + '. Let me help you with that.',
      "That's a great question! Based on what you've told me, here's what I'd suggest...",
      "I see you're working on this challenge. Let's break it down step by step.",
      'Excellent point! In our company, we typically handle this by...',
      'Let me guide you through this process. First, we need to understand...',
    ]

    const response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]

    return {
      message: response,
      suggestions: [
        'Can you explain this differently?',
        'What are the best practices?',
        'Show me an example',
        "What's the next step?",
      ],
    }
  }

  static async getScenarioHint(_scenarioId: string, taskId: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const hints: Record<string, string> = {
      'setup-env':
        'Make sure you have Node.js 18+ and npm installed. You can check with: node --version',
      'first-component':
        'Start with a functional component using TypeScript. Remember to export it as default.',
      styling:
        'Use our Tailwind CSS classes. Check the design system documentation for component patterns.',
      'api-planning':
        'Think about REST principles: use appropriate HTTP methods and structure your endpoints logically.',
      'implement-crud':
        "Start with the GET endpoint first, then POST, PUT, and DELETE. Don't forget validation!",
      'error-handling':
        'Use consistent error response format: { error: string, code: number, details?: any }',
      'ci-setup':
        'GitHub Actions workflow should include: install dependencies, run tests, build project.',
      'deployment-config':
        'Consider using environment-specific config files and secrets management.',
      monitoring:
        'Implement structured logging with correlation IDs and set up alerting for critical errors.',
      'test-planning':
        'Consider unit tests, integration tests, and end-to-end tests. Prioritize by risk and impact.',
      'test-cases':
        'Use Given-When-Then format for test cases. Cover happy path, edge cases, and error scenarios.',
      automation:
        'Start with unit tests using Jest/Vitest, then add integration tests with Testing Library.',
      'review-checklist':
        'Check for: code style, security issues, performance, tests, documentation.',
      'constructive-feedback':
        'Be specific, suggest improvements, ask questions rather than making demands.',
      'security-review':
        'Look for: input validation, authentication, authorization, data exposure, OWASP top 10.',
    }

    return (
      hints[taskId] || 'Think about the requirements and break the problem down into smaller steps.'
    )
  }
}
