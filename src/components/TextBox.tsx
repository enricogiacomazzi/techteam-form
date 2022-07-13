import React from "react";
import classNames from 'classnames';
import { FieldError, FormState, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextBoxProps {
    fieldName: string,
    label: string,
    errors: Partial<TextBoxError>;
    formState: FormState<any>,
    register: UseFormRegister<any>,
    validationOptions?: RegisterOptions<any>
}

interface TextBoxError {
    required: string;
    min: string;
    max: string;
    minLength: string;
    maxLength: string;
    pattern: string;
    validate: string;
}


export const TextBox: React.FC<TextBoxProps> = ({fieldName, label, errors: errorLabels, formState, register, validationOptions}) => {

    const errors = formState.errors[fieldName];
    const errorType = errors?.type;
    // @ts-ignore
    const errorLabel = errorLabels[errorType];

    return (
        <div className="form-group">
            <label htmlFor="firstname">{label}</label>
            <input type="text" id="firstname" placeholder={label}
                className={classNames({'form-control': true, 'is-invalid': !!errors, 'is-valid': false})} 
                {...register(fieldName, validationOptions)}/>
                {(!!errors) && <div className="invalid-feedback">
                {errorLabel}
            </div>}
        </div>
    )
}