import React, { Component } from 'react';
import {getImage} from './../../../common/utils'
export default class ImageZoom extends Component {
    render() {
        const {image} = this.props;

        return (
            <img src={`${getImage(image)}`}  className="img-fluid image_zoom_cls-0" />
        );
    }
}