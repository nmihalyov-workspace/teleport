import React from 'react';
import { connect } from 'react-redux';

import { TOGGLER } from '../../constants';

import styles from './component.module.sass';

let Component = props => {
	return <div className={styles.component}></div>;
};

const mapStateToProps = state => {
	return {
		tgl: state.toggler
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTgl: () => dispatch({type: TOGGLER})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);