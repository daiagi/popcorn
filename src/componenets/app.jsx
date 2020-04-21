
import _ from 'lodash';
import React from "react";
import './app.css';

import printMe from '../print';

const App = () => {

    return (
        <div>
            {_.join(['Hello', 'webpack'], ' ')}
            <button onClick={printMe} >click me and check the console</button>
        </div>

    );


};

export default App;