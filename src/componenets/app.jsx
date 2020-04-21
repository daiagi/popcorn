
import _ from 'lodash';
import React from 'react';
import './app.css';

import printMe from '../print';

const App = () => (
    <div>
        {_.join(['Hello', 'webpack'], ' ')}
        <button type="button" onClick={printMe}>click me and check the console</button>
    </div>

);

export default App;
