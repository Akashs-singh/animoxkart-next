'use client';

import React, { Component } from 'react';
import Link from 'next/link';
import { withTranslate } from 'react-redux-multilingual'

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navClose: { right: '-410px' }  // Start with menu closed on mobile
        }
    }

    componentDidMount() {
        // Check window size on mount (client-side only)
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1199) {
                // Only open on desktop
                this.setState({ navClose: { right: '0px' } })
            } else if (window.innerWidth >= 750) {
                // Medium screens
                this.setState({ navClose: { right: '-300px' } })
            }
            // Mobile stays at -410px (already set in initial state)
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
            const mainMenu = document.querySelector("#main-menu");
            if (mainMenu) {
                mainMenu.classList.add("hover-unset");
            }
        }
    }


    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensubmenu'))
            event.target.nextElementSibling.classList.remove('opensubmenu')
        else {
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

        if (event.target.parentNode.nextElementSibling.classList.contains('opensubmegamenu'))
            event.target.parentNode.nextElementSibling.classList.remove('opensubmegamenu')
        else {
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
                                <div className="mobile-back" style={{ justifyContent:"left"}}>
                                    <i className="fa fa-angle-left pr-2" aria-hidden="true"></i>
                                    <span >Back</span>
                                </div>
                            </li>
                            <li >
                                {/* <i className="fa-solid fa-house"></i> */}
                                <Link href="/" onClick={this.closeNav.bind(this)} >{translate('home')}</Link>
                            </li>
                            <li className="mega-menu web-view">
                                <Link href="#" className="dropdown" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('products')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <div className="mega-menu-container" >
                                    <div className="container">
                                        <div className="row">
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title" >
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            {translate('products')}
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li><Link href="/product/collar" onClick={this.closeNav.bind(this)} >{translate('collar')}</Link></li>
                                                            <li><Link href="/product/leash" onClick={this.closeNav.bind(this)} >{translate('leash')}</Link></li>
                                                            <li><Link href="/product/harness" onClick={this.closeNav.bind(this)} >{translate('harness')}</Link></li>
                                                            <li><Link href="/product/body-belt" onClick={this.closeNav.bind(this)} >{translate('body_belt')}</Link></li>
                                                            <li><Link href="/product/rope" onClick={this.closeNav.bind(this)} >{translate('rope')}</Link></li>
                                                            <li><Link href="/product/chain" onClick={this.closeNav.bind(this)} >{translate('chain')}</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title" >
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            {translate('categories')}
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li><Link href="/shop/regular" onClick={this.closeNav.bind(this)} >{translate('regular_products')}</Link></li>
                                                            {/* <li><Link href="/shop/premium" onClick={this.closeNav.bind(this)} >{translate('premium_products')}</Link></li> */}
                                                            <li><Link href="/shop/combo" onClick={this.closeNav.bind(this)} >{translate('combo_products')}</Link></li>
                                                            <li><Link href="/shop/mega-combo" onClick={this.closeNav.bind(this)} >{translate('mega_combo_products')}</Link></li>
                                                            <li><Link href="/shop/offers" onClick={this.closeNav.bind(this)} >{translate('offers_product')}</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title" >
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            {translate('premium')}
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content" >
                                                        <ul>
                                                            <li><Link href="/product/collar" onClick={this.closeNav.bind(this)} >{translate('collar')}</Link></li>
                                                            <li><Link href="/product/leash" onClick={this.closeNav.bind(this)} >{translate('leash')}</Link></li>
                                                            <li><Link href="/product/harness" onClick={this.closeNav.bind(this)} >{translate('harness')}</Link></li>
                                                            <li><Link href="/product/body-belt" onClick={this.closeNav.bind(this)} >{translate('body_belt')}</Link></li>
                                                            <li><Link href="/product/rope" onClick={this.closeNav.bind(this)} >{translate('rope')}</Link></li>
                                                            <li><Link href="/product/chain" onClick={this.closeNav.bind(this)} >{translate('chain')}</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title" >
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            Dog
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li><Link href="/product/collar?pet=dog" onClick={this.closeNav.bind(this)} >Dog Collar</Link></li>
                                                            <li><Link href="/product/leash?pet=dog" onClick={this.closeNav.bind(this)} >Dog Leash</Link></li>
                                                            <li><Link href="/product/harness?pet=dog" onClick={this.closeNav.bind(this)} >Dog Harness</Link></li>
                                                            <li><Link href="/product/body-belt?pet=dog" onClick={this.closeNav.bind(this)} >Dog Body Belt</Link></li>
                                                            <li><Link href="/product/rope?pet=dog" onClick={this.closeNav.bind(this)} >Dog Rope</Link></li>
                                                            <li><Link href="/product/chain?pet=dog" onClick={this.closeNav.bind(this)} >Dog Chain</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title" >
                                                        <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                            Cat
                                                            <span className="sub-arrow"></span>
                                                        </h5>
                                                    </div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li><Link href="/product/collar?pet=cat" onClick={this.closeNav.bind(this)} >Cat Collar</Link></li>
                                                            <li><Link href="/product/leash?pet=cat" onClick={this.closeNav.bind(this)} >Cat Leash</Link></li>
                                                            <li><Link href="/product/harness?pet=cat" onClick={this.closeNav.bind(this)} >Cat Harness</Link></li>
                                                            <li><Link href="/product/body-belt?pet=cat" onClick={this.closeNav.bind(this)} >Cat Body Belt</Link></li>
                                                            <li><Link href="/product/rope?pet=cat" onClick={this.closeNav.bind(this)} >Cat Rope</Link></li>
                                                            <li><Link href="/product/chain?pet=cat" onClick={this.closeNav.bind(this)} >Cat Chain</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='mobile-view'>
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('products')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/product/collar" onClick={this.closeNav.bind(this)} >{translate('collar')}</Link></li>
                                    <li><Link href="/product/leash" onClick={this.closeNav.bind(this)} >{translate('leash')}</Link></li>
                                    <li><Link href="/product/harness" onClick={this.closeNav.bind(this)} >{translate('harness')}</Link></li>
                                    <li><Link href="/product/body-belt" onClick={this.closeNav.bind(this)} >{translate('body_belt')}</Link></li>
                                    <li><Link href="/product/rope" onClick={this.closeNav.bind(this)} >{translate('rope')}</Link></li>
                                    <li><Link href="/product/chain" onClick={this.closeNav.bind(this)} >{translate('chain')}</Link></li>
                                </ul>
                            </li>
                            <li className='mobile-view'>
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
                            <li className='mobile-view'>
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('premium')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/product/collar" onClick={this.closeNav.bind(this)} >{translate('collar')}</Link></li>
                                    <li><Link href="/product/leash" onClick={this.closeNav.bind(this)} >{translate('leash')}</Link></li>
                                    <li><Link href="/product/harness" onClick={this.closeNav.bind(this)} >{translate('harness')}</Link></li>
                                    <li><Link href="/product/body-belt" onClick={this.closeNav.bind(this)} >{translate('body_belt')}</Link></li>
                                    <li><Link href="/product/rope" onClick={this.closeNav.bind(this)} >{translate('rope')}</Link></li>
                                    <li><Link href="/product/chain" onClick={this.closeNav.bind(this)} >{translate('chain')}</Link></li>
                                </ul>
                            </li>
                            <li className='mobile-view'>
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    Dog
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/product/collar?pet=dog" onClick={this.closeNav.bind(this)} >Dog Collar</Link></li>
                                    <li><Link href="/product/leash?pet=dog" onClick={this.closeNav.bind(this)} >Dog Leash</Link></li>
                                    <li><Link href="/product/harness?pet=dog" onClick={this.closeNav.bind(this)} >Dog Harness</Link></li>
                                    <li><Link href="/product/body-belt?pet=dog" onClick={this.closeNav.bind(this)} >Dog Body Belt</Link></li>
                                    <li><Link href="/product/rope?pet=dog" onClick={this.closeNav.bind(this)} >Dog Rope</Link></li>
                                    <li><Link href="/product/chain?pet=dog" onClick={this.closeNav.bind(this)} >Dog Chain</Link></li>
                                </ul>
                            </li>
                            <li className='mobile-view'>
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    Cat
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/product/collar?pet=cat" onClick={this.closeNav.bind(this)} >Cat Collar</Link></li>
                                    <li><Link href="/product/leash?pet=cat" onClick={this.closeNav.bind(this)} >Cat Leash</Link></li>
                                    <li><Link href="/product/harness?pet=cat" onClick={this.closeNav.bind(this)} >Cat Harness</Link></li>
                                    <li><Link href="/product/body-belt?pet=cat" onClick={this.closeNav.bind(this)} >Cat Body Belt</Link></li>
                                    <li><Link href="/product/rope?pet=cat" onClick={this.closeNav.bind(this)} >Cat Rope</Link></li>
                                    <li><Link href="/product/chain?pet=cat" onClick={this.closeNav.bind(this)} >Cat Chain</Link></li>
                                </ul>
                            </li>

                            <li >
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>{translate('smart_pet')}<span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/pet-finder-tag/intro" onClick={this.closeNav.bind(this)} >Introduction</Link></li>
                                    <li><Link href="/pet-finder-tag" onClick={this.closeNav.bind(this)} >{translate('pet_finder')}</Link></li>
                                    <li><Link href="/my-pets" onClick={this.closeNav.bind(this)} >{translate('my_pets')}</Link></li>
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
                            <li >
                                <Link href="/blogs" onClick={this.closeNav.bind(this)} >{translate('blogs')}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTranslate(NavBar);