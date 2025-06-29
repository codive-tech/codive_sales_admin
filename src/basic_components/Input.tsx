import React, { forwardRef } from "react";
import CountrySelect from "./AutoComplete/AutoComplete";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    phoneNo?: boolean;
    setCountryCode?: (country: any) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, phoneNo = false, setCountryCode, ...props }, ref) => {
    return (
        <div>
            <label className="mb-1 font-medium">
                {label}
                {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className={'flex items-end gap-2'}>
                {props.name === "phoneNo" && (
                    <CountrySelect 
                        defaultCode="US"
                        onChange={(selected) => setCountryCode && setCountryCode(selected.phone)}
                    />
                )}
                <div className="flex flex-col flex-1">
                    <input 
                        ref={ref} 
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        {...props} 
                    />
                </div>
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
});

export default Input;
