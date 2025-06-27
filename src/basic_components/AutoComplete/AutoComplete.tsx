import {countryCallingCodes, CountryType} from "../../common";
import {Autocomplete, Box, TextField, useAutocomplete} from "@mui/material";
import { styled } from '@mui/system';
import {useEffect, useState} from "react";

const Label = styled('label')({
    display: 'block',
});

const StyledInput = styled('input')(({ theme }) => ({
    width: 200,
    height: '100%',
    backgroundColor: '#fff',
    color: '#000',
    ...theme.applyStyles('dark', {
        backgroundColor: '#000',
        color: '#fff',
    }),
}));

const Listbox = styled('ul')(({ theme }) => ({
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: '#fff',
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
    '& li.Mui-focused': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
    },
    '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
    },
    ...theme.applyStyles('dark', {
        backgroundColor: '#000',
    }),
}));


const CountrySelect = ({ defaultCode = "US", onChange }: { defaultCode?: string, onChange?: (country: CountryType) => void }) => {
    const [selectedCountry, setSelectedCountry] = useState(
        countryCallingCodes.find((country) => country.code === defaultCode) || countryCallingCodes[0]
    );

    useEffect(() => {
        if (onChange) {
            onChange(selectedCountry);
        }
    }, [selectedCountry, onChange]);
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'use-autocomplete-demo',
        options: countryCallingCodes,
        getOptionLabel: (option: CountryType) => `+${option.phone}`,
        value: selectedCountry,
        onChange: (_, newValue) => {
            if (newValue) {
                setSelectedCountry(newValue);
            }
        },
    });

    return (
        <div className={'w-[80px] h-[42px]'}>
            <div {...getRootProps()} className="h-full">
                <StyledInput {...getInputProps()}
                        placeholder={'+1'}
                        className={'text-center'}
                        style={{width: '70px', border: '1px solid #e5e7eb', borderRadius: '0.25rem'}}/>
            </div>
            {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                    {groupedOptions.map((option: CountryType, index) => {
                        const { key, ...optionProps } = getOptionProps({ option, index });
                        return (
                            <li key={key} {...optionProps} className={'whitespace-nowrap overflow-visible flex'}>
                                <Box
                                    key={key}
                                    component="li"
                                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                    {...optionProps}
                                    onClick={() => setSelectedCountry(option)}
                                >
                                    <img
                                        loading="lazy"
                                        className={'inline-block ml-3'}
                                        width="20"
                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        alt=""
                                    />
                                    <div className={'inline-block min-w-16 text-right'}>+{option.phone}</div>
                                    <div className={'inline-block min-w-10 text-left'}> &nbsp;({option.code})</div>
                                </Box>
                            </li>
                        );
                    })}
                </Listbox>
            ) : null}
        </div>
    );
}

export default CountrySelect;