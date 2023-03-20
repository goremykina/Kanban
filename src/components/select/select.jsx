import React from "react";
import ThirdPartySelect from "react-select";

export default function Select(props) {
    const options = props.options;
    const onChange = props.onChange;
    const valueSelector = props.valueSelector || (option => option.value);
    const labelSelector = props.labelSelector || (option => option.label);

    const formattedOption = options.map(option => ({
        value: valueSelector(option),
        label: labelSelector(option)
    }));

    return(
        <div >
            <ThirdPartySelect
                onChange={selectedOption => onChange(selectedOption.value)}
                options={formattedOption}
            />
        </div>
    )
}