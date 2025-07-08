import React, { useState, useRef } from 'react';
import { 
  XCircle, 
  Upload, 
  FileText, 
  Image, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';
import { toast } from 'react-toastify';
import { PaymentVerification, PaymentVerificationForm } from '../../types';

// Brand colors
const colors = {
  primary: '#00AEEF',
  navy: '#1E2A3B',
  background: '#E6F6FB',
  accentLightBlue: '#D0F0FA',
  accentYellow: '#FFD600',
  textDark: '#333333',
  textLight: '#FFFFFF',
  borderGrey: '#E0E0E0',
  hoverBlue: '#0095D9',
  activeBlue: '#0074B7',
  success: '#49c57a',
  error: '#f55a5a',
  warning: '#f59e0b'
};

interface PaymentVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: PaymentVerification;
  onUpdate: (paymentId: string, formData: PaymentVerificationForm) => void;
}

// File Upload Component
const FileUpload = ({ 
  label, 
  accept, 
  file, 
  onFileChange, 
  required = false,
  preview 
}: { 
  label: string; 
  accept: string; 
  file?: File; 
  onFileChange: (file: File) => void; 
  required?: boolean;
  preview?: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.match(accept.replace('*', '.*'))) {
      onFileChange(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const getFileIcon = () => {
    if (!file) return <Upload size={24} />;
    
    if (file.type.startsWith('image/')) {
      return <Image size={24} />;
    }
    if (file.type.includes('pdf')) {
      return <FileText size={24} />;
    }
    return <FileText size={24} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {!file ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload size={32} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {accept === 'image/*' ? 'PNG, JPG, PDF up to 10MB' : 'PDF, DOC, DOCX up to 10MB'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gray-100">
                {getFileIcon()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {preview && file.type.startsWith('image/') && (
                <button
                  type="button"
                  onClick={() => {
                    const url = URL.createObjectURL(file);
                    window.open(url, '_blank');
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Eye size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={() => onFileChange(undefined as any)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <XCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export const PaymentVerificationModal: React.FC<PaymentVerificationModalProps> = ({
  isOpen,
  onClose,
  payment,
  onUpdate
}) => {
  const [formData, setFormData] = useState<PaymentVerificationForm>({
    status: payment.status,
    paymentNotes: payment.paymentNotes || '',
    receiptFile: payment.receiptFile,
    proofImage: payment.proofImage
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (formData.status === 'partial' && !formData.receiptFile) {
      toast.error('Receipt upload is required for partial payments');
      return;
    }

    if (!formData.receiptFile) {
      toast.error('Receipt upload is required');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onUpdate(payment.id, formData);
      toast.success(`Payment marked as ${formData.status}`);
      onClose();
    } catch (error) {
      toast.error('Failed to update payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (field: 'receiptFile' | 'proofImage') => (file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: colors.navy }}>
                Payment Verification
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Update payment status and upload verification documents
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XCircle size={20} />
            </button>
          </div>
        </div>

        {/* Payment Details */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Payment ID:</span>
              <p className="font-medium">{payment.paymentIdGenerated}</p>
            </div>
            <div>
              <span className="text-gray-500">Amount:</span>
              <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-500">Course:</span>
              <p className="font-medium">{payment.courseTitle}</p>
            </div>
            <div>
              <span className="text-gray-500">Current Status:</span>
              <div className="flex items-center space-x-2 mt-1">
                <div 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                    payment.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </div>
                {payment.isVerified && (
                  <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <CheckCircle size={12} />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Status Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                status: e.target.value as 'paid' | 'partial' | 'pending' 
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="paid">✅ Paid</option>
              <option value="partial">🟡 Partial</option>
              <option value="pending">🔴 Pending</option>
            </select>
          </div>

          {/* Partial Payment Warning */}
          {formData.status === 'partial' && (
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-start space-x-3">
                <AlertCircle size={20} className="text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Partial Payment Notice
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Receipt upload is required. Pending balance will be reflected before course assignment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Notes
            </label>
            <textarea
              value={formData.paymentNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, paymentNotes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any notes about this payment..."
            />
          </div>

          {/* Receipt Upload */}
          <FileUpload
            label="Payment Receipt"
            accept=".pdf,.doc,.docx,image/*"
            file={formData.receiptFile}
            onFileChange={handleFileChange('receiptFile')}
            required={true}
          />

          {/* Proof Image Upload */}
          <FileUpload
            label="Proof Image (Optional)"
            accept="image/*,.pdf"
            file={formData.proofImage}
            onFileChange={handleFileChange('proofImage')}
            required={false}
            preview={true}
          />

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.receiptFile}
              className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.primary }}
            >
              {isSubmitting ? 'Updating...' : 'Update Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 