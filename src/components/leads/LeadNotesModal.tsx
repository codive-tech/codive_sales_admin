import React, { useState, useEffect } from 'react';
import { X, Plus, MessageSquare, Calendar, User, CheckCircle, AlertCircle } from 'lucide-react';
import { Lead, LeadNote } from '../../types';

interface LeadNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onAddNote: (leadId: string, note: Omit<LeadNote, 'id' | 'createdAt'>) => void;
}

// Mock notes data - in a real app, this would come from an API
const mockNotes: LeadNote[] = [
  {
    id: '1',
    leadId: 'lead_1',
    content: 'Initial contact made via WhatsApp. Parent showed interest in swimming program.',
    type: 'contact',
    createdAt: '2024-01-15T10:30:00Z',
    createdBy: 'Admin'
  },
  {
    id: '2',
    leadId: 'lead_1',
    content: 'Follow-up scheduled for next week. Parent wants to discuss pricing.',
    type: 'followup',
    createdAt: '2024-01-16T14:20:00Z',
    createdBy: 'Admin'
  },
  {
    id: '3',
    leadId: 'lead_1',
    content: 'Parent interested in B2C track. Recommended beginner swimming course.',
    type: 'admin',
    createdAt: '2024-01-17T09:15:00Z',
    createdBy: 'Admin'
  }
];

export const LeadNotesModal: React.FC<LeadNotesModalProps> = ({
  isOpen,
  onClose,
  lead,
  onAddNote
}) => {
  const [notes, setNotes] = useState<LeadNote[]>(mockNotes);
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<LeadNote['type']>('contact');

  useEffect(() => {
    if (isOpen && lead) {
      // Filter notes for this specific lead
      const leadNotes = mockNotes.filter(note => note.leadId === lead.id);
      setNotes(leadNotes);
    }
  }, [isOpen, lead]);

  const handleAddNote = () => {
    if (!newNote.trim() || !lead) return;

    const noteData: Omit<LeadNote, 'id' | 'createdAt'> = {
      leadId: lead.id,
      content: newNote.trim(),
      type: noteType,
      createdBy: 'Admin'
    };

    onAddNote(lead.id, noteData);
    
    // Add to local state for immediate display
    const newNoteObj: LeadNote = {
      ...noteData,
      id: `note_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    setNotes(prev => [newNoteObj, ...prev]);
    setNewNote('');
    setNoteType('contact');
  };

  const getNoteIcon = (type: LeadNote['type']) => {
    switch (type) {
      case 'contact':
        return <MessageSquare size={16} className="text-[#00AEEF]" />;
      case 'followup':
        return <Calendar size={16} className="text-[#FFD600]" />;
      case 'admin':
        return <User size={16} className="text-[#1E2A3B]" />;
      case 'conversion':
        return <CheckCircle size={16} className="text-[#49c57a]" />;
      default:
        return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  const getNoteTypeLabel = (type: LeadNote['type']) => {
    switch (type) {
      case 'contact':
        return 'Contact';
      case 'followup':
        return 'Follow-up';
      case 'admin':
        return 'Admin Note';
      case 'conversion':
        return 'Conversion';
      default:
        return 'Note';
    }
  };

  const getNoteTypeColor = (type: LeadNote['type']) => {
    switch (type) {
      case 'contact':
        return 'bg-[#00AEEF] text-white';
      case 'followup':
        return 'bg-[#FFD600] text-[#1E2A3B]';
      case 'admin':
        return 'bg-[#1E2A3B] text-white';
      case 'conversion':
        return 'bg-[#49c57a] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#1E2A3B]">Lead Notes</h3>
              <p className="text-sm text-gray-600 mt-1">{lead.fullName} - {lead.programOfInterest}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(90vh-140px)]">
          {/* Notes Timeline */}
          <div className="flex-1 overflow-y-auto p-6">
            {notes.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h4>
                <p className="text-gray-500">Add your first note to start tracking this lead's journey.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {notes.map((note, index) => (
                  <div key={note.id} className="flex space-x-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                        {getNoteIcon(note.type)}
                      </div>
                      {index < notes.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                      )}
                    </div>

                    {/* Note Content */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getNoteTypeColor(note.type)}`}>
                          {getNoteTypeLabel(note.type)}
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(note.createdAt)}</span>
                      </div>
                      <p className="text-[#333333] text-sm leading-relaxed">{note.content}</p>
                      {note.createdBy && (
                        <p className="text-xs text-gray-500 mt-2">Added by {note.createdBy}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Note Form */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <h4 className="text-sm font-medium text-[#1E2A3B] mb-3">Add New Note</h4>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as LeadNote['type'])}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                >
                  <option value="contact">Contact</option>
                  <option value="followup">Follow-up</option>
                  <option value="admin">Admin Note</option>
                  <option value="conversion">Conversion</option>
                </select>
              </div>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter your note here..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent resize-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  <Plus size={16} />
                  <span>Add Note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 