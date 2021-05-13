import { TOGGLER } from '../constants';

const initialState = false;

export default (state = initialState, action) => {
	const { type } = action;

	switch (type) {
		case TOGGLER:
			state = !state;
		default:
			state = false;
	}

	return state;
};