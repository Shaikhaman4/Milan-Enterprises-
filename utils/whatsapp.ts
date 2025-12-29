import { CartItem } from '@/store/cartStore'

interface CustomerDetails {
  name: string
  phone: string
  email?: string
  address?: string
}

export const generateWhatsAppMessage = (
  items: CartItem[],
  customerDetails: CustomerDetails,
  total: number
): string => {
  let message = `🛒 *New Order from Milan Enterprises Website*\n\n`
  
  // Customer Details
  message += `👤 *Customer Details:*\n`
  message += `Name: ${customerDetails.name}\n`
  message += `Phone: ${customerDetails.phone}\n`
  if (customerDetails.email) {
    message += `Email: ${customerDetails.email}\n`
  }
  if (customerDetails.address) {
    message += `Address: ${customerDetails.address}\n`
  }
  message += `\n`
  
  // Order Items
  message += `📦 *Order Items:*\n`
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`
    message += `   Qty: ${item.quantity} × ₹${Math.round(item.price)} = ₹${Math.round(item.quantity * item.price)}\n`
    if (item.variant) {
      message += `   Variant: ${item.variant}\n`
    }
    message += `\n`
  })
  
  // Total Amount
  message += `💰 *Total Amount: ₹${Math.round(total)}*\n\n`
  
  message += `📞 Please confirm this order and let me know the delivery details.\n`
  message += `Thank you for choosing Milan Enterprises! 🏠✨`
  
  return message
}

export const sendWhatsAppOrder = (
  items: CartItem[],
  customerDetails: CustomerDetails,
  total: number
): void => {
  const message = generateWhatsAppMessage(items, customerDetails, total)
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/919284992154?text=${encodedMessage}`
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank')
}