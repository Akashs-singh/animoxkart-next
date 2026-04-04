'use client';

import React, { Component } from 'react';
import Link from 'next/link';
import { getImage } from './../common/utils';

class BlogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleCount: 8, // Initial number of visible blogs
        };
    }

    // Truncate text function
    truncateText(text, wordLimit = 80) {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    }

    // Strip HTML tags from a string
    StripHtmlTags(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    formatString(input) {
        // Convert the input string to lowercase
        let lowerCaseString = input.toLowerCase();
        
        // Replace all white spaces with hyphens
        let formattedString = lowerCaseString.replace(/\s+/g, '-');
        
        return formattedString;
    }
    // Handle "View More" button click
    handleViewMore = () => {
        this.setState(prevState => ({
            visibleCount: prevState.visibleCount + 5
        }));
    };

    render() {
        const { blogs } = this.props;
        const { visibleCount } = this.state;
        const displayedBlogs = blogs?.slice(0, visibleCount);

        return (
            <div className="">
                {displayedBlogs?.map((blog, index) => (
                    <React.Fragment key={index}>
                        <div className="row blog-media">
                            <div className="col-xl-6">
                                <div className="blog-left">
                                   <Link key={index} href={`/blog/${blog.id}/${this.formatString(blog.title)}`} blog={blog}>
                                        <img src={getImage(blog.blog_image)} className="img-fluid" alt={blog.title} loading="lazy" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="blog-right">
                                    <div>
                                        <h6>{blog.date}</h6>
                                       <Link key={index} href={`/blog/${blog.id}/${this.formatString(blog.title)}`}>
                                            <h4>{blog.title}</h4>
                                        </Link>
                                        <ul className="post-social">
                                            <li>Posted By : {blog.author_name}</li>
                                            <li><i className="fa fa-heart"></i> {blog.likes} Likes</li>
                                            <li><i className="fa fa-comments"></i> {blog.comments.length} Comments</li>
                                        </ul>
                                        <div>{this.truncateText(this.StripHtmlTags(blog.short_description))}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
                {visibleCount < blogs?.length && (
                  <div style={{"width":"100%","display":"flex","justifyContent":"center"}} className='mb-5'>
                    <button onClick={this.handleViewMore} type="button" className="btn btn-solid ">
                        View More
                    </button>
                    </div>
                )}
            </div>
        );
    }
}

export default BlogList;
