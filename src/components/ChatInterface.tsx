import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { useAppStore } from '@/store/useAppStore'
import { useChat, useScenarioHint } from '@/hooks/useChat'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeft, Send, Bot, User, Lightbulb, CheckCircle, Clock, Target } from 'lucide-react'
import { format } from 'date-fns'

export default function ChatInterface() {
  const { scenarioId } = useParams({ from: '/chat/$scenarioId' })
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { scenarios, setCurrentScenario } = useAppStore()
  const { messages, isLoading, sendMessage } = useChat(scenarioId)
  const { data: hint } = useScenarioHint(scenarioId, selectedTaskId, showHint)

  const currentScenario = scenarios.find(s => s.id === scenarioId)

  useEffect(() => {
    if (currentScenario) {
      setCurrentScenario(currentScenario)
    }
  }, [currentScenario, setCurrentScenario])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleGetHint = (taskId: string) => {
    setSelectedTaskId(taskId)
    setShowHint(true)
  }

  if (!currentScenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Scenario not found</p>
            <Button onClick={() => navigate({ to: '/' })} className="w-full mt-4">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate({ to: '/' })}>
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{currentScenario.title}</h1>
            <p className="text-muted-foreground">{currentScenario.role}</p>
          </div>

          <Badge variant="secondary">{currentScenario.difficulty}</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Scenario Info */}
          <div className="lg:col-span-1 space-y-4">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span>{Math.round(currentScenario.progress)}%</span>
                  </div>
                  <Progress value={currentScenario.progress} className="h-2" />

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {currentScenario.estimatedTime}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tasks Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentScenario.tasks.map(task => (
                    <div key={task.id} className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {task.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${
                              task.completed ? 'text-muted-foreground line-through' : ''
                            }`}
                          >
                            {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{task.description}</p>
                          {task.feedback && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                              {task.feedback}
                            </p>
                          )}
                        </div>
                      </div>

                      {!task.completed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleGetHint(task.id)}
                          className="ml-7 h-8 text-xs gap-1"
                        >
                          <Lightbulb className="h-3 w-3" />
                          Get Hint
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hint Display */}
            {showHint && hint && (
              <Card className="border-yellow-200 dark:border-yellow-800">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <Lightbulb className="h-4 w-4" />
                    Hint
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{hint}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHint(false)}
                    className="mt-2 h-8 text-xs"
                  >
                    Close
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Mentor Chat
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.length === 0 && (
                      <div className="text-center text-muted-foreground py-8">
                        <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Welcome! I'm your AI mentor for this scenario.</p>
                        <p className="text-sm">Send a message to get started!</p>
                      </div>
                    )}

                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <Avatar className="flex-shrink-0">
                          <AvatarFallback>
                            {message.role === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </AvatarFallback>
                        </Avatar>

                        <div
                          className={`flex-1 max-w-[80%] ${
                            message.role === 'user' ? 'text-right' : 'text-left'
                          }`}
                        >
                          <div
                            className={`inline-block p-3 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(message.timestamp, 'HH:mm')}
                          </p>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  <Separator className="mb-4" />

                  {/* Input Area */}
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
