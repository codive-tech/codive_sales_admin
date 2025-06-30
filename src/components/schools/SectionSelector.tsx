import React, { useMemo } from 'react';
import { Check } from 'lucide-react';

interface SectionSelectorProps {
  selectedSections: string[];
  onSectionChange: (sections: string[]) => void;
  studentCount: number;
  recommendedSections?: string[];
}

const ALL_SECTIONS = ['A', 'B', 'C', 'D'];

export const SectionSelector: React.FC<SectionSelectorProps> = ({
  selectedSections,
  onSectionChange,
  studentCount,
  recommendedSections = []
}) => {
  // Recommendation logic: at least 1 section, 25 per section
  const recommended = useMemo(() => {
    if (studentCount <= 0) return [];
    const count = Math.max(1, Math.round(studentCount / 25));
    return ALL_SECTIONS.slice(0, count);
  }, [studentCount]);

  const handleToggle = (section: string) => {
    if (selectedSections.includes(section)) {
      onSectionChange(selectedSections.filter(s => s !== section));
    } else {
      onSectionChange([...selectedSections, section].sort());
    }
  };

  const handleSelectAll = () => {
    onSectionChange([...ALL_SECTIONS]);
  };
  const handleClearAll = () => {
    onSectionChange([]);
  };

  return (
    <div className="space-y-2">
      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {ALL_SECTIONS.map(section => {
          const selected = selectedSections.includes(section);
          const isRecommended = recommendedSections.includes(section) || recommended.includes(section);
          return (
            <label
              key={section}
              className={`relative cursor-pointer select-none px-4 py-2 rounded-lg border flex items-center gap-2 transition-all
                ${selected ? 'bg-[#00AEEF] text-white border-[#00AEEF] shadow-md' : 'bg-white text-[#1E2A3B] border-[#E0E0E0] hover:bg-[#00AEEF] hover:text-white hover:border-[#00AEEF]'}
                ${isRecommended && !selected ? 'ring-2 ring-[#FFD600] ring-offset-2' : ''}
              `}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => handleToggle(section)}
                className="hidden"
              />
              <span className="font-medium">Section {section}</span>
              {selected && <Check className="h-3 w-3" />}
              {isRecommended && !selected && (
                <span className="absolute -top-2 -right-2 bg-[#FFD600] text-[#1E2A3B] text-[10px] px-1.5 py-0.5 rounded shadow">Recommended</span>
              )}
            </label>
          );
        })}
      </div>
      {/* Single Class fallback */}
      {selectedSections.length === 0 && (
        <div className="text-xs text-[#666] italic mt-1">No section selected (Single Class)</div>
      )}
      {/* Select/Clear All */}
      <div className="flex gap-2 mt-1">
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-xs text-[#00AEEF] hover:text-[#0095D9] font-medium"
        >
          Select All
        </button>
        <button
          type="button"
          onClick={handleClearAll}
          className="text-xs text-[#666] hover:text-[#1E2A3B] font-medium"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}; 