import React, { useEffect } from 'react';
import { Frame } from '../../App';
import { TextInputField, TextareaField, Button } from 'evergreen-ui'

import { useForm, Controller } from "react-hook-form"
import fullSchema from "../../schema.json"


interface Field {
    type: "number" | "string";
    minimum?: number;
    maximum?: number;
    max_length?: number;
}

interface Fields { ["key"]: Field };

const getValidationMessage = (errorType: string) => {
    switch (errorType) {
        case "max":
            return "This number is too big";
        case "required":
            return "Field is required"
        case "min":
            return "Number is too small"
        default:
            return "";
    }
}



export const Form = ({ frame, onSubmit }: { frame: Frame, onSubmit: (val: any) => void }) => {
    const { errors, control, handleSubmit } = useForm({ mode: "onBlur" });
    const fields: Fields = fullSchema[frame.code].fields;
    useEffect(() => {
        // Focus on the first input
        //@ts-ignore
        // document.getElementById(Object.keys(fields)[0]).focus()
    }, [fields])

    const getErrorDetails = (fieldSchema: Field) => {
        let error = "";
        if (fieldSchema.max_length) {
            error += `Max length: ${fieldSchema.max_length} `
        }
        if (fieldSchema.minimum) {
            error += `Min: ${fieldSchema.minimum} `
        }
        if (fieldSchema.maximum) {
            error += `Max: ${fieldSchema.maximum} `
        }
        return error;
    }
    const isTextArea = (maxLength: number) => maxLength > 120;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField />
            {
                Object.entries(fields).map(([fieldName, fieldSchema]: [string, Field]) => {
                    return (
                        //@ts-ignore
                        <div className={isTextArea(fieldSchema.max_length) ? "w-64" : "w-32"}>
                            <Controller
                                id={fieldName}
                                key={fieldName}
                                defaultValue=""
                                //@ts-ignore
                                as={isTextArea(fieldSchema.max_length) ? TextareaField : TextInputField}
                                control={control}
                                rules={{ required: true, min: fieldSchema.minimum, max: fieldSchema.maximum, maxLength: fieldSchema.max_length }}
                                label={fieldName}
                                name={fieldName}
                                type={fieldSchema.type === "number" ? "number" : "text"}
                                min={fieldSchema.minimum}
                                max={fieldSchema.maximum}
                                isInvalid={!!errors[fieldName]}
                                maxLength={fieldSchema.max_length}
                                validationMessage={!!errors[fieldName] && getValidationMessage(errors[fieldName].type)}
                                description={getErrorDetails(fieldSchema)}
                            />
                        </div>
                    )
                })
            }
            <Button disabled={!!Object.keys(errors).length} onClick={handleSubmit(onSubmit)} appearance="primary">Submit</Button>
        </form>

    )
}