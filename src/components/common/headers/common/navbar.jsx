'use client';

import React, { Component } from 'react';
import Link from 'next/link';
import { withTranslate } from 'react-redux-multilingual'

// ─── Menu data ──────────────────────────────────────────────────────────────

const SHOP_COLUMNS = [
    {
        title: 'Walk & Control',
        titleKey: 'nav_walk_control',
        items: [
            { label: 'Collar',    href: '/products/collar' },
            { label: 'Leash',     href: '/products/leash' },
            { label: 'Harness',   href: '/products/harness' },
            { label: 'Body Belt', href: '/products/body-belt' },
            { label: 'Rope',      href: '/products/rope' },
            { label: 'Chain',     href: '/products/chain' },
            { label: 'Muzzle',    href: '/products/muzzle' },
        ],
    },
    {
        title: 'Style & Accessories',
        titleKey: 'nav_style',
        items: [
            { label: 'Bandana',   href: '/products/bandana' },
            { label: 'Bow Tie',   href: '/products/bow-tie' },
            { label: 'Tags',      href: '/products/tags' },
        ],
    },
    {
        title: 'Comfort & Home',
        titleKey: 'nav_comfort',
        items: [
            { label: 'Bed',       href: '/products/bed' },
            { label: 'Bowl',      href: '/products/bowl' },
            { label: 'Food',      href: '/products/food' },
        ],
    },
    {
        title: 'Care & Grooming',
        titleKey: 'nav_care',
        items: [
            { label: 'Shampoo',   href: '/products/shampoo' },
            { label: 'Medicine',  href: '/products/medicine' },
            { label: 'Powder',    href: '/products/powder' },
        ],
    },
];

const DOG_ITEMS = [
    { label: 'Dog Collar',    href: '/products/dog/collar' },
    { label: 'Dog Leash',     href: '/products/dog/leash' },
    { label: 'Dog Harness',   href: '/products/dog/harness' },
    { label: 'Dog Body Belt', href: '/products/dog/body-belt' },
    { label: 'Dog Muzzle',    href: '/products/dog/muzzle' },
    { label: 'Dog Bandana',   href: '/products/dog/bandana' },
    { label: 'Dog Bow Tie',   href: '/products/dog/bow-tie' },
    { label: 'Dog Bed',       href: '/products/dog/bed' },
    { label: 'Dog Bowl',      href: '/products/dog/bowl' },
    { label: 'Dog Food',      href: '/products/dog/food' },
    { label: 'Dog Shampoo',   href: '/products/dog/shampoo' },
];

const CAT_ITEMS = [
    { label: 'Cat Collar',    href: '/products/cat/collar' },
    { label: 'Cat Leash',     href: '/products/cat/leash' },
    { label: 'Cat Harness',   href: '/products/cat/harness' },
    { label: 'Cat Bandana',   href: '/products/cat/bandana' },
    { label: 'Cat Bow Tie',   href: '/products/cat/bow-tie' },
    { label: 'Cat Bed',       href: '/products/cat/bed' },
    { label: 'Cat Bowl',      href: '/products/cat/bowl' },
    { label: 'Cat Food',      href: '/products/cat/food' },
    { label: 'Cat Shampoo',   href: '/products/cat/shampoo' },
];

const DEALS_ITEMS = [
    { labelKey: 'regular_products',    href: '/shop/regular' },
    { labelKey: 'combo_products',      href: '/shop/combo' },
    { labelKey: 'mega_combo_products', href: '/shop/mega-combo' },
    { labelKey: 'offers_product',      href: '/shop/offers' },
];

