const dataIsReady = data => typeof data !== 'undefined' && JSON.stringify(data) !== '{}' && typeof data !== 'boolean';

export default dataIsReady;