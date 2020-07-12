import PropTypes from 'prop-types';
import React from 'react';

/**
 * Preview area component.
 * Just a container for preview items.
 */
const Preview = (props) => {
	return(
		<>
			<h2>Menu preview</h2>
			<ul className="menu-preview">
				{props.children}
			</ul>
		</>
	)
}

Preview.propTypes = {
	children: PropTypes.node
}

export default Preview;