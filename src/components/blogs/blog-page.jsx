'use client';

import React, { Component } from 'react';
import Breadcrumb from "../common/breadcrumb";
import Link from 'next/link';
import axios from 'axios';
import { getImage } from './../common/utils'
import { BlinkBlur } from 'react-loading-indicators';
import BlogList from './blog-list';
class BlogPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            blogs: props.initialBlogs || [],
            recentBlogs: props.initialRecentBlogs || [],
            popularBlogs: props.initialPopularBlogs || [],
            loading: !props.initialBlogs, // Only show loading if no initial data
        }
       
    }
    StripHtmlTags(html) {
        // Check if we're in the browser environment
        if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        }
        // Fallback for server-side rendering - simple regex-based HTML stripping
        return html.replace(/<[^>]*>/g, '');
    }
    formatString(input) {
        // Convert the input string to lowercase
        let lowerCaseString = input.toLowerCase();
        
        // Replace all white spaces with hyphens
        let formattedString = lowerCaseString.replace(/\s+/g, '-');
        
        return formattedString;
    }
    truncateText(text, wordLimit = 80) {
        // Split the text into an array of words
        const words = text.split(' ');
        
        // Check if the number of words exceeds the limit
        if (words.length > wordLimit) {
            // Slice the array to get the first `wordLimit` words and join them back into a string
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        
        // Return the original text if it does not exceed the limit
        return text;
    }

    componentDidMount() {
        this.getBlogsList()
    }
    
    getBlogsList = async () => {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/getAllBlogs', {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data != null) {

            const sortedBlogs = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            // Filter the top 5 recent blogs
            const recentBlogs = sortedBlogs.slice(0, 5);
            this.setState({
                blogs: response.data,
                recentBlogs: recentBlogs,
                popularBlogs: recentBlogs,
                loading: false,
            })
        }

    }
    render() {

        return (
            <div>
                {/*SEO Support*/}
                {/*SEO Support End */}
                <Breadcrumb title={'Blog Page'} />

                {/*Blog Details section*/}
                <section className="section-b-space  blog-page">
                    <div className="container">
                    {this.state.loading? 
                        <div className="loading-indicator"><BlinkBlur color="#427fc1" size="small" text="loading" textColor="#020202" /></div> :
                        <div className="row">

                            <div className="col-xl-3 col-lg-4 col-md-5">
                                <div className="blog-sidebar">
                                    <div className="theme-card">
                                        <h4>Recent Blog</h4>
                                        <ul className="recent-blog">
                                            {this.state.recentBlogs.map((blog, index) =>
                                               <Link key={index} href={`/blog/${blog.id}/${this.formatString(blog.title)}`}>
                                                    <li >
                                                        <div className="media">
                                                            <img className="img-fluid" src={getImage(blog.blog_image)}
                                                                alt={blog.title} loading="lazy" />
                                                            <div className="media-body align-self-center">
                                                                <h6>{blog.date}</h6>
                                                                <p>{blog.likes} Likes</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <hr />
                                                </Link>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="theme-card">
                                        <h4>Popular Blog</h4>
                                        <ul className="popular-blog">
                                            {this.state.popularBlogs.map((blog, index) =>
                                                <Link key={index} href={`/blog/${blog.id}/${this.formatString(blog.title)}`}>
                                                    <li>
                                                        <div className="media">
                                                            <img className="img-fluid" style={{ "maxWidth": "50%" }} src={getImage(blog.blog_image)}
                                                                alt={blog.title} loading="lazy" />
                                                            <div className="media-body align-self-center">
                                                                <h6>{blog.date}</h6>
                                                                <p>{blog.likes} Likes</p>
                                                            </div>
                                                        </div>
                                                        <p>{blog.title}</p>
                                                    </li>
                                                    <hr />
                                                </Link>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8 col-md-7 order-sec">
                            <BlogList blogs={this.state.blogs} />
                            </div>

                        </div>
    }
                    </div>
                </section>

            </div>
        )
    }
}

export default BlogPage