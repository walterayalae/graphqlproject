

const initialState = {
	fetching: false,
	data: []
};

export const queryReducer = ( state = initialState, action) => {
	switch (action.type){
		case "FINISHED_REQUEST":
			return Object.assign({}, state, {
        		fetching: false,
        		data:action.response.data.properties

      });
		default:

		return state;
		
	}
}