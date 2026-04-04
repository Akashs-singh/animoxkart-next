'use client';

import React, { Component } from 'react';
import Link from 'next/link';
import { withTranslate } from 'react-redux-multilingual'

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navClose: { right: '0px' }
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined' && window.innerWidth < 750) {
            this.setState({ navClose: { right: '-410px' } })
        }
        if (typeof window !== 'undefined' && window.innerWidth < 1199) {
            this.setState({ navClose: { right: '-300px' } })
        }
    }

    openNav() {
        // console.log('open')
        this.setState({ navClose: { right: '0px' } })
    }
    closeNav() {
        this.setState({ navClose: { right: '-410px' } })
    }

    onMouseEnterHandler() {
        if (typeof window !== 'undefined' && window.innerWidth > 1199) {
            document.querySelector("#main-menu").classList.add("hover-unset");
        }
    }


    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensubmenu'))
            event.target.nextElementSibling.classList.remove('opensubmenu')
        else{
            document.querySelectorAll('.nav-submenu').forEach(function (value) {
                value.classList.remove('opensubmenu');
            });
            document.querySelector('.mega-menu-container').classList.remove('opensubmenu')
            event.target.nextElementSibling.classList.add('opensubmenu')
        }
    }
    
    handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;
            
        if(event.target.parentNode.nextElementSibling.classList.contains('opensubmegamenu'))
            event.target.parentNode.nextElementSibling.classList.remove('opensubmegamenu')
        else{
            document.querySelectorAll('.menu-content').forEach(function (value) {
                value.classList.remove('opensubmegamenu');
            });
            event.target.parentNode.nextElementSibling.classList.add('opensubmegamenu')
        }
    }

    render() {
        const { translate } = this.props;
        return (
            <div>
                <div className="main-navbar">
                    <div id="mainnav" >
                        <div className="toggle-nav" onClick={this.openNav.bind(this)} >
                            <i className="fa fa-bars sidebar-bar"></i>
                        </div>
                        <ul className="nav-menu" style={this.state.navClose}>
                            <li className="back-btn" onClick={this.closeNav.bind(this)} >
                                <div className="mobile-back text-right">
                                    <span >Back</span>
                                    <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                                </div>
                            </li>
                            <li >
                            <Link href="/" onClick={this.closeNav.bind(this)} >{translate('home')}</Link>
                                {/* <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('home')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu" >
                                    <li><Link href="/fashion" onClick={this.closeNav.bind(this)} >{translate('fashion')}</Link></li>
                                    <li><Link href="/beauty" onClick={this.closeNav.bind(this)} >{translate('beauty')}</Link></li>
                                    <li><Link href="/electronic" onClick={this.closeNav.bind(this)} >{translate('electronic')}</Link></li>
                                    <li><Link href="/furniture" onClick={this.closeNav.bind(this)} >{translate('furniture')}</Link></li>
                                    <li><Link href="/kids" onClick={this.closeNav.bind(this)} >{translate('kids')}</Link></li>
                                    <li><Link href="/pets" onClick={this.closeNav.bind(this)} >{translate('pets')}</Link></li>
                                    <li><Link href="/vegetables" onClick={this.closeNav.bind(this)} >{translate('vegetables')}</Link></li>
                                    <li><Link href="/watch" onClick={this.closeNav.bind(this)} >{translate('watch')}</Link></li>
                                </ul> */}
                            </li>
                            <li >
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('products')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                {/* <ul className="nav-submenu">
                                    <li><Link href="/left-sidebar/collection" onClick={this.closeNav.bind(this)} >{translate('category_left_sidebar')}</Link></li>
                                    <li><Link href="/right-sidebar/collection" onClick={this.closeNav.bind(this)} >{translate('category_right_sidebar')}</Link></li>
                                    <li><Link href="/no-sidebar/collection" onClick={this.closeNav.bind(this)} >{translate('category_no_sidebar')}</Link></li>
                                    <li><Link href="/metro/collection" onClick={this.closeNav.bind(this)} >{translate('category_metro')}</Link></li>
                                    <li><Link href="/full-width/collection" onClick={this.closeNav.bind(this)} >{translate('category_full_width')}</Link></li>
                                </ul> */}
                               <ul className="nav-submenu">
                                    <li><Link href="/product/collar" onClick={this.closeNav.bind(this)} >{translate('collar')}</Link></li>
                                    <li><Link href="/product/leash" onClick={this.closeNav.bind(this)} >{translate('leash')}</Link></li>
                                    <li><Link href="/product/harness" onClick={this.closeNav.bind(this)} >{translate('harness')}</Link></li>
                                    <li><Link href="/product/body-belt" onClick={this.closeNav.bind(this)} >{translate('body_belt')}</Link></li>
                                    <li><Link href="/product/rope" onClick={this.closeNav.bind(this)} >{translate('rope')}</Link></li>
                                    <li><Link href="/product/chain" onClick={this.closeNav.bind(this)} >{translate('chain')}</Link></li>
                                </ul>
                            </li>
                            <li >
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('categories')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/shop/regular" onClick={this.closeNav.bind(this)} >{translate('regular_products')}</Link></li>
                                    <li><Link href="/shop/premium" onClick={this.closeNav.bind(this)} >{translate('premium_products')}</Link></li>
                                    <li><Link href="/shop/combo" onClick={this.closeNav.bind(this)} >{translate('combo_products')}</Link></li>
                                    <li><Link href="/shop/mega-combo" onClick={this.closeNav.bind(this)} >{translate('mega_combo_products')}</Link></li>
                                    <li><Link href="/shop/offers" onClick={this.closeNav.bind(this)} >{translate('offers_product')}</Link></li>
                                </ul>
                            </li>

                            {/* <li >
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('products')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/column/product/1" onClick={this.closeNav.bind(this)} >{translate('collar')}</Link></li>
                                    <li><Link href="/column/product/1" onClick={this.closeNav.bind(this)} >{translate('leash')}</Link></li>
                                    <li><Link href="/column/product/1" onClick={this.closeNav.bind(this)} >{translate('harness')}</Link></li>
                                    <li><Link href="/column/product/1" onClick={this.closeNav.bind(this)} >{translate('body_belt')}</Link></li>
                                    <li><Link href="/column/product/1" onClick={this.closeNav.bind(this)} >{translate('rope')}</Link></li>
                                    <li><Link href="/column/product/1" onClick={this.closeNav.bind(this)} >{translate('chain')}</Link></li>
                                </ul>
                            </li> */}
                            {/* <li >
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('pets')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/features/element-category" onClick={this.closeNav.bind(this)} >{translate('dog')}</Link></li>
                                    <li><Link href="/features/element-category" onClick={this.closeNav.bind(this)} >{translate('cat')}</Link></li>
                                </ul>
                            </li> */}
                            <li className="mega-menu">
                                {/* <Link href="#" className="dropdown" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('features')}
                                    <span className="sub-arrow"></span>
                                </Link> */}
                                <div className="mega-menu-container" >
                                    <div className="container">
                                        <div className="row">
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title" >
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            {translate('portfolio')}
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li><Link href="/features/portfolio-grid/2" onClick={this.closeNav.bind(this)} >{translate('portfolio_grid_2')}</Link></li>
                                                            <li><Link href="/features/portfolio-grid/3" onClick={this.closeNav.bind(this)} >{translate('portfolio_grid_3')}</Link></li>
                                                            <li><Link href="/features/portfolio-grid/4" onClick={this.closeNav.bind(this)} >{translate('portfolio_grid_4')}</Link></li>
                                                            <li><Link href="/features/portfolio-masonary/2" onClick={this.closeNav.bind(this)} >{translate('portfolio_masonary_2')}</Link></li>
                                                            <li><Link href="/features/portfolio-masonary/3" onClick={this.closeNav.bind(this)} >{translate('portfolio_masonary_3')}</Link></li>
                                                            <li><Link href="/features/portfolio-masonary/4" onClick={this.closeNav.bind(this)} >{translate('portfolio_masonary_4')}</Link></li>
                                                            <li><Link href="/features/portfolio-masonary/full" onClick={this.closeNav.bind(this)} >{translate('portfolio_masonary_full')}</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title" >
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            {translate('theme_elements')}
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li><Link href="/features/element-title" onClick={this.closeNav.bind(this)} >{translate('element_title')}</Link></li>
                                                            <li><Link href="/features/element-banner" onClick={this.closeNav.bind(this)} >{translate('collection_banner')}</Link></li>
                                                            <li><Link href="/features/element-slider" onClick={this.closeNav.bind(this)} >{translate('home_slider')}</Link></li>
                                                            <li><Link href="/features/element-category" onClick={this.closeNav.bind(this)} >{translate('category')}</Link></li>
                                                            <li><Link href="/features/element-service" onClick={this.closeNav.bind(this)} >{translate('service')}</Link></li>
                                                            {/*<li><Link href="/features/element-ratio" onClick={this.closeNav.bind(this)} >{translate('image_size_ratio')}</Link></li>*/}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title" >
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            {translate('product_elements')}
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content" >
                                                        <ul>
                                                            <li className="up-text"><Link href="/features/element-product-box" onClick={this.closeNav.bind(this)} >{translate('product_box')}<span>10+</span></Link></li>
                                                            <li><Link href="/features/element-product-slider" onClick={this.closeNav.bind(this)} >{translate('product_slider')}</Link></li>
                                                            <li><Link href="/features/element-product-no-slider" onClick={this.closeNav.bind(this)} >{translate('no_slider')}</Link></li>
                                                            <li><Link href="/features/element-product-multiple-slider" onClick={this.closeNav.bind(this)} >{translate('multi_slider')}</Link></li>
                                                            <li><Link href="/features/element-product-tab" onClick={this.closeNav.bind(this)} >{translate('tab')}</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title" >
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            {translate('email_template')}
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content" >
                                                        <ul>
                                                            <li><Link href="/email-template.html" onClick={this.closeNav.bind(this)} target="_blank">{translate('order_success')}</Link></li>
                                                            <li><Link href="/email-template-two.html" onClick={this.closeNav.bind(this)} target="_blank">{translate('order_success')}2</Link></li>
                                                            <li><Link href="/email-order-success.html" onClick={this.closeNav.bind(this)} target="_blank">{translate('email_template')}</Link></li>
                                                            <li><Link href="/email-order-success-two.html" onClick={this.closeNav.bind(this)} target="_blank">{translate('email_template')}2</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title">
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            {translate('accessories')}
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content" >
                                                        <ul>
                                                            <li><a href="#">{translate('fashion_jewellery')}</a></li>
                                                            <li><a href="#">{translate('caps_and_hats')}</a></li>
                                                            <li><a href="#">{translate('precious_jewellery')}</a></li>
                                                            <li><a href="#">{translate('necklaces')}</a></li>
                                                            <li><a href="#">{translate('earrings')}</a></li>
                                                            <li><a href="#">{translate('rings_wrist_wear')}</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title" >
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            {translate('men_accessories')}
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content" >
                                                        <ul>
                                                            <li><a href="#">{translate('ties')}</a></li>
                                                            <li><a href="#">{translate('cufflinks')}</a></li>
                                                            <li><a href="#">{translate('pockets_squares')}</a></li>
                                                            <li><a href="#">{translate('helmets')}</a></li>
                                                            <li><a href="#">{translate('scarves')}</a></li>
                                                            <li><a href="#">{translate('phone_cases')}</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {/* <li>
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('pages')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/pages/about-us" onClick={this.closeNav.bind(this)} >{translate('about_us')}</Link></li>
                                    <li><Link href="/pages/404" onClick={this.closeNav.bind(this)} >404</Link></li>
                                    <li><Link href="/pages/lookbook" onClick={this.closeNav.bind(this)} >{translate('lookbook')}</Link></li>
                                    <li><Link href="/pages/login" onClick={this.closeNav.bind(this)} >{translate('login')}</Link></li>
                                    <li><Link href="/pages/register" onClick={this.closeNav.bind(this)} >{translate('register')}</Link></li>
                                    <li><Link href="/pages/search" onClick={this.closeNav.bind(this)} >{translate('search')}</Link></li>
                                    <li><Link href="/pages/collection" onClick={this.closeNav.bind(this)} >{translate('collection')}</Link></li>
                                    <li><Link href="/pages/forget-password" onClick={this.closeNav.bind(this)} >{translate('forget_password')}</Link></li>
                                    <li><Link href="/pages/contact" onClick={this.closeNav.bind(this)} >{translate('contact')}</Link></li>
                                    <li><Link href="/pages/dashboard" onClick={this.closeNav.bind(this)} >{translate('dashboard')}</Link></li>
                                    <li><Link href="/pages/faq" onClick={this.closeNav.bind(this)} >{translate('FAQ')}</Link></li>
                                </ul>
                            </li> */}
                            {/* <li >
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('blog')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu"> */}
                                    {/* `<li><Link href="/blog/blog-page" onClick={this.closeNav.bind(this)} >{translate('blogs')}</Link></li> */}
                                    {/* <li><Link href="/blog/right-sidebar" onClick={this.closeNav.bind(this)} >{translate('blog_right_sidebar')}</Link></li> */}
                                    {/* <li><Link href="/blog/details" onClick={this.closeNav.bind(this)} >{translate('blog_detail')}</Link></li> */}
                                {/* </ul>
                            </li> */}
                            <li >
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>{translate('smart_pet')}<span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/pet-finder-tag" onClick={this.closeNav.bind(this)} >{translate('pet_finder')}</Link></li>
                                    <li><Link href="/my-pets" onClick={this.closeNav.bind(this)} >{translate('my_pets')}</Link></li>
                                    {/* <li><Link href="/blog/details" onClick={this.closeNav.bind(this)} >{translate('blog_detail')}</Link></li> */}
                                </ul>
                            </li>
                            <li >
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('about')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/about-us" onClick={this.closeNav.bind(this)} >{translate('about_us')}</Link></li>
                                    <li><Link href="/contact" onClick={this.closeNav.bind(this)} >{translate('contact')}</Link></li>
                                    {/* <li><Link href="/blog/details" onClick={this.closeNav.bind(this)} >{translate('blog_detail')}</Link></li> */}
                                </ul>
                            </li>

                            {/* <li >
                            <Link href="/blogs" onClick={this.closeNav.bind(this)} >{translate('blogs')}</Link>
                            </li> */}
                            
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTranslate(NavBar);