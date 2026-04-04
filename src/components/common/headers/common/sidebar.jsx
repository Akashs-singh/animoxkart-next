'use client';

import React, { Component } from 'react';
import Link from 'next/link'

class SideBar extends Component {


    closeNav() {
        var closemyslide = document.getElementById("mySidenav");
        if (closemyslide)
            closemyslide.classList.remove('open-side');
    }

    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub1'))
            event.target.nextElementSibling.classList.remove('opensub1')
        else{
            document.querySelectorAll('.opensub1').forEach(function (value) {
                value.classList.remove('opensub1');
            });
            event.target.nextElementSibling.classList.add('opensub1')
        }
    }
    handleSubTwoMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub2'))
            event.target.nextElementSibling.classList.remove('opensub2')
        else{
            document.querySelectorAll('.opensub2').forEach(function (value) {
                value.classList.remove('opensub2');
            });
            event.target.nextElementSibling.classList.add('opensub2')
        }
    }
    handleSubThreeMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub3'))
            event.target.nextElementSibling.classList.remove('opensub3')
        else{
            document.querySelectorAll('.opensub3').forEach(function (value) {
                value.classList.remove('opensub3');
            });
            event.target.nextElementSibling.classList.add('opensub3')
        }
    }
    handleSubFourMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub4'))
            event.target.nextElementSibling.classList.remove('opensub4')
        else{
            document.querySelectorAll('.opensub4').forEach(function (value) {
                value.classList.remove('opensub4');
            });
            event.target.nextElementSibling.classList.add('opensub4')
        }
    }

    handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensidesubmenu'))
            event.target.nextElementSibling.classList.remove('opensidesubmenu')
        else{
            event.target.nextElementSibling.classList.add('opensidesubmenu')
        }
    }

    render() {
        return (
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="sidebar-overlay" onClick={this.closeNav}></a>
                <nav>
                    <a onClick={this.closeNav}>
                        <div className="sidebar-back text-left">
                            <i className="fa fa-angle-left pr-2" aria-hidden="true"></i> Back
                        </div>
                    </a>
                    <ul id="sub-menu" className="sidebar-menu">
                        <li>
                            <Link href="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                                clothing
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="link-section">
                                                <h5>women's fashion</h5>
                                                <ul>
                                                    <li>
                                                        <Link href="#">dresses</Link>
                                                    </li>
                                                    <li>
                                                    <Link href="#">skirts</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">westarn wear</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">ethic wear</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">sport wear</Link>
                                                    </li>
                                                </ul>
                                                <h5>men's fashion</h5>
                                                <ul>
                                                    <li>
                                                        <Link href="#">sports wear</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">western wear</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">ethic wear</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="link-section">
                                                <h5>accessories</h5>
                                                <ul>
                                                    <li>
                                                        <Link href="#">fashion jewellery</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">caps and hats</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">precious jewellery</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">necklaces</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">earrings</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">wrist wear</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">ties</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">cufflinks</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">pockets squares</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <a href="#" className="mega-menu-banner">
                                            <img src={`/assets/images/mega-menu/fashion.jpg`} alt="" className="img-fluid"/>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="#" onClick={(e) => this.handleSubmenu(e)}>
                                bags
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul>
                                <li>
                                    <Link href="#">shopper bags</Link>
                                </li>
                                <li>
                                    <Link href="#">laptop bags</Link>
                                </li>
                                <li>
                                    <Link href="#">clutches</Link>
                                </li>
                                <li>
                                    <Link href="#" onClick={(e) => this.handleSubTwoMenu(e)} >
                                        purses
                                        <span className="sub-arrow"></span>
                                    </Link>
                                    <ul>
                                        <li>
                                            <Link href="#">purses</Link>
                                        </li>
                                        <li>
                                            <Link href="#">wallets</Link>
                                        </li>
                                        <li>
                                            <Link href="#">leathers</Link>
                                        </li>
                                        <li>
                                            <Link href="#">satchels</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="#" onClick={(e) => this.handleSubmenu(e)}>
                                footwear
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul>
                                <li>
                                    <Link href="#">sport shoes</Link>
                                </li>
                                <li>
                                    <Link href="#">formal shoes</Link>
                                </li>
                                <li>
                                    <Link href="#">casual shoes</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="#" >
                                watches
                            </Link>
                        </li>
                        <li>
                            <Link href="#" onClick={(e) => this.handleSubmenu(e)}>
                                Accessories
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul>
                                <li>
                                    <Link href="#">fashion jewellery</Link>
                                </li>
                                <li>
                                    <Link href="#">caps and hats</Link>
                                </li>
                                <li>
                                    <Link href="#">precious jewellery</Link>
                                </li>
                                <li>
                                    <Link href="#" onClick={(e) => this.handleSubTwoMenu(e)} >
                                        more..
                                        <span className="sub-arrow"></span>
                                    </Link>
                                    <ul>
                                        <li>
                                            <Link href="#">necklaces</Link>
                                        </li>
                                        <li>
                                            <Link href="#">earrings</Link>
                                        </li>
                                        <li>
                                            <Link href="#">wrist wear</Link>
                                        </li>
                                        <li>
                                            <Link href="#" onClick={(e) => this.handleSubThreeMenu(e)} >
                                                accessories
                                                <span className="sub-arrow"></span>
                                            </Link>
                                            <ul>
                                                <li>
                                                    <Link href="#">ties</Link>
                                                </li>
                                                <li>
                                                    <Link href="#">cufflinks</Link>
                                                </li>
                                                <li>
                                                    <Link href="#">pockets squares</Link>
                                                </li>
                                                <li>
                                                    <Link href="#">helmets</Link>
                                                </li>
                                                <li>
                                                    <Link href="#">scarves</Link>
                                                </li>
                                                <li>
                                                    <Link href="#" onClick={(e) => this.handleSubFourMenu(e)} >
                                                        more...
                                                        <span className="sub-arrow"></span>
                                                    </Link>
                                                    <ul>
                                                        <li>
                                                            <Link href="#">accessory gift sets</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="#">travel accessories</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="#">phone cases</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="#">belts & more</Link>
                                        </li>
                                        <li>
                                            <Link href="#">wearable</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="#" >house of design</Link>
                        </li>
                        <li>
                            <Link href="#" onClick={(e) => this.handleSubmenu(e)}>
                                beauty & personal care
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul>
                                <li>
                                    <Link href="#">makeup</Link>
                                </li>
                                <li>
                                    <Link href="#">skincare</Link>
                                </li>
                                <li>
                                    <Link href="#">premium beaty</Link>
                                </li>
                                <li>
                                    <Link href="#" onClick={(e) => this.handleSuTwobmenu(e)}>
                                        more
                                        <span className="sub-arrow"></span>
                                    </Link>
                                    <ul>
                                        <li>
                                            <Link href="#">fragrances</Link>
                                        </li>
                                        <li>
                                            <Link href="#">luxury beauty</Link>
                                        </li>
                                        <li>
                                            <Link href="#">hair care</Link>
                                        </li>
                                        <li>
                                            <Link href="#">tools & brushes</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="#" >home & decor</Link>
                        </li>
                        <li>
                            <Link href="#" >kitchen</Link>
                        </li>
                    </ul>
                </nav>
            </div>

        )
    }
}


export default SideBar;