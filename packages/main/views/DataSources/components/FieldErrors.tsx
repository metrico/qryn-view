import { InputErrorWarning } from "./InputErrorWarning";

export const FIELD_ERROR_TEXT = {
    protocol: "mixed_content",
    url: "complete_url",
};

type FieldError = Record<keyof typeof FIELD_ERROR_TEXT, boolean>;

export type FieldErrorProps = {
    fieldErrors?: FieldError;
};

export const mapErrors = (fieldErrors: FieldError) => {
    return Object.keys(fieldErrors)
        .map((error) => error)
        .filter((f) => Boolean(fieldErrors[f]));
};

export const FieldErrors = (props: FieldErrorProps) => {
    const { fieldErrors } = props;
    if (!fieldErrors) return <></>;
    return (
        <>
            {mapErrors(fieldErrors)?.map((error, key) => (
                <InputErrorWarning key={key} error={FIELD_ERROR_TEXT[error]} />
            ))}
        </>
    );
};
