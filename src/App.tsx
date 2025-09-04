import { createRouter, RouterProvider, createRoute, createRootRoute } from '@tanstack/react-router'
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

  // Apply theme on mount and changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <Toaster />
        <Dashboard />
      </div>
    </QueryClientProvider>
  )
}

// Create the root route
const rootRoute = createRootRoute({
  component: RootComponent,
})

// Create the chat route
const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat/$scenarioId',
  component: ChatInterface,
})

// Create the route tree
const routeTree = rootRoute.addChildren([chatRoute])

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return <RouterProvider router={router} />
}

export default App
