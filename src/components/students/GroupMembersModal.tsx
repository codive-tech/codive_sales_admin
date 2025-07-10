import React from 'react';
import { X, Users, Mail, MessageCircle, Eye, Hash } from 'lucide-react';
import { Student } from '../../types';

interface GroupMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupStudents: Student[];
  groupId: string;
  program: string;
}

export function GroupMembersModal({ 
  isOpen, 
  onClose, 
  groupStudents, 
  groupId, 
  program 
}: GroupMembersModalProps) {
  if (!isOpen) return null;

  const openWhatsApp = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#EAF6FF] px-6 py-4 border-b border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#0481FF] rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#003C64]">Group Members</h2>
                <p className="text-sm text-[#5D6D7E]">
                  {groupId} • {program} • {groupStudents.length} students
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#5D6D7E] hover:bg-[#F8F8F8] rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="grid gap-4">
            {groupStudents.map((student, index) => (
              <div
                key={student.id}
                className="bg-[#FDFEFF] border border-[#E0E0E0] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#0481FF] flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {student.fullName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-[#003C64]">{student.fullName}</h3>
                        <span className="text-xs bg-[#FFD600] text-[#003C64] px-2 py-1 rounded-full font-medium">
                          Member {student.groupMemberIndex || index + 1}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Hash className="h-3 w-3 text-[#0481FF]" />
                          <span className="text-[#5D6D7E]">Grade {student.grade}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-[#5D6D7E]" />
                          <span className="text-[#5D6D7E]">{student.email || 'No email'}</span>
                        </div>
                        {student.phoneNumber && (
                          <div className="flex items-center gap-2">
                            <div 
                              className="cursor-pointer hover:text-green-600" 
                              onClick={() => openWhatsApp(student.phoneNumber)}
                              title="Message via WhatsApp"
                            >
                              <MessageCircle className="h-3 w-3 text-green-500" />
                            </div>
                            <span className="text-[#5D6D7E]">{student.phoneNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 text-[#0481FF] hover:bg-[#EAF6FF] rounded-lg transition-colors"
                      title="View Student Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F8F8F8] px-6 py-4 border-t border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#5D6D7E]">
              Total: {groupStudents.length} students in this group
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#0481FF] text-white rounded-full hover:bg-[#0073E6] transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 