import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions/actions.js';

let Query = React.createClass({

componentDidMount() {
    this.props.dispatch(
      getGraph("{properties {name, location, id, realtor{firstName, lastName}}}")
    );
  },

render() {

	let dispatch = this.props.dispatch;
    let fetchInProgress = String(this.props.store.fetching);
    let properties = this.props.store.data
    console.log('properties', properties)
    let propertyForSale = properties.map(function(property){
    			return (<li >{property.name + ', ' +property.location}</li>)
    })

return(
		<div>
		<p>List of properties for sale:</p>
		<ul>
		{propertyForSale}
		</ul>
        <h3>{ properties.name}</h3>
        <p>{ properties.location }</p>
        
			</div>

			)
	}
});

const mapStateToProps = (state) => {
	console.log('state', state.data)
  return {
    store: state
  }
};
export const QueryContainer = connect(mapStateToProps)(Query);