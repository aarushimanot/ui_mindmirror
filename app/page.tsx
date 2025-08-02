"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  Home,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Settings,
  Mic,
  Heart,
  Smile,
  Music,
  Play,
  Pause,
  Shield,
  Lock,
  Cloud,
  HardDrive,
  Volume2,
  SkipBack,
  SkipForward,
  Headphones,
  Wind,
  Waves,
  Sun,
  Moon,
  Sparkles,
  Rainbow,
  User,
  Edit,
  Mail,
} from "lucide-react"

// Helper function to get contextual prompts based on emotion
const getEmotionPrompt = (emotion: string, sentiment: string) => {
  const positiveEmotions = ["joy", "happiness", "excitement", "love", "gratitude", "content", "calm", "peaceful"]
  const negativeEmotions = ["sadness", "anger", "fear", "anxiety", "frustration", "disappointment", "loneliness"]

  const isPositive = positiveEmotions.includes(emotion.toLowerCase()) || sentiment.toLowerCase() === "positive"

  if (isPositive) {
    const happyPrompts = [
      {
        title: "Celebrating Your Joy! 🎉",
        message:
          "What a wonderful feeling! Your positive energy is shining through. Take a moment to savor this happiness and maybe share it with someone special. Consider writing down what brought you this joy so you can revisit it later. ✨",
        gradient: "from-emerald-50 to-teal-50",
        border: "border-emerald-200",
        iconBg: "from-emerald-400 to-teal-400",
        textColor: "text-emerald-800",
        messageColor: "text-emerald-700",
      },
    ]
    return happyPrompts[0]
  } else {
    const hopefulPrompts = [
      {
        title: "You're Stronger Than You Know 💪",
        message:
          "It's okay to feel this way - your emotions are valid. Remember that difficult feelings are temporary, and you have the strength to work through them. Consider reaching out to someone you trust or try one of our breathing exercises. Tomorrow is a new day full of possibilities. 🌅",
        gradient: "from-blue-50 to-indigo-50",
        border: "border-blue-200",
        iconBg: "from-blue-400 to-indigo-400",
        textColor: "text-blue-800",
        messageColor: "text-blue-700",
      },
    ]
    return hopefulPrompts[0]
  }
}

// Array of daily affirmations
const affirmations = [
  "You are capable of amazing things. Trust in your journey and embrace each moment with kindness. ✨",
  "Your thoughts create your reality. Choose positivity and watch your world transform. 🌟",
  "Every challenge you face is an opportunity to grow stronger and wiser. 💪",
  "You have the power to create positive change in your life, one small step at a time. 🌱",
  "Your mental health matters. Be gentle with yourself as you navigate life's ups and downs. 🤗",
  "Today is a new beginning. Release what no longer serves you and embrace fresh possibilities. 🌅",
  "You are worthy of love, happiness, and all the beautiful things life has to offer. 💖",
  "Your resilience is remarkable. You've overcome challenges before, and you can do it again. 🦋",
  "Take a deep breath. You are exactly where you need to be in this moment. 🌸",
  "Your emotions are valid. Honor them, learn from them, and let them guide you to healing. 🌈",
  "You are not alone in your journey. Support and love surround you, even when you can't see it. 🤝",
  "Progress, not perfection. Celebrate every small victory along your path to wellness. 🎉",
  "Your inner strength is limitless. Trust in your ability to handle whatever comes your way. ⭐",
  "Self-care isn't selfish—it's essential. Prioritize your wellbeing with compassion. 🛁",
  "You are writing your own story. Make it one of courage, growth, and self-love. 📖",
]

// Function to get a random affirmation
const getRandomAffirmation = () => {
  return affirmations[Math.floor(Math.random() * affirmations.length)]
}

// Mock data for mood tracking with more variety
const moodData = [
  { day: "Mon", mood: 7, emotion: "joy", energy: 6 },
  { day: "Tue", mood: 5, emotion: "neutral", energy: 4 },
  { day: "Wed", mood: 8, emotion: "joy", energy: 8 },
  { day: "Thu", mood: 4, emotion: "sadness", energy: 3 },
  { day: "Fri", mood: 9, emotion: "joy", energy: 9 },
  { day: "Sat", mood: 6, emotion: "calm", energy: 5 },
  { day: "Sun", mood: 7, emotion: "content", energy: 7 },
]

// Audio player component
function AudioPlayer({
  title,
  duration,
  icon: Icon,
  gradient,
}: {
  title: string
  duration: string
  icon: any
  gradient: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([75])
  const intervalRef = useRef<NodeJS.Timeout>()

  const totalDuration = Number.parseInt(duration.split(":")[0]) * 60 + Number.parseInt(duration.split(":")[1])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, totalDuration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={`p-4 rounded-xl border ${gradient} backdrop-blur-sm`}>
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-white text-sm">{title}</h4>
          <p className="text-white/80 text-xs">{duration}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white"
            onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
          >
            <SkipBack className="w-3 h-3" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-10 w-10 p-0 bg-white/30 hover:bg-white/40 text-white rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white"
            onClick={() => setCurrentTime(Math.min(totalDuration, currentTime + 10))}
          >
            <SkipForward className="w-3 h-3" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/80">
            <span>{formatTime(currentTime)}</span>
            <span>{duration}</span>
          </div>
          <Progress value={(currentTime / totalDuration) * 100} className="h-1 bg-white/20" />
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 className="w-3 h-3 text-white/80" />
          <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1 h-1" />
        </div>
      </div>
    </div>
  )
}

