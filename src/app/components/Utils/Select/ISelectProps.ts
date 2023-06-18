export interface ISelectProps {
    handleChange: any;
    value: string;
    name: string;
    id?: string;
    label: string;
    options: { opt: string; val: string }[];
    onBlur?: any;
    required?: any;
}
