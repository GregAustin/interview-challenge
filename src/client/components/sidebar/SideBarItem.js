import PropTypes from 'prop-types';
import React from 'react';

/**
 * SideBar item component.
 * A selectable menu item contained in the sidebar.
 */
const SideBarItem = (props) => {

	// Create dietary flags
	const flags = props.dietaryFlags.map((flag, index) => <span className="dietary" key={index}>{flag}</span>)

	return (
		// When clicked, pass back the item's id.
		<li className="item" onClick={() => props.clickHandler(props.id)}>
			<h2>{props.name}</h2>
			<p>{flags}</p>
		</li>
	)
}

SideBarItem.propTypes = {
	dietaryFlags: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	clickHandler: PropTypes.func.isRequired,
}

export default SideBarItem;