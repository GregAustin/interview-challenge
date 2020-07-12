import PropTypes from 'prop-types';
import React from 'react';

/**
 * Preview item component.
 * An item that has been seledcted by the user.
 */
const PreviewItem = (props) => {
	const flags = props.dietaryFlags.map((flag, index) => <span className="dietary" key={index}>{flag}</span>)
	return (
		<li className="item">
			<h2>{props.name}</h2>
			<p>{flags}</p>
			<button className="remove-item" onClick={() => props.clickHandler(props.id)}>x</button>
		</li>
	)
}

PreviewItem.propTypes = {
	dietaryFlags: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	clickHandler: PropTypes.func.isRequired
}

export default PreviewItem;