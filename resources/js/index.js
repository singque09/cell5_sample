import React from 'react';
import {render} from "react-dom";
import App from "./app";

require('./bootstrap');

render(<App />, document.getElementById('app'));