export default function MoodJournalApp() {
  const [journalEntry, setJournalEntry] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [cloudStorage, setCloudStorage] = useState(true)
  const [biometricLock, setBiometricLock] = useState(false)
  const [currentEmotion] = useState("joy")
  const [currentSentiment] = useState("positive")
  const [currentAffirmation] = useState(() => getRandomAffirmation())

  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0])
  const [journalEntries, setJournalEntries] = useState<{ [key: string]: string }>({
    [new Date().toISOString().split("T")[0]]: "",
  })

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would go here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-sky-50 to-emerald-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300/20 to-violet-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-violet-200/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  MindMirror
                </span>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-500">Your wellness companion</span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md hover:shadow-lg transition-all"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Home</span>
              </a>
              <button
                onClick={() => {
                  const dates = Object.keys(journalEntries)
                  const currentIndex = dates.indexOf(currentDate)
                  const nextIndex = (currentIndex + 1) % Math.max(dates.length, 3)
                  const availableDates = [
                    new Date().toISOString().split("T")[0],
                    new Date(Date.now() - 86400000).toISOString().split("T")[0],
                    new Date(Date.now() - 172800000).toISOString().split("T")[0],
                  ]
                  setCurrentDate(availableDates[nextIndex])
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-violet-100 hover:text-violet-600 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Journal</span>
              </button>
              <a
                href="#"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-emerald-100 hover:text-emerald-600 transition-all"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Suggestions</span>
              </a>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gradient-to-br from-white to-violet-50/50 backdrop-blur-md">
                  <SheetHeader>
                    <SheetTitle className="text-gray-800 flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-violet-500" />
                      <span>Settings</span>
                    </SheetTitle>
                    <SheetDescription className="text-gray-600 font-sans">
                      Customize your MindMirror experience
                    </SheetDescription>
                  </SheetHeader>

                  <div className="space-y-6 mt-6">
                    {/* My Profile Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-800 flex items-center space-x-2">
                        <User className="w-4 h-4 text-violet-500" />
                        <span>My Profile</span>
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-violet-50 border border-violet-200">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-violet-500" />
                            <Label className="text-sm font-medium font-sans">Edit Profile</Label>
                          </div>
                          <Button size="sm" variant="ghost" className="h-8 px-3 hover:bg-violet-200">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-pink-50 border border-pink-200">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-pink-500" />
                            <Label className="text-sm font-medium font-sans">Notifications</Label>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-800 flex items-center space-x-2">
                        <Cloud className="w-4 h-4 text-blue-500" />
                        <span>Storage Options</span>
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                          <div className="flex items-center space-x-2">
                            <Cloud className="w-4 h-4 text-blue-500" />
                            <Label htmlFor="cloud-storage" className="text-sm font-medium font-sans">
                              Cloud Storage
                            </Label>
                          </div>
                          <Switch id="cloud-storage" checked={cloudStorage} onCheckedChange={setCloudStorage} />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                          <div className="flex items-center space-x-2">
                            <HardDrive className="w-4 h-4 text-emerald-500" />
                            <Label htmlFor="local-storage" className="text-sm font-medium font-sans">
                              Local Storage
                            </Label>
                          </div>
                          <Switch
                            id="local-storage"
                            checked={!cloudStorage}
                            onCheckedChange={(checked) => setCloudStorage(!checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-800 flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-purple-500" />
                        <span>Security</span>
                      </h3>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 border border-purple-200">
                        <div className="flex items-center space-x-2">
                          <Lock className="w-4 h-4 text-purple-500" />
                          <Label htmlFor="biometric-lock" className="text-sm font-medium font-sans">
                            Biometric Lock
                          </Label>
                        </div>
                        <Switch id="biometric-lock" checked={biometricLock} onCheckedChange={setBiometricLock} />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Journal Entry */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Journal Card */}
            <Card className="bg-white/80 backdrop-blur-md border-violet-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-t-lg">
                <CardTitle className="text-gray-800 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <span>
                    Daily Journal -{" "}
                    {new Date(currentDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <Rainbow className="w-4 h-4 text-pink-400 animate-pulse" />
                </CardTitle>
                <CardDescription className="text-gray-600">
                  How are you feeling today? Share your thoughts or record a voice note! 🎤
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Textarea
                  placeholder="Write about your day, feelings, or anything on your mind... ✨"
                  value={journalEntries[currentDate] || ""}
                  onChange={(e) => setJournalEntries((prev) => ({ ...prev, [currentDate]: e.target.value }))}
                  className="min-h-[120px] bg-gradient-to-br from-white to-violet-50/30 border-violet-200 focus:border-violet-400 resize-none text-gray-700 placeholder:text-gray-400"
                />
                <div className="flex items-center justify-between">
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    onClick={handleVoiceRecord}
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      isRecording
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
                        : "border-violet-200 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 hover:border-violet-300"
                    }`}
                  >
                    <Mic className={`w-4 h-4 ${isRecording ? "animate-pulse" : ""}`} />
                    <span>{isRecording ? "Stop Recording" : "Voice Note"}</span>
                  </Button>
                  <Button className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Save Entry ✨
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emotion Detection Results */}
            <Card className="bg-white/80 backdrop-blur-md border-pink-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-t-lg">
                <CardTitle className="text-gray-800 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <Smile className="w-4 h-4 text-white" />
                  </div>
                  <span>Emotion Detection Results</span>
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm text-gray-600 font-medium">Detected Emotion</Label>
                    <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm px-4 py-2 shadow-md">
                      😊 Joy
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm text-gray-600 font-medium">Sentiment</Label>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm px-4 py-2 shadow-md">
                      ✨ Positive
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Label className="text-sm text-gray-600 font-medium">Confidence Level</Label>
                  <div className="relative">
                    <Progress value={85} className="h-3 bg-gray-200" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full h-3"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center space-x-1">
                    <span>85% confidence</span>
                    <Heart className="w-3 h-3 text-pink-400" />
                  </p>
                </div>

                {/* Contextual Prompt based on emotion */}
                {(() => {
                  const prompt = getEmotionPrompt(currentEmotion, currentSentiment)
                  return (
                    <div
                      className={`mt-6 p-4 bg-gradient-to-br ${prompt.gradient} rounded-xl border ${prompt.border} shadow-sm`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-8 h-8 bg-gradient-to-r ${prompt.iconBg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${prompt.textColor} mb-2 flex items-center space-x-2`}>
                            <span>{prompt.title}</span>
                          </h4>
                          <p className={`text-sm ${prompt.messageColor} leading-relaxed`}>{prompt.message}</p>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>

            {/* Mood Tracker */}
            <Card className="bg-white/80 backdrop-blur-md border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-t-lg">
                <CardTitle className="text-gray-800 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span>Mood Tracker</span>
                  <Sun className="w-4 h-4 text-yellow-500 animate-pulse" />
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Your mood and energy trends over the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moodData}>
                      <defs>
                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis domain={[0, 10]} stroke="#6b7280" />
                      <Area type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={3} fill="url(#moodGradient)" />
                      <Area
                        type="monotone"
                        dataKey="energy"
                        stroke="#10b981"
                        strokeWidth={3}
                        fill="url(#energyGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Mood</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Energy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Wellness Suggestions */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-md border-yellow-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-t-lg">
                <CardTitle className="text-gray-800 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <span>Wellness Suggestions</span>
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-bounce" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Affirmation Quote */}
                <div className="p-5 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl border border-violet-200 shadow-md">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-violet-500" />
                    <span>Daily Affirmation</span>
                    <div className="ml-auto">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-violet-200 rounded-full"
                        onClick={() => window.location.reload()}
                        title="Get new affirmation"
                      >
                        <Sparkles className="w-3 h-3 text-violet-500" />
                      </Button>
                    </div>
                  </h4>
                  <p className="text-sm text-gray-700 italic leading-relaxed">"{currentAffirmation}"</p>
                </div>

                {/* Music Playlist with Audio Player */}
                <AudioPlayer
                  title="Calming Nature Sounds 🎵"
                  duration="15:30"
                  icon={Music}
                  gradient="bg-gradient-to-br from-emerald-400 to-teal-500 border-emerald-300"
                />

                {/* Guided Breathing with Audio Player */}
                <AudioPlayer
                  title="Deep Breathing Exercise 🌬️"
                  duration="5:00"
                  icon={Wind}
                  gradient="bg-gradient-to-br from-blue-400 to-cyan-500 border-blue-300"
                />

                {/* Ocean Sounds */}
                <AudioPlayer
                  title="Ocean Waves Meditation 🌊"
                  duration="20:00"
                  icon={Waves}
                  gradient="bg-gradient-to-br from-indigo-400 to-purple-500 border-indigo-300"
                />

                {/* Evening Meditation */}
                <div className="p-5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl border border-indigo-200 shadow-md">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                    <Moon className="w-4 h-4 text-indigo-500" />
                    <span>Evening Meditation</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">Peaceful bedtime relaxation session</p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Play className="w-3 h-3 mr-2" />
                    Watch Video
                  </Button>
                </div>

                {/* Headphone Recommendation */}
                <div className="p-5 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl border border-pink-200 shadow-md">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                    <Headphones className="w-4 h-4 text-pink-500" />
                    <span>Audio Tip</span>
                  </h4>
                  <p className="text-sm text-gray-600">
                    Use headphones for the best immersive experience with our audio content! 🎧
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-md border-t border-violet-200/50 mt-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span>Your privacy is protected. All data is encrypted and secure. 🔒</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>MindMirror v2.1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
