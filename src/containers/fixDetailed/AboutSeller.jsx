// import React from 'react'


// const AboutSeller = () => {
//     return (
//         <section>
//             {(user.username === loggedUser)
//                 &&


//                 <div className="flex-between">
//                     <button

//                         className="no-break full-width no-bd border5-radius padd15 bg-orange padd5-top-bottom text-white center-text font14  border5-radius no-outline margin10-right block">Edit fix ₦{fix.price}
//                     </button>
//                     <button
//                         onClick={handleFixState}
//                         className={"full-width font14 padd10 padd5-top-bottom border5-radius no-outline no-bd margin10-right block " + (isActive && "bg-fade")}>{activeBtnText}</button>
//                     <button className=" full-width font14 padd10 padd5-top-bottom no-outline border5-radius no-bd bg-fade">Delete Fix</button>
//                 </div>

//             }
//             <section id="about-seller-section">
//                 <h2>About the Seller</h2>
//                 <div>
//                     <div class="online-status" style={{ padding: "10px 15px 15px 10px" }}>
//                         <div>
//                             <i
//                                 className="fa fa-circle user-offline">

//                             </i>

//                             <span
//                                 className="user-offline">Offline
//                                         </span>
//                         </div>
//                     </div>
//                     <div
//                         className="center-text flex-center">
//                         <div>
//                             <div
//                                 className="seller-username-icon">
//                                 {fix.username[0].toUpperCase()}
//                             </div>

//                         </div>
//                         <div>
//                             <img src="" alt="" />
//                         </div>
//                         <div className="fix-seller-username">
//                             <Link
//                                 to={`/u/${fix.username}`}>{fix.username}
//                             </Link>
//                         </div>
//                     </div>
//                     <div
//                         className="center-text seller-bio">
//                         {user.bio}

//                     </div>
//                     <div
//                         className="center-text user-ongoing-orders">
//                         <i
//                             className="fas fa-clock text-success">

//                         </i>
//                         <span>
//                             Ongoing Orders:
//                                     </span>

//                     </div>
//                     {(user.username !== loggedUser) &&
//                         <div
//                             className="contact-seller-wrapper">
//                             <button
//                                 className="contact-seller-btn">
//                                 Contact Seller
//                                         </button>
//                         </div>
//                     }
//                     <div class="secured" style={{ borderTop: "1px solid #ddd" }}>
//                         <div>
//                             <i class="fas fa-shield-alt text-success"></i>
//                         </div>
//                         <div class="center-text">
//                             <div><strong>100% Secured</strong></div>
//                             <div>
//                                 Job is done or Money back
//                                         </div>
//                         </div>
//                         <div></div>
//                     </div>
//                     <div style={
//                         {
//                             padding: 10,
//                             fontSize: "1.6rem", color: "#374355", lineHeight: "1.5", borderTop: "1px solid #ddd"
//                         }
//                     }>
//                         Your funds are held on Escrow and not sent to the seller. When an order is placed, a page is
//                         created
//                         where you can communicate with the seller
//                                 </div>
//                 </div>
//             </section>
//         </section>
//     )
// }

// export default AboutSeller;