import './App.css';

import React, { Component } from 'react';

import Header from './components/header/Header';
import Preview from './components/preview/Preview';
import PreviewItem from './components/preview/PreviewItem';
import SideBar from './components/sidebar/SideBar';
import SideBarItem from './components/sidebar/SideBarItem';

export default class App extends Component {

	constructor(props)
	{
		super(props);

		// Keeping all app state here for simplicity.
		this.state = {
			items: [],
			selectedItems: [],
			filteredItems: [],
			dietaryTotals: {}
		};

		// Fetch available menu items from API.
		const endPoint = '/api/items';
		const requestItems = async () =>  {
			const response = await fetch(endPoint);
			const responseJson = await response.json();
			
			// Set available items. Also set initial filtered list to all available items.
			this.setState({
				items: responseJson.items,
				filteredItems: responseJson.items
			})
		}

		requestItems();
	}

	/**
	 * User has selected an item from the side menu.
	 * @param  {string} id
	 */
	itemSelected(id)
	{
		// Assuming here that all ids are unique.
		const item = this.state.items.find(item => item.id === id);

		if (item)
		{
			// Add new item to selections.
			const currentSelections = this.state.selectedItems.concat(item);

			// Work out totals of each dietary type.
			const dietaryTotals = this.calculateDietaryTotals(currentSelections);

			this.setState({
				selectedItems: currentSelections,
				dietaryTotals
			})
		}
	}
	
	/**
	 * Calculate the total of each dietary flag type for all selected items.
	 * @param  {Array} currentSelections
	 * @returns {object}
	 */
	calculateDietaryTotals(currentSelections)
	{
		const totals = {};
		currentSelections.forEach((item) => {

			const dietaryFlags = item.dietaries;
			dietaryFlags.forEach((flag) => {

				// Initialise total for this flag.
				if (!totals[flag]) totals[flag] = 0;

				// Increment total.
				totals[flag] ++;
			});
		});

		return (totals);
	}

	/**
	 * @param  {number} index
	 */
	itemRemoved(index)
	{
		// Duplicate array becuase splice() will mutate.
		const remainingItems = this.state.selectedItems.concat();
		remainingItems.splice(index, 1);

		// Work out totals of each dietary type.
		const dietaryTotals = this.calculateDietaryTotals(remainingItems);
		this.setState({
			selectedItems: remainingItems,
			dietaryTotals
		});
	}

	/**
	 * @param  {string} searchString=''
	 */
	filterItems(searchString = '')
	{
		let filteredItems;
		const minPatternLength = 1;

		// Only perform the search if we have a valid search string.
		if (!searchString || searchString.length < minPatternLength)
		{
			// Just return all items.
			filteredItems = this.state.items;
		}
		else
		{
			// Filter items list by item names that match our search term.
			const searchPattern = new RegExp(searchString, 'i');
			filteredItems = this.state.items.filter((item) => searchPattern.test(item.name));
		}

		this.setState({filteredItems});
	}

	render() {
		// Create sidebar items.
		const sideBarItems = this.state.filteredItems.map((item) => {
			return (<SideBarItem name={item.name} dietaryFlags={item.dietaries} clickHandler={this.itemSelected.bind(this)} id={item.id} key={item.id}/>);
		});

		// Create preview items.
		const previewItems = this.state.selectedItems.map((item, index) => {
			return (<PreviewItem name={item.name} dietaryFlags={item.dietaries} clickHandler={this.itemRemoved.bind(this)} id={index} key={index}/>);
		});

		return (	
		<div className="wrapper">
			<Header numSelectedItems={this.state.selectedItems.length} dietaryTotals={this.state.dietaryTotals}/>
			<div className="container menu-builder">
				<div className="row">
					<div className="col-4">
						<SideBar changeHandler={this.filterItems.bind(this)}>{sideBarItems}</SideBar>
					</div>
					<div className="col-8">
						<Preview>{previewItems}</Preview>
					</div>
				</div>
			</div>
		</div>
		)
	}
}
