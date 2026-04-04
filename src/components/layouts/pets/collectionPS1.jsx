// import React, {Component} from 'react';
// import {connect} from "react-redux";
// import Slider from "react-slick"

// // import Custom Components
// import Breadcrumb from "../../common/breadcrumb";
// import ProductStyleOne from "./product-style-one";
// import {getVisibleproducts} from "../../../services";
// import {addToCart, addToCompare, addToWishlist} from "../../../actions";
// import { getTrendingCollection} from '../../../services'
// import {Product4, Product5} from '../../../services/script';
// class CollectionPS1 extends Component {
//         render (){
//             const {items, products, addToCart, symbol, addToWishlist, addToCompare, title, subtitle} = this.props;
//             // console.log(products)
//             return (
//                 <div>
//                     <section className=" ratio_asos section-b-space">
//                         <div className="container">
//                             <div className="row">
//                                 <div className="col">
//                                 <div className="title1 title5">
//                                     {subtitle?<h4>{subtitle}</h4>:''}
//                                     <h2 className="title-inner1">{title}</h2>
//                                     <hr role="tournament6" />
//                                 </div>
//                                     <Slider {...Product4} className="product-4 product-m no-arrow">
//                                     { products.map((product, index) =>
//                                         <div className="col-xl-3 col-md-6 col-grid-box">
//                                         <ProductStyleOne product={product} symbol={symbol}
//                                                          onAddToCompareClicked={() => addToCompare(product)}
//                                                          onAddToWishlistClicked={() => addToWishlist(product)}
//                                                          onAddToCartClicked={addToCart} key={index}/>
//                                         </div>)}
//                                     </Slider>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                     </div>
//             )
//         }
//     }
    
//     const mapStateToProps = (state) => ({
//         products: getVisibleproducts(state.data, state.filters),
//         symbol: state.data.symbol,
//     })
    
//     export default connect(
//         mapStateToProps, {addToCart, addToWishlist, addToCompare}
//     )(CollectionPS1)

// ProductSlider.jsx
// import React, {Component} from 'react';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from 'swiper/modules';
// // import Swiper and modules styles

// const ProductSlider = () => {
//   const products = [
//     { id: 1, name: "Sneakers", img: "/img/sneakers.jpg", price: "$79" },
//     { id: 2, name: "Headphones", img: "/img/headphones.jpg", price: "$129" },
//     { id: 3, name: "Watch", img: "/img/watch.jpg", price: "$199" },
//     { id: 4, name: "Backpack", img: "/img/backpack.jpg", price: "$49" },
//   ];

//   return (
//     <Swiper
//       modules={[Navigation, Pagination]}
//       spaceBetween={20}
//       slidesPerView={1}
//       navigation
//       pagination={{ clickable: true }}
//       breakpoints={{
//         640: { slidesPerView: 2 },
//         1024: { slidesPerView: 3 },
//       }}
//       style={{ padding: "20px 0" }}
//     >
//       {products.map((p) => (
//         <SwiperSlide key={p.id}>
//           <div
//             style={{
//               background: "#fff",
//               borderRadius: "12px",
//               padding: "15px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//             }}
//           >
//             <img
//               src={p.img}
//               alt={p.name}
//               style={{
//                 width: "100%",
//                 height: "200px",
//                 objectFit: "cover",
//                 borderRadius: "8px",
//               }}
//             />
//             <h3>{p.name}</h3>
//             <p style={{ fontWeight: "bold" }}>{p.price}</p>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default ProductSlider;

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function Slider() {
//   return (
//     <Swiper
//       modules={[Navigation, Pagination, Autoplay]}
//       spaceBetween={20}
//       slidesPerView={1}
//       loop={true}
//       autoplay={{
//         delay: 2000,
//         disableOnInteraction: false,
//       }}
//       pagination={{ clickable: true }}
//       navigation={true}
//       style={{ width: "600px", height: "300px" }}
//     >
//       <SwiperSlide>
//         <div className="slide">Slide 1</div>
//       </SwiperSlide>
//       <SwiperSlide>
//         <div className="slide">Slide 2</div>
//       </SwiperSlide>
//       <SwiperSlide>
//         <div className="slide">Slide 3</div>
//       </SwiperSlide>
//     </Swiper>
//   );
// }
