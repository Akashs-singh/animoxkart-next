'use client';

import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import StarRating from './star-rating';
import Link from 'next/link'
import axios from 'axios';
import ReplacePeriodsWithLineBreaks from '../../layouts/common/replace-periods-with-line-breaks';
class DetailsTopTabs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reviews: {},
            ratingData: {}
        }
    }
    
    componentDidMount() {
        const data = {
            "item_id": this.props.item.id
        }
        this.getReviews(data);
    }
    
    getReviews = async (data) => {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/getReviewsByProductId?item_id=' + data.item_id, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data != null) {
            this.setState({
                reviews: response.data,
                ratingData: response.data.ratings
            })
        }
    }
    render() {
        const { stateData } = this.state;
        const styles = {
            ul: {
                listStyleType: "none",
            },
            li: {
                display: "list-item"
            },
            progressContainer: {
                width: "16rem",
                backgroundColor: "#f1f1f1",
                height: "7px",
                marginTop: "0.25rem",
                marginBottom: "0.80rem",
                marginLeft: "0.75rem",
                marginRight: "0.75rem"
            },

            /* Style for the progress bar */
            progressBar: {
                width: "0%",
                height: "7px",
                backgroundColor: "#4caf50",
                textAlign: "center",
                color: "white"
            }
        };
        return (
            <section className="tab-product m-0">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                <Tab className="nav-item">
                                    <span className="nav-link active">
                                        <i className="icofont icofont-ui-home"></i>Description</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Details</span>
                                    <div className="material-border"></div>
                                </Tab>
                                {/* <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Video</span>
                                    <div className="material-border"></div>
                                </Tab> */}
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Reviews</span>
                                    <div className="material-border"></div>
                                </Tab>
                            </TabList>
                            <TabPanel className="tab-pane fade mt-4 show active">
                                <table className="table table-striped mb-0">
                                    <tbody>
                                        {this.props.item.pointWiseDescription ?
                                            Object.keys(this.props.item.pointWiseDescription).map((key, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th>{key}</th>
                                                        <td>{this.props.item.pointWiseDescription[key]}</td>
                                                    </tr>
                                                )
                                            })
                                            : null
                                        }
                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel>
                            <ReplacePeriodsWithLineBreaks text={this.props.item.description} />
                                {/* <p className="mt-4 p-0">
                                    {this.props.item.description}
                                </p> */}
                            </TabPanel>
                            {/* <TabPanel>
                                <div className="mt-4 text-center">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe
                                            src="https://www.youtube.com/embed/BUWzX78Ye_8"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                </div>
                            </TabPanel> */}
                            <TabPanel>
                                <div className="row">
                                    <div className="col-md-6 row">
                                        <div className="media m-0">
                                            <div className="media-body ml-3">
                                                <StarRating rating={this.state.ratingData.total_rating ? this.state.ratingData.total_rating : 0} />
                                                <label>{this.state.reviews.rating_count ? this.state.reviews.rating_count : 0} ratings and {this.state.reviews.reviews_count ? this.state.reviews.reviews_count : 0} reviews</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div style={{ display: "flex" }}>
                                            <ul style={styles.ul}>
                                                <li style={styles.li}><p>5 <i className="fa fa-star"></i></p></li>
                                                <li style={styles.li}><p>4 <i className="fa fa-star"></i></p></li>
                                                <li style={styles.li}><p>3 <i className="fa fa-star"></i></p></li>
                                                <li style={styles.li}><p>2 <i className="fa fa-star"></i></p></li>
                                                <li style={styles.li}><p>1 <i className="fa fa-star"></i></p></li>
                                            </ul>
                                            <ul style={styles.ul}>
                                                <li style={styles.li}>
                                                    <div style={styles.progressContainer}>
                                                        <div style={{ ...styles.progressBar, "width": this.state.ratingData.five_percent ? this.state.ratingData.five_percent : 0 + "%" }}></div>
                                                    </div>
                                                </li>
                                                <li style={styles.li}>
                                                    <div style={styles.progressContainer}>
                                                        <div style={{ ...styles.progressBar, "width": this.state.ratingData.four_percent ? this.state.ratingData.four_percent : 0 + "%" }}></div>
                                                    </div>
                                                </li>
                                                <li style={styles.li}>
                                                    <div style={styles.progressContainer}>
                                                        <div style={{ ...styles.progressBar, "width": this.state.ratingData.three_percent ? this.state.ratingData.three_percent : 0 + "%" }}></div>
                                                    </div>
                                                </li>
                                                <li style={styles.li}>
                                                    <div style={styles.progressContainer}>
                                                        <div style={{ ...styles.progressBar, "width": this.state.ratingData.two_percent ? this.state.ratingData.two_percent : 0 + "%" }}></div>
                                                    </div>
                                                </li>
                                                <li style={styles.li}>
                                                    <div style={styles.progressContainer}>
                                                        <div style={{ ...styles.progressBar, "width": this.state.ratingData.one_percent ? this.state.ratingData.one_percent : 0 + "%" }}></div>
                                                    </div>
                                                </li>

                                            </ul>
                                            <ul style={styles.ul}>
                                                <li style={styles.li}><p>{this.state.ratingData.five ? this.state.ratingData.five : 0}</p></li>
                                                <li style={styles.li}><p>{this.state.ratingData.four ? this.state.ratingData.four : 0}</p></li>
                                                <li style={styles.li}><p>{this.state.ratingData.three ? this.state.ratingData.three : 0}</p></li>
                                                <li style={styles.li}><p>{this.state.ratingData.two ? this.state.ratingData.two : 0}</p></li>
                                                <li style={styles.li}><p>{this.state.ratingData.one ? this.state.ratingData.one : 0}</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <hr size="2" width="100%" color="#e3e1e1" style={{ margin: "5px", marginTop: "25px" }} align="center" />

                                    <div className="col-md-12">
                                        <div>
                                            {this.state.reviews.reviews ?
                                                this.state.reviews.reviews.slice(0, 6).map((review, index) => {
                                                    return (
                                                        <div className="col-md-6 col-sm-6 mt-2" style={{ display: 'inline-block', lineHeight: '1.6' }} key={index}>
                                                            <StarRating rating={review.rating} /> <p>{review.short_message}</p>
                                                            <p style={{ fontSize: '11px' }}>Review for: Color {review.color} - Size {review.size}</p>
                                                            <span>{review.message}</span>
                                                            <div className='row'>
                                                                {review.images != "" && review.images != null ? review.images.map((image, ind) => {
                                                                    return (
                                                                        <div key={ind}><img src={image.image} alt="animoxkart review image" className="m-2" style={{ borderRadius: "5px" }} height="100" width="90" /></div>
                                                                    )
                                                                }) : ""
                                                                }
                                                            </div>
                                                            {review.location != "" ? <p>{review.location}</p> : ""}
                                                            <p style={{ fontSize: '10px' }}><i className='fa fa-check'></i> Verified Purchase - {review.created_at}</p>
                                                            <hr size="2" width="100%" color="#dddddd" style={{ margin: "5px", marginTop: "25px" }} align="center" />
                                                        </div>
                                                    )
                                                })
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>
        )
    }
}

export default DetailsTopTabs;