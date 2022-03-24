import React from 'react';

interface TextInputProps {
    label: string;
    onChange: (v: string) => any;
    value: string;
    maxLength?: number;
}

export const TextInput = (props: TextInputProps) => <div className={"form-row field-label"}>
    <div>
        <label className={"required"} htmlFor={"id_label"}>{props.label}:</label>
        <input
            type={"text"}
            onChange={(e) => props.onChange(e.target.value)} value={props.value}
            className={"vTextField"} maxLength={props.maxLength}/>
    </div>
</div>;