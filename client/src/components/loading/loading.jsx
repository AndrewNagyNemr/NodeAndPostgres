import React, { Component } from 'react';
import './loading.css';

class Loading extends Component {
    state = {  }
    render() { 
        return (
            <div className="loading">
                <div id="preloader">
                    <div id="loader"></div>
                </div>
            </div>
        );
    }
}
 
export default Loading;