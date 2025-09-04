import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { useAppStore } from '@/store/useAppStore'
import { useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import ChatInterface from '@/components/ChatInterface'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

function RootComponent() {
  const { theme } = useAppStore()

  // Initialize theme on mount
  useEffect(() => {
    // Get persisted theme or default to light
    const persistedTheme = localStorage.getItem('ai-simulator-storage')
    if (persistedTheme) {
      try {
        const parsed = JSON.parse(persistedTheme)
        const savedTheme = parsed?.state?.theme || 'light'
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch {
        // Fallback to light theme
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  // Apply theme on changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <Toaster />
        <Outlet />
      </div>
    </QueryClientProvider>
  )
}

// Create the root route
const rootRoute = createRootRoute({
  component: RootComponent,
})

// Dashboard route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
})

// Create the chat route
const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat/$scenarioId',
  component: ChatInterface,
})

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, chatRoute])

// Create router
const router = createRouter({ routeTree })

// Update the router instance type for typescript
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}
