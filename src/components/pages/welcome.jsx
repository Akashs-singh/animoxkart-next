'use client';

import React, {Component} from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });

import Breadcrumb from "../common/breadcrumb";

class welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false
        };
    }


    constructor (props) {
        super (props)
        this.props.history.push('/')
    }

    
    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render (){


        return (
            <div>
            </div>
        )
    }
}

export default welcome