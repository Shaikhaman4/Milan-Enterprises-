# Profile Page Features

## Password Change Feature

### Frontend Implementation
- **Location**: `app/account/profile/page.tsx`
- **Modal**: Password change modal with current password, new password, and confirm password fields
- **Validation**: 
  - Checks if new passwords match
  - Ensures minimum 6 character length
  - Shows/hides password visibility
- **API Integration**: Calls `/api/auth/change-password` endpoint

### Backend Implementation
- **Controller**: `backend/src/controllers/authController.ts` - `changePassword` function
- **Route**: `backend/src/routes/auth.ts` - `PUT /api/auth/change-password`
- **Validation**: 
  - Verifies current password
  - Hashes new password with bcrypt
  - Updates user password in database

### API Route (Next.js)
- **Location**: `app/api/auth/change-password/route.ts`
- **Purpose**: Proxy requests from frontend to backend API
- **Authentication**: Forwards Bearer token to backend

## Notification Preferences Feature

### Frontend Implementation
- **Location**: `app/account/profile/page.tsx`
- **Modal**: Notification preferences modal with checkboxes for:
  - Email notifications (orders, security, marketing)
  - SMS notifications (orders, marketing)
  - Push notifications
- **State Management**: Uses React state to manage notification settings

### API Implementation
- **Location**: `app/api/user/notifications/route.ts`
- **Methods**: 
  - `GET`: Fetch current notification preferences
  - `PUT`: Update notification preferences
- **Note**: Currently simulated - needs backend integration for persistence

## Toast Notifications

### Implementation
- **Component**: Custom Toast component in profile page
- **Types**: Success and error notifications
- **Auto-dismiss**: Automatically disappears after 5 seconds
- **Usage**: Shows feedback for all user actions

## Features Working

✅ **Password Change Modal**
- Opens when "Change Password" button is clicked
- Form validation for password requirements
- Password visibility toggle
- API integration with backend
- Success/error toast notifications

✅ **Notification Preferences Modal**
- Opens when "Notification Preferences" button is clicked
- Checkbox controls for different notification types
- Save functionality with API integration
- Success/error toast notifications

✅ **Toast Notifications**
- Success notifications for successful operations
- Error notifications for failed operations
- Auto-dismiss functionality
- Proper styling and positioning

## Setup Requirements

### Backend Setup
1. Ensure backend server is running on port 5000
2. Database should be set up with Prisma
3. JWT authentication should be configured

### Frontend Setup
1. Next.js development server should be running on port 3000
2. API routes are configured to proxy to backend
3. Authentication token should be stored in localStorage

## Testing

### Password Change
1. Click "Change Password" button
2. Fill in current password, new password, and confirm password
3. Click "Change Password" button
4. Should show success toast if passwords are valid and current password is correct

### Notification Preferences
1. Click "Notification Preferences" button
2. Toggle various notification settings
3. Click "Save Preferences" button
4. Should show success toast

## Error Handling

- **Network Errors**: Shows "Network error. Please try again." message
- **Validation Errors**: Shows specific validation error messages
- **Authentication Errors**: Shows "Authorization token required" message
- **Server Errors**: Shows server-provided error messages or generic error message

## Future Enhancements

1. **Backend Integration for Notifications**: Add database table for user notification preferences
2. **Email Verification**: Add email verification for password changes
3. **Password Strength Indicator**: Visual indicator for password strength
4. **Notification History**: Show history of sent notifications
5. **Real-time Updates**: WebSocket integration for real-time notification updates