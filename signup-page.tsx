"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Brain, ArrowLeft, Sparkles, Heart, Star } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required"
    } else if (Number.parseInt(formData.age) < 13 || Number.parseInt(formData.age) > 120) {
      newErrors.age = "Please enter a valid age (13-120)"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    // Simulate signup process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // Here you would typically redirect to login or dashboard
    console.log("Signup successful:", formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute top-20 left-20 text-white/20 animate-float">
        <Heart className="h-8 w-8" />
      </div>
      <div className="absolute bottom-20 right-20 text-white/20 animate-float animation-delay-1000">
        <Star className="h-6 w-6" />
      </div>
      <div className="absolute top-1/4 right-1/3 text-white/20 animate-float animation-delay-2000">
        <Sparkles className="h-10 w-10" />
      </div>

      <Card className="w-full max-w-md shadow-2xl backdrop-blur-sm bg-white/95 border-0 relative z-10 max-h-[90vh] overflow-y-auto">
        <CardHeader className="space-y-6 text-center pb-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 rounded-2xl shadow-lg transform -rotate-3 hover:-rotate-6 transition-transform duration-300">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              MindMirror
            </h1>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-800">Join the Adventure! 🎉</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Let's create your personalized mind journey
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="What should we call you? ✨"
                value={formData.name}
                onChange={handleInputChange}
                className={`h-11 border-2 ${errors.name ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-cyan-400"} focus:ring-cyan-400 rounded-xl transition-all duration-200 bg-gray-50/50`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com 📧"
                value={formData.email}
                onChange={handleInputChange}
                className={`h-11 border-2 ${errors.email ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-cyan-400"} focus:ring-cyan-400 rounded-xl transition-all duration-200 bg-gray-50/50`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your phone number 📱"
                value={formData.phone}
                onChange={handleInputChange}
                className={`h-11 border-2 ${errors.phone ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-cyan-400"} focus:ring-cyan-400 rounded-xl transition-all duration-200 bg-gray-50/50`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-700 font-medium">
                Age
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="How young are you? 🎂"
                value={formData.age}
                onChange={handleInputChange}
                min="13"
                max="120"
                className={`h-11 border-2 ${errors.age ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-cyan-400"} focus:ring-cyan-400 rounded-xl transition-all duration-200 bg-gray-50/50`}
              />
              {errors.age && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.age}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Create Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Make it strong! 🔐"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`h-11 pr-12 border-2 ${errors.password ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-cyan-400"} focus:ring-cyan-400 rounded-xl transition-all duration-200 bg-gray-50/50`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-4 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="One more time! ✅"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`h-11 pr-12 border-2 ${errors.confirmPassword ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-cyan-400"} focus:ring-cyan-400 rounded-xl transition-all duration-200 bg-gray-50/50`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-4 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-base mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating your account...</span>
                </div>
              ) : (
                "Start My Journey! 🌈"
              )}
            </Button>
          </form>

          <div className="text-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-cyan-600 hover:text-cyan-700 hover:underline font-medium transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to sign in
            </Link>
          </div>

          <div className="text-center text-gray-600">
            Already part of the family?{" "}
            <Link
              href="/"
              className="text-cyan-600 hover:text-cyan-700 hover:underline font-semibold transition-colors"
            >
              Welcome back! 👋
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
