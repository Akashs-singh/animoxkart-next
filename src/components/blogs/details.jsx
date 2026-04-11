// src/components/blogs/details.jsx
'use client'
import React, { Component } from 'react'
import Breadcrumb from '../common/breadcrumb'
import axios from 'axios'
import { BlinkBlur } from 'react-loading-indicators'
import MultipleCollection from '../layouts/pets/multipleCollection'
import Head from 'next/head'

class BlogDetails extends Component {
  constructor(props) {
    super(props)
    
    // Use initial blog data if provided (from SSR/SSG)
    const initialBlog = props.initialBlog || {
      id: '', blog_id: '', title: '', author_image: '',
      blog_image: '', author_name: '', date: '',
      short_description: '', content: '', tags: [],
      product_tags: [], video_url: '', extend_content: '',
      likes: '', comments: [],
    };
    
    this.state = {
      blog: initialBlog,
      loading: !props.initialBlog, // Only show loading if no initial data
    }
  }

  componentDidMount() {
    // Only fetch if we don't have initial data
    if (!this.props.initialBlog) {
      const id = this.props.params?.id;
      if (id) this.getBlogById(id);
    }
  }

  // Re-fetch if user navigates to a different blog
  componentDidUpdate(prevProps) {
    if (prevProps.params?.id !== this.props.params?.id) {
      this.setState({ loading: true })
      this.getBlogById(this.props.params.id)
    }
  }

  getBlogById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/getBlogById?id=${id}`,
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (response.data != null) {
        this.setState({
          blog: response.data[0],
          loading: false,
        })
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error)
      this.setState({ loading: false })
    }
  }

  render() {
    const { blog, loading } = this.state

    return (
      <div>
        {/* SEO — replaces react-helmet */}
        {!loading && (
          <Head>
            <title>{blog.title} | Animoxkart</title>
            <meta name="description" content={blog.short_description?.replace(/<[^>]+>/g, '').slice(0, 160)} />
          </Head>
        )}

        <Breadcrumb title={'Blog'} />

        <article className="blog-detail-page section-b-space">
          {loading ? (
            <div className="loading-indicator">
              <BlinkBlur color="#427fc1" size="small" text="loading" textColor="#020202" />
            </div>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-sm-12 blog-detail">
                  <h3>{blog.title}</h3>
                  <img src={blog.blog_image} className="img-fluid" alt={blog.title} />
                  <div className="description" dangerouslySetInnerHTML={{ __html: blog.short_description }} />
                  <br />
                  <ul className="post-social">
                    <li>{blog.date}</li>
                    <li>Posted By : {blog.author_name}</li>
                    <li><i className="fa fa-heart"></i> {blog.likes} Likes</li>
                    <li><i className="fa fa-comments"></i> {blog.comments.length} Comments</li>
                  </ul>
                  <br />
                  <section>
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                  </section>
                  <section>
                    <MultipleCollection type={'wearable'} title="" tags={blog.product_tags} />
                  </section>
                  <section>
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.extend_content }} />
                  </section>
                </div>
              </div>

              <div className="row section-b-space">
                <div className="col-sm-12">
                  <ul className="comment-section">
                    {blog.comments.map((comment, index) => (
                      <li key={index}>
                        <div className="media">
                          {/* fixed "" → /assets */}
                          <img src="/assets/images/avtar.jpg" alt="commenter" />
                          <div className="media-body">
                            <h6>{comment.name} <span>{comment.date}</span></h6>
                            <p>{comment.comment}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="row blog-contact">
                <div className="col-sm-12">
                  <h2>Leave Your Comment</h2>
                  <form className="theme-form">
                    <div className="form-row">
                      <div className="col-md-12">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name"
                          placeholder="Enter Your name" required />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email"
                          placeholder="Email" required />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="exampleFormControlTextarea1">Comment</label>
                        <textarea className="form-control" placeholder="Write Your Comment"
                          id="exampleFormControlTextarea1" rows="6"></textarea>
                      </div>
                      <div className="col-md-12">
                        <button className="btn btn-solid" type="submit">Post Comment</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    )
  }
}

export default BlogDetails