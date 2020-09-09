import React from 'react';
import { Frame } from '../../App';
import { TextInputField, TextareaField } from 'evergreen-ui'
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



export const Form = ({ frame }: { frame: Frame }) => {
    const { errors, control } = useForm({ mode: "onBlur" });
    const fields: Fields = fullSchema[frame.code].fields;
    return (
        <div>
            {
                Object.entries(fields).map(([fieldName, fieldSchema]: [string, Field]) => {
                    return (
                        <div>
                            <Controller
                                key={fieldName}
                                defaultValue=""
                                //@ts-ignore
                                as={fieldSchema.max_length > 120 ? TextareaField : TextInputField}
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
                            />
                        </div>
                    )
                })
            }
        </div>

    )
}