import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import './Component.css';

export default function Drawer() {
   const [imageNum, setImageNum] = useState(1);
   const sliderImages = [
      {
         url: "https://uspoloassn.in/cdn/shop/files/Bestsellers_HP_Banner_Desktop_3_1_1944x.jpg?v=1711268988",
      },
      {
         url: "https://uspoloassn.in/cdn/shop/files/legends_footwear_banner_desktop_1944x.jpg?v=1711538102",
      },
      {
         url: "https://uspoloassn.in/cdn/shop/files/Summer_Whites_HP_Banner_Desktop_2_1944x.jpg?v=1711526744",
      },
      {
         url: "https://uspoloassn.in/cdn/shop/files/Everything_denim_Top_Banner_Desktop_1_1944x.jpg?v=1710334072",
      },
      {
         url: "https://uspoloassn.in/cdn/shop/files/footwear-banners_1_1944x.jpg?v=1711535421",
      }
   ];
   return (
      <div className="container-fluid" style={{marginTop: "10px"}}>
         <SimpleImageSlider
            width={97.8 + '%'}
            height={620}
            images={sliderImages}
            showNavs={true}
            autoPlay={true}
            showBullets={true}
            autoPlayDelay = {3}
         />
      </div>
   );
}