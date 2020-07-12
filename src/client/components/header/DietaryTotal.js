import PropTypes from 'prop-types';
import React from 'react';

/**
 * Dietary total component.
 * Displays total number of times a given dietary type has been selected.
 */
const DietaryTotal = ({total, type}) => {
	return (
		<>
			{`${total}x`} <span className="dietary">{type}</span>
		</>
		);
};

DietaryTotal.propTypes = {
	total: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired
}

export default DietaryTotal;