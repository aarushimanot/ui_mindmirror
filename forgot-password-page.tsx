"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowLeft, Mail, CheckCircle, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending reset email
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsEmailSent(true)
  }

  const handleResendEmail = async () => {
    setIsLoading(true)

    // Simulate resending email
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating icons */}
        <div className="absolute top-20 left-20 text-white/20 animate-float">
          <Sparkles className="h-8 w-8" />
        </div>
        <div className="absolute bottom-20 right-20 text-white/20 animate-float animation-delay-1000">
          <Zap className="h-6 w-6" />
        </div>

        <Card className="w-full max-w-md shadow-2xl backdrop-blur-sm bg-white/95 border-0 relative z-10">
          <CardHeader className="space-y-6 text-center pb-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-teal-500 via-blue-500 to-purple-500 rounded-2xl shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                MindMirror
              </h1>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 text-center px-8 pb-8">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">Check your email! 📧</h2>
              <p className="text-gray-600">We've sent a password reset link to</p>
              <p className="font-semibold text-lg bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                {email}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-sm text-gray-600">{"Didn't receive the email? Check your spam folder or"}</p>

              <Button
                variant="outline"
                onClick={handleResendEmail}
                disabled={isLoading}
                className="w-full h-11 border-2 border-teal-300 text-teal-600 hover:bg-teal-50 rounded-xl font-medium transition-all duration-200 bg-transparent"
              >
                {isLoading ? "Resending... ⏳" : "Resend email 🔄"}
              </Button>
            </div>

            <div className="pt-6">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700 hover:underline font-medium transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute top-20 left-20 text-white/20 animate-float">
        <Sparkles className="h-8 w-8" />
      </div>
      <div className="absolute bottom-20 right-20 text-white/20 animate-float animation-delay-1000">
        <Zap className="h-6 w-6" />
      </div>

      <Card className="w-full max-w-md shadow-2xl backdrop-blur-sm bg-white/95 border-0 relative z-10">
        <CardHeader className="space-y-6 text-center pb-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-teal-500 via-blue-500 to-purple-500 rounded-2xl shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              MindMirror
            </h1>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-800">Forgot your password? 🤔</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              {"No worries! We'll help you reset it"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-12 border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl transition-all duration-200 bg-gray-50/50"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 hover:from-teal-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-base"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending reset link...</span>
                </div>
              ) : (
                "Send reset link 🚀"
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}
