'use client';

import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });

import { Slider6 } from "../../../services/script";

class ProductBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false
        };
    }


    
    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        const container = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
        const image = {
            borderRadius: '50%',
            width: '70px',
            height: '70px'
        }
        const labelStyle = {
            textAlign: 'center',
            marginTop: '5px',
        };
        const style = {

            width: '70px',
            height: '70px',
            borderRadius: '50%',
            border: '3px solid #19a340',
            padding: '2px',
            boxSizing: 'content-box'
        }
        return (
            <section className="section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.isMounted && (
                            <Slider {...Slider6} className="slide-6 no-arrow">
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Collar</h5>
                                </div>
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Leash</h5>
                                </div>
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Harness</h5>
                                </div>
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Rope</h5>
                                </div>
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Chain</h5>
                                </div>
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Body Belt</h5>
                                </div>
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Collar</h5>
                                </div>
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Collar</h5>
                                </div>
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Collar</h5>
                                </div>
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Collar</h5>
                                </div>
                                <div style={container}>
                                    <div style={style}>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwApQMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDEQQAAAABUUAAURUEURQFQRVQAAFRQEEAUAAABUIqAoCAAoAIgIqgAgAKKACIoAigCAKqUVBFQBQAAAQVFRU6KgAKFFEEAFAFEAEBURQAAARRFFAAAAABAAAAUAASqKIAgACACgQEFIAqoAAAKIoIAoAoIACCoiACgAAABFQgqgIAAAACooCAAAAhRUAAAAAEAMFFAFAVBFAEoqKgAKACJQAAAAgAoIoBxQBUQBcFSYqYoP//Z" style={image} alt="Round Image" />
                                    </div>
                                    <h5 style={labelStyle}>Collar</h5>
                                </div>
                            </Slider>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default ProductBlock;