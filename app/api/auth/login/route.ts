import { NextRequest, NextResponse } from 'next/server'

// Simple JWT implementation for demo purposes
function createSimpleToken(payload: any, secret: string): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }))
  const signature = btoa(`${encodedHeader}.${encodedPayload}.${secret}`)
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

function verifySimpleToken(token: string, secret: string): any {
  try {
    const [header, payload, signature] = token.split('.')
    const expectedSignature = btoa(`${header}.${payload}.${secret}`)
    
    if (signature !== expectedSignature) {
      throw new Error('Invalid signature')
    }
    
    const decodedPayload = JSON.parse(atob(payload))
    
    if (decodedPayload.exp < Date.now()) {
      throw new Error('Token expired')
    }
    
    return decodedPayload
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// Mock user data - in production, this would come from your database
const users = [
  {
    id: '1',
    email: 'admin@cleancare.com',
    password: 'admin123', // In production, this would be hashed
    firstName: 'Admin',
    lastName: 'User',
    role: 'SUPER_ADMIN',
    isActive: true
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Simple password check (in production, use bcrypt)
    if (password !== user.password) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Account is inactive' },
        { status: 401 }
      )
    }

    const secret = process.env.JWT_SECRET || 'default-secret'

    // Generate simple token
    const token = createSimpleToken(
      { 
        id: user.id,
        email: user.email,
        role: user.role
      },
      secret
    )

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}