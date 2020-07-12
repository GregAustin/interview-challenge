import React, { Component } from 'react';

import DietaryTotal from './DietaryTotal';
import PropTypes from 'prop-types';

/**
 * Header component.
 * Show number of selected items as well as dietary type totals.
 */
export default class Header extends Component {

	render() {

		// Convert to array
		const dietaries = Object.entries(this.props.dietaryTotals);

		// Sort alphabetically
		dietaries.sort((a, b) =>  (a[0]).localeCompare(b[0]));

		// Create components list
		const dietaryFlagComponents = dietaries.map((total, index) => {
			return (<DietaryTotal type={total[0]} total={total[1]} key={index}/>);
		});

		return (
		<div className="menu-summary">
			<div className="container">
				<div className="row">
					<div className="col-6 menu-summary-left">
						<span>{this.props.numSelectedItems} items</span>
					</div>
					<div className="col-6 menu-summary-right">
						{dietaryFlagComponents}
					</div>
				</div>
			</div>
		</div>
		)
	}
}

Header.propTypes = {
	dietaryTotals: PropTypes.object.isRequired,
	numSelectedItems: PropTypes.number.isRequired
}