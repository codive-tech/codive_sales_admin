import React, { useState } from 'react';
import { MessageSquare, Mail } from 'lucide-react';

// Brand colors
const colors = {
  primary: '#00AEEF',
  hoverBlue: '#0095D9',
  success: '#49c57a',
  textLight: '#FFFFFF'
};

interface SendLinkButtonsProps {
  paymentLink: string;
  paymentName: string;
  courseTitle: string;
  amount: number;
}

export const SendLinkButtons: React.FC<SendLinkButtonsProps> = ({
  paymentLink,
  paymentName,
  courseTitle,
  amount
}) => {
  const [showTooltip, setShowTooltip] = useState<'whatsapp' | 'email' | null>(null);

  const handleWhatsApp = () => {
    const message = `Hi! Here's your Codive payment link for ${courseTitle}:\n\n${paymentLink}\n\nAmount: ₹${amount.toLocaleString()}\n\nPlease complete the payment before the link expires.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = `Codive Payment Link - ${courseTitle}`;
    const body = `Dear ${paymentName},\n\nHere's your payment link for the ${courseTitle} course:\n\nPayment Link: ${paymentLink}\nAmount: ₹${amount.toLocaleString()}\n\nPlease complete the payment before the link expires.\n\nBest regards,\nCodive Team`;
    
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* WhatsApp Button */}
      <div className="relative">
        <button
          onClick={handleWhatsApp}
          onMouseEnter={() => setShowTooltip('whatsapp')}
          onMouseLeave={() => setShowTooltip(null)}
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageSquare size={16} style={{ color: colors.textLight }} />
        </button>
        
        {/* WhatsApp Tooltip */}
        {showTooltip === 'whatsapp' && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
            Send link via WhatsApp
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      {/* Email Button */}
      <div className="relative">
        <button
          onClick={handleEmail}
          onMouseEnter={() => setShowTooltip('email')}
          onMouseLeave={() => setShowTooltip(null)}
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: colors.primary }}
        >
          <Mail size={16} style={{ color: colors.textLight }} />
        </button>
        
        {/* Email Tooltip */}
        {showTooltip === 'email' && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
            Send link via Email
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  );
}; 