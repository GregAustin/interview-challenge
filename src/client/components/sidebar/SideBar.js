import PropTypes from 'prop-types';
import React from 'react';

/**
 * SideBar component.
 * Container for SideBar menu items.
 */
const SideBar = (props) => {
	return(
		<>
			<div className="filters">
				<input className="form-control" placeholder="Name" type="text"  onChange={(e) => props.changeHandler(e.target.value)}/>
			</div>
			<ul className="item-picker">{props.children}</ul>
		</>
	)
}

SideBar.propTypes = {
	changeHandler: PropTypes.func.isRequired,
	children: PropTypes.node
}

export default SideBar;