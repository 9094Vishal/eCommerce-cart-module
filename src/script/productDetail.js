import { setNavBar } from "./helper.js";
import { productsData } from "../mock/productData.js";
import { addToCart } from "./helper.js";
let quntity = 1;
document.addEventListener("DOMContentLoaded", () => {
  setNavBar(false);
  makePage();
  const imgs = document.querySelectorAll(".img-select a");

  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;

    document.querySelector(".img-showcase").style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }

  window.addEventListener("resize", slideImage);

  if (stock != 0) {
    document.getElementById("cart-quntity").addEventListener("change", (e) => {
      quntity = e.target.value;
    });
    document.getElementById("add-to-cart").addEventListener("click", () => {
      addToCart(productId.toString(), Number(quntity));
      setNavBar(false);
    });
  }

  const cartQuentity = document.getElementById("cart-quntity");
  for (let i = 1; i <= stock; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", i);
    const value = document.createTextNode(i);
    option.appendChild(value);
    cartQuentity.appendChild(option);
  }
  // expanded text
  let length = 100,
    div = document.getElementById("description");
  const text = div.innerHTML;
  if (div) {
    let trunc = div.innerHTML;

    if (trunc.length > length) {
      (trunc = trunc.substring(0, length)), (trunc += "...");
      trunc.replace(/\w+$/, "");

      div.innerHTML = trunc;
    }

    document.getElementById("btn-text").addEventListener("click", (e) => {
      if (e.target.innerHTML == "Show more") {
        div.innerHTML = text;
        e.target.innerHTML = "Show less";
      } else {
        div.innerHTML = trunc;
        e.target.innerHTML = "Show more";
      }
    });
  }
  // star
  const stars_container = document.getElementsByClassName("stars-container");
  for (let element of stars_container) {
    let rate = element.getAttribute("data-rate");
    let starsfill = element.getElementsByClassName("starfill");
    for (let i = 0; i < 5; i++) {
      let star = element.getElementsByClassName("starfill")[i];
      if (rate > i) {
        if (rate < i + 1) {
          // If the rating is between i and i+1, set the width of the star to represent the fractional part
          star.style.width = `${(rate - i) * 100}%`;
        } else {
          // If the rating is greater than i, set the width of the star to 100%
          star.style.width = "100%";
        }
      } else {
        // If the rating is less than i, set the width of the star to 0%
        star.style.width = "0%";
      }
    }
  }
});
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
const {
  title,
  images,
  description,
  category,
  price,
  discountPercentage,
  rating,
  warrantyInformation,
  brand,
  stock,
  shippingInformation,
  returnPolicy,
  reviews,
  availabilityStatus,
} = productsData.find((item) => item.id.toString() === productId.toString());

