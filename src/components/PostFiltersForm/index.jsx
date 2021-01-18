import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null,
}

function PostFiltersForm(props) {
    const { onSubmit } = props;
    const [searchValue, setSearchValue] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleFiltersChange(e) {
        const value = e.target.value;
        setSearchValue(value);

        if (onSubmit) {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
                const formValues = {
                    searchValue: value,
                };
                onSubmit(formValues);
            }, 300);
        }
    };

    return (
        <form>
            <input
                type="text"
                value={searchValue}
                onChange={handleFiltersChange}
            />
        </form>
    );
}

export default PostFiltersForm;
