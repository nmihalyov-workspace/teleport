import React from 'react';

const withUserData = Comp => {
  return class WrappedComponent extends React.PureComponent {
    state = {
      user: {}
    }

    componentDidMount() {
      const userStringValue = localStorage.getItem('user');
      this.setState({
        user: !!userStringValue ? JSON.parse(userStringValue) : undefined
      });
    }
    
    render() {
      const { user } = this.state;

      return Comp ?
        <Comp user={user} {...this.props} /> : null;
    }
  }
};

export default withUserData;