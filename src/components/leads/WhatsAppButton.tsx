import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  leadName: string;
  programOfInterest: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  leadName,
  programOfInterest
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleWhatsAppClick = () => {
    // Remove any non-numeric characters and ensure it starts with country code
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
    
    const message = `Hi ${leadName}! 👋\n\nThank you for your interest in our ${programOfInterest} program at Codive.\n\nI'd love to discuss how we can help you achieve your goals. When would be a good time to connect?\n\nBest regards,\nCodive Team`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: '#25D366' }}
        title="Message Lead via WhatsApp"
      >
        <MessageSquare size={16} className="text-white" />
      </button>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
          Message Lead via WhatsApp
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}; 