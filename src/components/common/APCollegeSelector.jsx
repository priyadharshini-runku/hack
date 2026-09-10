import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  School, 
  MapPin, 
  Search, 
  ChevronDown, 
  Check, 
  X, 
  Sparkles, 
  Building, 
  AlertCircle 
} from 'lucide-react';
import { 
  AP_DISTRICTS, 
  AP_ENGINEERING_COLLEGES, 
  filterAPColleges 
} from '../../data/apColleges';

export const APCollegeSelector = ({
  selectedDistrict = 'All Districts',
  onDistrictChange,
  selectedCollege = '',
  selectedCollegeCode = '',
  onCollegeSelect,
  customCollege = '',
  onCustomCollegeChange,
  customCode = '',
  onCustomCodeChange,
  required = true,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered colleges based on district and search
  const filteredColleges = useMemo(() => {
    return filterAPColleges(selectedDistrict, searchTerm);
  }, [selectedDistrict, searchTerm]);

  // Total count for current district (ignoring search filter for badge)
  const districtTotalCount = useMemo(() => {
    return filterAPColleges(selectedDistrict, '').length;
  }, [selectedDistrict]);

  const handleDistrictSelect = (e) => {
    const newDistrict = e.target.value;
    if (onDistrictChange) {
      onDistrictChange(newDistrict);
    }
    // If the currently selected college is not in the new district and not 'OTHER', reset selection
    if (selectedCollege && selectedCollegeCode !== 'OTHER' && newDistrict !== 'All Districts') {
      const match = AP_ENGINEERING_COLLEGES.find(c => c.name === selectedCollege);
      if (match && match.district !== newDistrict) {
        if (onCollegeSelect) {
          onCollegeSelect({ name: '', code: '', district: newDistrict });
        }
      }
    }
  };

  const handleCollegePick = (college) => {
    if (onCollegeSelect) {
      onCollegeSelect(college);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClearSelection = (e) => {
    e.stopPropagation();
    if (onCollegeSelect) {
      onCollegeSelect({ name: '', code: '', district: selectedDistrict });
    }
    setSearchTerm('');
  };

  const isCustomSelected = selectedCollegeCode === 'OTHER' || selectedCollege === 'Other / Custom Engineering College in Andhra Pradesh';

  return (
    <div className="space-y-3.5" ref={dropdownRef}>
      
      {/* STEP 1: DISTRICT SELECTION */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            <span>Step 1: Select Andhra Pradesh District</span>
            {required && <span className="text-rose-500">*</span>}
          </label>
          <span className="text-[11px] text-brand-600 font-semibold bg-brand-50 px-2 py-0.5 rounded-md border border-brand-100">
            {selectedDistrict === 'All Districts' 
              ? `${AP_ENGINEERING_COLLEGES.length - 1} Colleges in AP` 
              : `${districtTotalCount} Colleges in ${selectedDistrict}`}
          </span>
        </div>

        <div className="relative">
          <select
            value={selectedDistrict}
            onChange={handleDistrictSelect}
            disabled={disabled}
            className="w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium text-slate-800 transition-all appearance-none cursor-pointer shadow-2xs hover:border-slate-400"
          >
            {AP_DISTRICTS.map(dist => (
              <option key={dist} value={dist}>
                {dist === 'All Districts' ? '🏛️ All Districts (Search All Colleges in AP)' : `📍 ${dist}`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* STEP 2: SEARCHABLE COLLEGE DROPDOWN */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <School className="w-3.5 h-3.5 text-brand-600" />
            <span>Step 2: Select Your Engineering College</span>
            {required && <span className="text-rose-500">*</span>}
          </label>
          {selectedCollegeCode && !isCustomSelected && (
            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Code: {selectedCollegeCode}
            </span>
          )}
        </div>

        {/* Trigger Box / Selected Display */}
        <div className="relative">
          <div
            onClick={() => {
              if (!disabled) {
                setIsOpen(prev => !prev);
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }
            }}
            className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white font-medium cursor-pointer transition-all flex items-center justify-between gap-2 shadow-2xs ${
              isOpen 
                ? 'ring-2 ring-brand-500 border-brand-500' 
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            {selectedCollege ? (
              <div className="flex items-center gap-2 overflow-hidden flex-1">
                <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                  <Building className="w-3.5 h-3.5" />
                </div>
                <div className="truncate text-left flex-1">
                  <span className="font-semibold text-slate-900 block truncate">
                    {selectedCollege}
                  </span>
                  {selectedCollegeCode && (
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <span className="font-mono font-bold text-brand-600">[{selectedCollegeCode}]</span>
                      {selectedDistrict !== 'All Districts' && <span>· {selectedDistrict}</span>}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <span className="text-slate-400 flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">
                  {selectedDistrict === 'All Districts' 
                    ? 'Search by college name or EAPCET code...' 
                    : `Search college in ${selectedDistrict}...`}
                </span>
              </span>
            )}

            <div className="flex items-center gap-1.5 shrink-0">
              {selectedCollege && (
                <button
                  type="button"
                  onClick={handleClearSelection}
                  title="Clear selection"
                  className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-600' : ''}`} />
            </div>
          </div>

          {/* Searchable Dropdown Popover */}
          {isOpen && (
            <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              
              {/* Search input header */}
              <div className="p-2.5 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10 flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type college name (e.g. Gayatri, JNTU) or code (e.g. AUCE, GVPE, SRKR)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-300 text-xs sm:text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-medium text-slate-900 placeholder:text-slate-400"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="text-xs text-slate-400 hover:text-slate-600 px-1"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Colleges List */}
              <div className="max-h-60 sm:max-h-72 overflow-y-auto divide-y divide-slate-100 overscroll-contain">
                {filteredColleges.length > 0 ? (
                  filteredColleges.map((col) => {
                    const isSelected = selectedCollege === col.name || (col.code && selectedCollegeCode === col.code);
                    const isOther = col.code === 'OTHER';

                    return (
                      <button
                        key={`${col.code}-${col.name}`}
                        type="button"
                        onClick={() => handleCollegePick(col)}
                        className={`w-full px-3.5 py-2.5 text-left flex items-start justify-between gap-2.5 transition-colors group ${
                          isSelected 
                            ? 'bg-brand-50/80 text-brand-900 font-semibold' 
                            : 'hover:bg-slate-50 text-slate-800'
                        } ${isOther ? 'bg-amber-50/50 hover:bg-amber-50 text-amber-900 font-semibold border-t border-amber-100' : ''}`}
                      >
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                          <span className="text-base shrink-0 mt-0.5">
                            {isOther ? '✏️' : '🏛️'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                              {col.name}
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] text-slate-500">
                              {col.code && col.code !== 'OTHER' && (
                                <span className="font-mono font-bold bg-brand-100 text-brand-800 px-1.5 py-0.2 rounded">
                                  {col.code}
                                </span>
                              )}
                              <span>📍 {col.district}</span>
                              {col.location && <span>· {col.location}</span>}
                              {col.type && (
                                <span className="hidden sm:inline text-slate-400">
                                  ({col.type})
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="p-6 text-center space-y-2">
                    <AlertCircle className="w-6 h-6 text-slate-400 mx-auto" />
                    <p className="text-xs font-semibold text-slate-700">No colleges matched "{searchTerm}"</p>
                    <p className="text-[11px] text-slate-500">
                      Try searching by EAPCET code (e.g. AUCE, GVPE, SRKR, RVJC) or switch district to "All Districts".
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCollegePick({
                        name: 'Other / Custom Engineering College in Andhra Pradesh',
                        code: 'OTHER',
                        district: selectedDistrict !== 'All Districts' ? selectedDistrict : 'Andhra Pradesh',
                        location: 'Andhra Pradesh'
                      })}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 pt-1"
                    >
                      <span>Or enter custom college manually →</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Showing {filteredColleges.length} recognized institutions</span>
                <span className="text-brand-600 font-semibold">Alphabetical list</span>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* STEP 3: CUSTOM COLLEGE ENTRY (If "Other" is chosen) */}
      {isCustomSelected && (
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Custom Engineering Institution Entry
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
              Unlisted College
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Full Official College Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Government Engineering College, Vijayawada"
                value={customCollege}
                onChange={(e) => onCustomCollegeChange && onCustomCollegeChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 text-xs sm:text-sm outline-none bg-white font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                College Code <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. GECV"
                value={customCode}
                onChange={(e) => onCustomCodeChange && onCustomCodeChange(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 text-xs sm:text-sm outline-none bg-white font-bold text-slate-900 placeholder:text-slate-400 uppercase focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
          <p className="text-[10px] text-amber-800">
            💡 This custom college will be stored on your student profile and verified by platform administrators.
          </p>
        </div>
      )}

    </div>
  );
};
