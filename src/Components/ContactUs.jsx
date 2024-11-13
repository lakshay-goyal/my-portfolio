import React from "react";
import Lakshay from '../assets/img/Lakshay.png'

function ContactUs() {
  return (
    <div>
      <footer class="bg-footerColor text-white" id="Contact">
        <div class="flex flex-col justify-around h-full w-full py-8 px-4 lg:flex-row">
          <div class="flex flex-col items-center space-y-4 lg:flex-row lg:space-x-24">
            <div class="flex flex-col items-center text-xl font-semibold">
              <img
                class="w-24 h-24 rounded-full m-4"
                src={Lakshay}
                alt="Lakshay Goyal"
              />
              <h4>Lakshay Goyal</h4>
            </div>
            <div class="flex flex-col items-center lg:items-start">
              <h6 class="font-semibold">Social Media</h6>
              <div class="flex space-x-5 mt-2">
                <a
                  href="https://www.instagram.com/lakshaygoyal529/"
                  target="_blank"
                >
                  <img
                    src="https://img.freepik.com/free-vector/instagram-logo_1199-122.jpg"
                    alt="Instagram"
                    class="w-10 h-10"
                  />
                </a>
                <a href="https://x.com/lakshayg2004" target="_blank">
                  <img
                    src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg"
                    alt="Twitter"
                    class="w-10 h-10"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/lakshay-goyal-9778a6246/"
                  target="_blank"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png"
                    alt="LinkedIn"
                    class="w-10 h-10"
                  />
                </a>
                <a href="https://github.com/lakshay-goyal" target="_blank">
                  <img
                    src="https://i.pinimg.com/originals/b5/1b/78/b51b78ecc9e5711274931774e433b5e6.png"
                    alt="Github"
                    class="w-10 h-10"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center lg:flex-row lg:space-x-24 mt-8 lg:mt-0">
            <div class="flex flex-col space-y-5 lg:items-center">
              <div class="flex flex-col items-center space-y-2">
                <h6 class="font-semibold text-center">Mobile No:</h6>
                <a
                  class="text-white no-underline text-center"
                  href="tel:+918595236591"
                >
                  +91 85952 36591
                </a>
              </div>
              <div class="flex flex-col items-center space-y-2">
                <h6 class="font-semibold text-center">Email-id:</h6>
                <a
                  class="text-white no-underline text-center"
                  href="mailto:lakshaygoyal201@gmail.com"
                >
                  lakshaygoyal201@gmail.com
                </a>
              </div>
            </div>
            <div class="flex flex-col items-center lg:items-start mt-4 lg:mt-0 text-center lg:text-left">
              <h6 class="font-semibold">Address:</h6>
              <p>
                702-Amethyst, <br />
                BDI, Sunshine City, <br />
                Bhiwadi, Rajasthan
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;
