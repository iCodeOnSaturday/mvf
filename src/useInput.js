import { useState } from "react";

export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    let field = {
        value,
        setValue,
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        },
    };

    return field;
};

export default useInput;