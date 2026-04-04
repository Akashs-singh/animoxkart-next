'use client';

import React, { Component } from 'react';
import Link from 'next/link';
import { IntlActions } from 'react-redux-multilingual'
import dynamic from 'next/dynamic';

// Dynamically import Pace to avoid SSR issues
const Pace = dynamic(() => import('react-pace-progress'), { ssr: false });

// Import custom components
import store from '../../../store';
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import CartContainer from "./../../../containers/CartContainer";
import TopBar from "./common/topbar";
import LogoImage from "./common/logo";
import {changeCurrency} from '../../../actions'
import {connect} from "react-redux";

class HeaderOne extends Component {

    constructor(props) {
        super(props);

		this.state = {
			isLoading:false
		}
    }
    /*=====================
         Pre loader
         ==========================*/
    componentDidMount() {
        setTimeout(function() {
            const loaderWrapper = document.querySelector(".loader-wrapper");
            if (loaderWrapper) {
                loaderWrapper.style.display = "none";
            }
        }, 2000);

        this.setState({ open: true });
        
        // Add scroll listener
        window.addEventListener('scroll', this.handleScroll);
	}
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let number = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (number >= 300) {
            if (window.innerWidth < 576) {
                document.getElementById("sticky").classList.remove('fixed');
            }else
            	document.getElementById("sticky").classList.add('fixed');
        } else {
            document.getElementById("sticky").classList.remove('fixed');
        }
    }

    changeLanguage(lang) {
        store.dispatch(IntlActions.setLocale(lang))
	}

    openNav() {
        var openmyslide = document.getElementById("mySidenav");
        if(openmyslide){
            openmyslide.classList.add('open-side')
		}
    }
    openSearch() {
        document.getElementById("search-overlay").style.display = "block";
    }

    closeSearch() {
        document.getElementById("search-overlay").style.display = "none";
    }

	load = ()=>{
		this.setState({isLoading: true});
		fetch().then(()=>{
			// deal with data fetched
			this.setState({isLoading: false})
		})
	};
	
	render() {

		return (
			<div>
				<header id="sticky" className="sticky">
					{this.state.isLoading ? <Pace color="#27ae60"/> : null}
					<div className="mobile-fix-option"></div>
					{/*Top Header Component*/}
					<TopBar/>

					<div className="container">
						<div className="row">
							<div className="col-sm-12" >
								<div className="main-menu" >
									<div className="menu-left">
										<div className="brand-logo">
											<LogoImage logo={this.props.logoName} />
										</div>
									</div>
									<div className="menu-right pull-right">
										{/*Top Navigation Bar Component*/}
										<NavBar/>
										<div>
											<div className="icon-nav">
												<ul>
													<li className="onhover-div mobile-search">
														<div><Link href="/search" > <img src="/assets/images/icon/search.png" className="img-fluid" alt="" />
															<i className="fa fa-search" ></i></Link></div>
													</li>
												
													{/*Header Cart Component */}
													<CartContainer/>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>

                <div id="search-overlay" className="search-overlay">
                    <div>
                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">×</span>
                        <div className="overlay-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <form>
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Search a Product" />
                                            </div>
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

			</div>
			)
	}
}

export default connect(null,
    { changeCurrency }
)(HeaderOne);