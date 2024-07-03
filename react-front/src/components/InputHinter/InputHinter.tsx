import React, {useState} from 'react';
import clsx from 'clsx';


const MIN_LENGTH = 3;
const hasUppercase = (str: string) => /[A-Z]/.test(str);
const hasLowercase = (str: string) => /[a-z]/.test(str);

interface Errors {
    required?: string;
    minlength?: string;
    uppercase?: string;
}


// @ts-ignore
const InputHinter = ({className = '', name = '', type = 'text', value = "", onChange}) => {
    const inputTitle = name.length === 0 ? 'Field' : name;
    //const [input, setInput] = useState('');
    const [touched, setTouched] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    const validatePassword = (value: string) => {
        const errors = {};
        if (!value) {
            // @ts-ignore
            errors.required = `${inputTitle} is REQUIRED`;
        } else if (value.length < MIN_LENGTH) {
            // @ts-ignore
            errors.minlength = `${inputTitle} must be at least ${MIN_LENGTH} CHARACTERS`;
        } else if (!/[A-Z]/.test(value)) {
            // @ts-ignore
            errors.uppercase = `${inputTitle} must contain at least one uppercase letter`;
        }
        return errors;
    };

    // @ts-ignore
    const handleChange = (e) => {
        onChange(e.target.value);
        setTouched(true);
        //setInput(e.target.value);
        // @ts-ignore
        setErrors(validatePassword(e.target.value));
    };

    const handleBlur = () => {
        setTouched(true);
        // @ts-ignore
        setErrors(validatePassword(value));
    };

    // @ts-ignore
    const errorClass = errors.required || errors.minlength || errors.uppercase ? 'input-error' : '';



    return (
        <div>
            <label className={`block font-medium text-sm text-gray-700 ` + className}>
                {inputTitle}
            </label>
            <input
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' + errorClass + " " + className}
            />
            {touched && (errors.required || errors.minlength || errors.uppercase) && (
                <div>
                    {errors.required && <small className="text-danger">{errors.required}</small>}
                    {errors.minlength && <small className="text-danger">{errors.minlength}</small>}
                    {errors.uppercase && <small className="text-danger">{errors.uppercase}</small>}
                </div>
            )}
        </div>
    );
}

export default InputHinter;
