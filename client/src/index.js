import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './index.scss';
import './reset.scss';

import './fonts/FredokaOne-Regular.ttf';
import './fonts/Lobster-Regular.ttf';
import './fonts/Playball-Regular.ttf';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
