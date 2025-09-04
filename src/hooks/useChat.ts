import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AIService, type ChatRequest, type ChatResponse } from '@/services/aiService'
import { useAppStore } from '@/store/useAppStore'

// Chat mutation hook
export const useSendMessage = () => {
  const queryClient = useQueryClient()
  const { addMessage, setLoading, addXP, completeTask, updateScenarioProgress } = useAppStore()

  return useMutation({
    mutationFn: async (request: ChatRequest): Promise<ChatResponse> => {
      setLoading(true)

      // Add user message immediately
      addMessage({
        role: 'user',
        content: request.message,
        scenarioId: request.scenarioId,
      })

      // Send to AI service
      const response = await AIService.sendMessage(request)

      // Add AI response
      addMessage({
        role: 'assistant',
        content: response.message,
        scenarioId: request.scenarioId,
      })

      return response
    },
    onSuccess: (data, variables) => {
      // Handle task updates
      if (data.taskUpdate && variables.scenarioId) {
        completeTask(variables.scenarioId, data.taskUpdate.taskId, data.taskUpdate.feedback)
        addXP(25) // Award XP for completing tasks
      }

      // Handle scenario progress
      if (data.scenarioProgress && variables.scenarioId) {
        updateScenarioProgress(variables.scenarioId, data.scenarioProgress)
      }

      setLoading(false)

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['chat', variables.scenarioId] })
    },
    onError: error => {
      console.error('Failed to send message:', error)
      addMessage({
        role: 'system',
        content: 'Sorry, I encountered an error. Please try again.',
      })
      setLoading(false)
    },
  })
}

// Scenario hint query hook
export const useScenarioHint = (scenarioId: string, taskId: string, enabled = false) => {
  return useQuery({
    queryKey: ['hint', scenarioId, taskId],
    queryFn: () => AIService.getScenarioHint(scenarioId, taskId),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Custom hook for managing chat state
export const useChat = (scenarioId?: string) => {
  const { messages, isLoading, currentScenario } = useAppStore()
  const sendMessage = useSendMessage()

  const scenarioMessages = scenarioId
    ? messages.filter(msg => msg.scenarioId === scenarioId)
    : messages

  const handleSendMessage = (content: string, context?: string) => {
    if (content.trim()) {
      sendMessage.mutate({
        message: content,
        scenarioId,
        context,
      })
    }
  }

  return {
    messages: scenarioMessages,
    isLoading,
    currentScenario,
    sendMessage: handleSendMessage,
    error: sendMessage.error,
  }
}