const makePage = () => {
  const imgShowcase = document.querySelector(".img-showcase");
  const thumbnailImagesWrapper = document.querySelector(".img-select");
  const image = images.map((item) => {
    return ` <img
                class="min-w-full w-full h-full object-contain block"
                src="${item}"
                alt="Product image"
              />
              `;
  });

  if (images.length > 1) {
    const thumbnailImages = images.map((item, index) => {
      return `
       <div class="img-item h-full m-1 odd:m-0 even:m-0 hover:opacity-85">
                <a href="#" data-id="${index + 1}">
                  <img
                 class="h-full w-full"
                    src="${item}"
                    alt="product image"
                  />
                </a>
              </div>
      `;
    });
    thumbnailImagesWrapper.innerHTML = thumbnailImages.join("");
  }

  imgShowcase.innerHTML = image.join("");
  const starRating = `
  <div class="flex items-center">
  ${rating}&nbsp;
  <div
    class="stars-container"
    style="font-size: 20px; color: orange; display: flex"
    data-rate="${rating}"
  >
    <div
      class="star-container"
      style="
        margin-right: 5px;
        position: relative;
        width: auto; /*width: 1em;*/ /*height: 1em;*/
      "
    >
      <div
        class="starfill"
        style="
          position: absolute;
          width: 100%;
          overflow: hidden; /*height: 1em;*/
        "
      >
        <i
          class="fa fa-star"
          style="/*position: absolute;*/ /*width: 50%;*/"
        ></i>
      </div>
      <div style="overflow: hidden" veiwbox="0 0 15 15">
        <i class="fa fa-star-o" style="/*position: absolute;*/ width: 100%"></i>
      </div>
    </div>
    <div
      class="star-container"
      style="
        margin-right: 5px;
        position: relative;
        width: auto; /*width: 1em;*/ /*height: 1em;*/
      "
    >
      <div
        class="starfill"
        style="
          position: absolute;
          width: 100%;
          overflow: hidden; /*height: 1em;*/
        "
        veiwbox="0 0 15 15"
      >
        <i
          class="fa fa-star"
          style="/*position: absolute;*/ /*width: 50%;*/"
        ></i>
      </div>
      <div style="overflow: hidden" veiwbox="0 0 15 15">
        <i class="fa fa-star-o" style="/*position: absolute;*/ width: 100%"></i>
      </div>
    </div>
    <div
      class="star-container"
      style="
        margin-right: 5px;
        position: relative;
        width: auto; /*width: 1em;*/ /*height: 1em;*/
      "
    >
      <div
        class="starfill"
        style="
          position: absolute;
          width: 100%;
          overflow: hidden; /*height: 1em;*/
        "
        veiwbox="0 0 15 15"
      >
        <i
          class="fa fa-star"
          style="/*position: absolute;*/ /*width: 50%;*/"
        ></i>
      </div>
      <div style="overflow: hidden" veiwbox="0 0 15 15">
        <i class="fa fa-star-o" style="/*position: absolute;*/ width: 100%"></i>
      </div>
    </div>
    <div
      class="star-container"
      style="
        margin-right: 5px;
        position: relative;
        width: auto; /*width: 1em;*/ /*height: 1em;*/
      "
    >
      <div
        class="starfill"
        style="position: absolute; width: 100%; overflow: hidden"
        veiwbox="0 0 15 15"
      >
        <i
          class="fa fa-star"
          style="/*position: absolute;*/ /*width: 50%;*/"
        ></i>
      </div>
      <div style="overflow: hidden" veiwbox="0 0 15 15">
        <i class="fa fa-star-o" style="/*position: absolute;*/ width: 100%"></i>
      </div>
    </div>
    <div
      class="star-container"
      style="
        margin-right: 5px;
        position: relative;
        width: auto; /*width: 1em;*/ /*height: 1em;*/
      "
    >
      <div
        class="starfill"
        style="
          position: absolute;
          width: 88%;
          overflow: hidden; /*height: 1em;*/
        "
        veiwbox="0 0 15 15"
      >
        <i
          class="fa fa-star"
          style="/*position: absolute;*/ /*width: 50%;*/"
        ></i>
      </div>
      <div style="overflow: hidden" veiwbox="0 0 15 15">
        <i class="fa fa-star-o" style="/*position: absolute;*/ width: 100%"></i>
      </div>
    </div>
  </div>
</div>
  `;
  // product
  const productContent = document.querySelector(".product-content");
  const productDetails = `
  <h2 class="product-title text-2xl md:text-5xl capitalize font-semibold text-[#12263a] my-4 
  after:absolute after:content-[""] after:left-0 after:bottom-0 after:h-1 after:w-20 after:bg-[#12263a]
  ">${title}</h2>
          ${starRating}

          <div class="product-price my-4 text-base font-semibold">
            <p class="last-price ">Old Price: <span class="font-normal text-[#f64749] line-through">$${Number(
              price * discountPercentage
            ).toFixed(2)}</span></p>
            <p class="new-price">New Price: <span class="text-[#256eff]">$${price} (${discountPercentage}%)</span></p>
          </div>

          <div class="product-detail">
            <h2 class="capitalize text-[#12263a] pb-2">about this item:</h2>
            <div id="description">
             ${description}
            </div>
            <span id="btn-text" class="text-[#256eff] cursor-pointer" >Show more</span>
            <ul class="my-4 text-[0.9rem]" >
              <li class="m-0 list-none  flex   my-2  gap-1 font-semibold">
              <span > <img
              class="h-4 w-4"
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/checked.png"
                    alt="product image"
                  /> </span>
                   Brand: <span class="font-normal">${brand}</span></li>
              <li class="m-0 list-none  flex   my-2  gap-1 font-semibold"><span > <img
              class="h-4 w-4"
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/checked.png"
                    alt="product image"
                  /> </span>Available: <span class="font-normal">${availabilityStatus}</span></li>
              <li class="m-0 list-none  flex   my-2  gap-1 font-semibold"> 
              <span > <img
              class="h-4 w-4"
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/checked.png"
                    alt="product image"
                  /> </span>
              Category: <span class="font-normal">${category}</span></li>
              <li class="m-0 list-none  flex   my-2  gap-1 font-semibold">
              <span > <img
              class="h-4 w-4"
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/checked.png"
                    alt="product image"
                  /> </span>
              Warranty: <span class="font-normal">${warrantyInformation}</span></li>
               <li class="m-0 list-none  flex   my-2  gap-1 font-semibold">
                <span > <img
              class="h-4 w-4"
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/checked.png"
                    alt="product image"
                  /> </span>
               Return policy: <span class="font-normal">${returnPolicy}</span></li>
              <li class="m-0 list-none  flex   my-2  gap-1 font-semibold">
              <span > <img
              class="h-4 w-4"
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/checked.png"
                    alt="product image"
                  /> </span>
              Shipping Fee: <span class="font-normal">Free</span></li>
            </ul>
          </div>

          <div class="my-8 mx-0 flex gap-[10px] items-center">
          ${
            stock != 0
              ? `<select class="cart-quntity rounded p-[10px] bg-[#E4DCCF] border-none outline-none w-fit" name="count" id="cart-quntity"></select>
            <button id="add-to-cart" type="button" class="btn border-[1.5px] border-[#ddd] rounded-xl text-center p-2 outline-none mr-1">
              Add to Cart <i class="fas fa-shopping-cart"></i>
            </button>`
              : `<p class="btn">Out of stock</p>`
          }
             
          </div>
  `;
  productContent.innerHTML = productDetails;
};
