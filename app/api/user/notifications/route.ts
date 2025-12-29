import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  try {
    const notificationSettings = await request.json()
    
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization token required' },
        { status: 401 }
      )
    }

    // For now, just simulate saving the notification preferences
    // In a real app, you would save this to your database
    console.log('Notification preferences updated:', notificationSettings)
    
    return NextResponse.json({
      success: true,
      message: 'Notification preferences updated successfully'
    })
  } catch (error) {
    console.error('Error updating notification preferences:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization token required' },
        { status: 401 }
      )
    }

    // Return default notification preferences
    // In a real app, you would fetch this from your database
    const defaultNotifications = {
      emailMarketing: true,
      emailOrders: true,
      emailSecurity: true,
      smsMarketing: false,
      smsOrders: true,
      pushNotifications: true
    }
    
    return NextResponse.json({
      success: true,
      data: defaultNotifications
    })
  } catch (error) {
    console.error('Error fetching notification preferences:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}