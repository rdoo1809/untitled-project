import React, {useState} from 'react';

interface Errors {
    required?: string;
    minlength?: string;
    uppercase?: string;
    lowercase?: string;
    isEmail?: string;
}

// @ts-ignore
const InputHinter = ({className = '', name = '', type = 'text', value = "", onChange = (event)=>{}, areErrors = (sender)=>{}}) => {
    const inputTitle = name.length === 0 ? 'Field' : name;
    const [touched, setTouched] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    // @ts-ignore
    const validateInput = (target) => {
        const errors = {};
        if (!target.value) {
            // @ts-ignore
            errors.required = `${inputTitle} is REQUIRED`;
        } else if (target.name === "Password") {
            if (target.value.length < 3) {
                // @ts-ignore
                errors.minlength = `${inputTitle} must be at least 3 CHARACTERS`;
            } else if (!/[A-Z]/.test(target.value)) {
                // @ts-ignore
                errors.uppercase = `${inputTitle} must contain at least one UPPERCASE letter`;
            } else if (!/[a-z]/.test(target.value)) {
                // @ts-ignore
                errors.lowercase = `${inputTitle} must contain at least one LOWERCASE letter`;
            }
        } else if (target.name === "Email Address") {
            if (!/^[^@]+@[^@]+\.[^@]+$/.test(target.value)) {
                // @ts-ignore
                errors.isEmail = `${inputTitle} must be in a VALID format`;
            }
        }
        return errors;
    };

    // @ts-ignore
    const handleChange = (e) => {
        setTouched(true);
        // @ts-ignore
        setErrors(validateInput(e.target));
        areErrors(errors);
        let someErrors = (validateInput(e.target));
        console.log('errors - ' + errors);
        //areErrors(someErrors);
        onChange(e.target.value);
    };

    // @ts-ignore
    const handleBlur = (e) => {
        setTouched(true);
        // @ts-ignore
        setErrors(validateInput(e.target));
    };

    // @ts-ignore
    const errorClass = errors.required || errors.minlength || errors.uppercase || errors.lowercase || errors.isEmail ? 'input-error' : '';

    return (
        <div data-testid="input-hinter">
            <label className={`block font-medium text-sm text-gray-700 ` + className}>
                {inputTitle}
            </label>
            <input
                data-testid="hinter-input"
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}

                className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' + errorClass + " " + className}
            />
            {touched && (errors.required || errors.minlength || errors.uppercase || errors.lowercase || errors.isEmail) && (
                <div>
                    {errors.required && <small className="text-danger">{errors.required}</small>}
                    {errors.minlength && <small className="text-danger">{errors.minlength}</small>}
                    {errors.uppercase && <small className="text-danger">{errors.uppercase}</small>}
                    {errors.lowercase && <small className="text-danger">{errors.lowercase}</small>}
                    {errors.isEmail && <small className="text-danger">{errors.isEmail}</small>}
                </div>
            )}
        </div>
    );
}

export default InputHinter;
