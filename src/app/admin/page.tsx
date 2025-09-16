"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Search, Filter, Download, Mail, AlertCircle } from "lucide-react"

interface Order {
  id: string
  status: string
  productUrl: string
  brandVoice: string
  targetAudience: string
  outputFiles: string[]
  createdAt: string
  updatedAt: string
  user: {
    email: string
    name: string | null
  }
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Check if already authenticated
    const isAuth = localStorage.getItem('admin_authenticated')
    if (isAuth === 'true') {
      setAuthenticated(true)
      fetchOrders()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setAuthenticated(true)
        localStorage.setItem('admin_authenticated', 'true')
        fetchOrders()
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Authentication failed')
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders')
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
      const data = await response.json()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DONE':
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>
      case 'PROCESSING':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case 'FAILED':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Queued</Badge>
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) || 
                         order.user.email.includes(searchTerm) ||
                         order.productUrl?.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleResendEmail = async (orderId: string) => {
    try {
      const response = await fetch(`/api/admin/resend-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      })

      if (response.ok) {
        alert('Email sent successfully')
      } else {
        alert('Failed to send email')
      }
    } catch (err) {
      alert('Error sending email')
    }
  }

  const handleRetryJob = async (orderId: string) => {
    try {
      const response = await fetch(`/api/admin/retry-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      })

      if (response.ok) {
        alert('Job queued for retry')
        fetchOrders()
      } else {
        alert('Failed to retry job')
      }
    } catch (err) {
      alert('Error retrying job')
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter the admin password to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <div className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">{orders.length} total orders</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchOrders}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                localStorage.removeItem('admin_authenticated')
                setAuthenticated(false)
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'DONE').length}
                </div>
                <p className="text-sm text-gray-600">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => o.status === 'PROCESSING').length}
                </div>
                <p className="text-sm text-gray-600">Processing</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'QUEUED').length}
                </div>
                <p className="text-sm text-gray-600">Queued</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600">
                  {orders.filter(o => o.status === 'FAILED').length}
                </div>
                <p className="text-sm text-gray-600">Failed</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="QUEUED">Queued</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Manage and monitor all orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-4" />
                  <p>Loading orders...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold">Order #{order.id.slice(-8)}</h3>
                            <p className="text-sm text-gray-600">{order.user.email}</p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="flex gap-2">
                          {order.status === 'DONE' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleResendEmail(order.id)}
                            >
                              <Mail className="h-4 w-4 mr-1" />
                              Resend Email
                            </Button>
                          )}
                          {order.status === 'FAILED' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRetryJob(order.id)}
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Retry
                            </Button>
                          )}
                          {order.outputFiles && order.outputFiles.length > 0 && (
                            <Button size="sm" asChild>
                              <a href={`/gallery/${order.id}`}>
                                <Download className="h-4 w-4 mr-1" />
                                View
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <strong>Product:</strong> {order.productUrl || 'Not provided'}
                        </div>
                        <div>
                          <strong>Brand Voice:</strong> {order.brandVoice || 'Not specified'}
                        </div>
                        <div>
                          <strong>Created:</strong> {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      {order.outputFiles && order.outputFiles.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                          <strong>Output:</strong> {order.outputFiles.length} videos generated
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No orders found matching your criteria
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
