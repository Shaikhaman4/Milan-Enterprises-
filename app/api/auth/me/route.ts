import { NextRequest, NextResponse } from 'next/server'

// Simple JWT verification for demo purposes
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
    firstName: 'Admin',
    lastName: 'User',
    role: 'SUPER_ADMIN',
    isActive: true
  }
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const secret = process.env.JWT_SECRET || 'default-secret'

    const decoded = verifySimpleToken(token, secret)
    
    // Find user by ID
    const user = users.find(u => u.id === decoded.id)
    
    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, message: 'User not found or inactive' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
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
    console.error('Auth verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 401 }
    )
  }
}