// ─── Component ──────────────────────────────────────────────────────────────

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navClose: { right: '-410px' }
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1199) {
                this.setState({ navClose: { right: '0px' } })
            } else if (window.innerWidth >= 750) {
                this.setState({ navClose: { right: '-300px' } })
            }
        }
    }

    openNav() {
        this.setState({ navClose: { right: '0px' } })
    }
    closeNav() {
        this.setState({ navClose: { right: '-410px' } })
    }

    onMouseEnterHandler() {
        if (typeof window !== 'undefined' && window.innerWidth > 1199) {
            const mainMenu = document.querySelector('#main-menu');
            if (mainMenu) mainMenu.classList.add('hover-unset');
        }
    }

    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow')) return;

        if (event.target.nextElementSibling.classList.contains('opensubmenu')) {
            event.target.nextElementSibling.classList.remove('opensubmenu');
        } else {
            document.querySelectorAll('.nav-submenu').forEach((value) => {
                value.classList.remove('opensubmenu');
            });
            const megaContainer = document.querySelector('.mega-menu-container');
            if (megaContainer) megaContainer.classList.remove('opensubmenu');
            event.target.nextElementSibling.classList.add('opensubmenu');
        }
    }

    handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow')) return;

        if (event.target.parentNode.nextElementSibling.classList.contains('opensubmegamenu')) {
            event.target.parentNode.nextElementSibling.classList.remove('opensubmegamenu');
        } else {
            document.querySelectorAll('.menu-content').forEach((value) => {
                value.classList.remove('opensubmegamenu');
            });
            event.target.parentNode.nextElementSibling.classList.add('opensubmegamenu');
        }
    }

    render() {
        const { translate } = this.props;
        const close = this.closeNav.bind(this);

        return (
            <div>
                <div className="main-navbar">
                    <div id="mainnav">
                        <div className="toggle-nav" onClick={this.openNav.bind(this)}>
                            <i className="fa fa-bars sidebar-bar"></i>
                        </div>
                        <ul className="nav-menu" style={this.state.navClose}>
                            {/* ── Back button (mobile) ── */}
                            <li className="back-btn" onClick={close}>
                                <div className="mobile-back" style={{ justifyContent: 'left' }}>
                                    <i className="fa fa-angle-left pr-2" aria-hidden="true"></i>
                                    <span>Back</span>
                                </div>
                            </li>

                            {/* ── Home ── */}
                            <li>
                                <Link href="/" onClick={close}>{translate('home')}</Link>
                            </li>

                            {/* ══════════════════════════════════════════════
                                SHOP — mega-menu (desktop) + submenu (mobile)
                            ══════════════════════════════════════════════ */}
                            <li className="mega-menu web-view">
                                <Link href="#" className="dropdown" onClick={(e) => this.handleSubmenu(e)}>
                                    Shop
                                    <span className="sub-arrow"></span>
                                </Link>
                                <div className="mega-menu-container">
                                    <div className="container">
                                        <div className="row">
                                            {SHOP_COLUMNS.map((col) => (
                                                <div className="col mega-box" key={col.titleKey}>
                                                    <div className="link-section">
                                                        <div className="menu-title">
                                                            <h5 onClick={(e) => this.handleMegaSubmenu(e)}>
                                                                {col.title}
                                                                <span className="sub-arrow"></span>
                                                            </h5>
                                                        </div>
                                                        <div className="menu-content">
                                                            <ul>
                                                                {col.items.map((item) => (
                                                                    <li key={item.href}>
                                                                        <Link href={item.href} onClick={close}>{item.label}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            {/* Shop — mobile submenu */}
                            <li className="mobile-view">
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    Shop
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    {SHOP_COLUMNS.flatMap((col) => col.items).map((item) => (
                                        <li key={item.href}>
                                            <Link href={item.href} onClick={close}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* ══════════════════════════════════════════════
                                DOG
                            ══════════════════════════════════════════════ */}
                            <li>
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    Dog
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    {DOG_ITEMS.map((item) => (
                                        <li key={item.href}>
                                            <Link href={item.href} onClick={close}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* ══════════════════════════════════════════════
                                CAT
                            ══════════════════════════════════════════════ */}
                            <li>
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    Cat
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    {CAT_ITEMS.map((item) => (
                                        <li key={item.href}>
                                            <Link href={item.href} onClick={close}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* ══════════════════════════════════════════════
                                DEALS
                            ══════════════════════════════════════════════ */}
                            <li>
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    Deals
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    {DEALS_ITEMS.map((item) => (
                                        <li key={item.href}>
                                            <Link href={item.href} onClick={close}>{translate(item.labelKey)}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* ══════════════════════════════════════════════
                                SMART PET
                            ══════════════════════════════════════════════ */}
                            <li>
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('smart_pet')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/pet-finder-tag/intro" onClick={close}>Introduction</Link></li>
                                    <li><Link href="/pet-finder-tag" onClick={close}>{translate('pet_finder')}</Link></li>
                                    <li><Link href="/my-pets" onClick={close}>{translate('my_pets')}</Link></li>
                                </ul>
                            </li>

                            {/* ══════════════════════════════════════════════
                                ABOUT
                            ══════════════════════════════════════════════ */}
                            <li>
                                <Link href="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('about')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link href="/about-us" onClick={close}>{translate('about_us')}</Link></li>
                                    <li><Link href="/contact" onClick={close}>{translate('contact')}</Link></li>
                                </ul>
                            </li>

                            {/* ── Blogs ── */}
                            <li>
                                <Link href="/blogs" onClick={close}>{translate('blogs')}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslate(NavBar);
