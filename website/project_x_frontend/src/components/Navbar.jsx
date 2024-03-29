import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

const categories_items = [
  { text: 'Services', src: 'Logo/mob_nav_services_icon.svg', route: '/' },
  { text: 'Games', src: 'Logo/mob_nav_games_icon.png', route: '/' },
  { text: 'Software', src: 'Logo/mob_nav_software_icon.svg', route: '/' },
  { text: 'Promotion code', src: 'Logo/mob_nav_promotioncode_icon.svg', route: '/' },
  { text: 'Hosting', src: 'Logo/mob_nav_hosting_icon.svg', route: '/' },
  { text: 'Other', src: 'Logo/mob_nav_other_icon.png', route: '/' },

];


const Mob_nav_categories_Item =({ text, src, route })=> (
  <Link to={route}>
    <li className="menu-item">
      <div class=' menu-item-name flex items-center'>
        <img src={src} height='22'/>
        <div className="ml-[8px] text-black">{text}</div>
      </div>
    </li>
  </Link>
)


  return (

    
    <header className="block bg-[white] shadow-sm" >
      <div className=" hidden 
                       lg:flex lg:px-[15px]  lg:mx-auto lg:items-center lg:h-[119px] lg:max-w-[950px]  
                       xl:flex xl:px-[15px]  xl:mx-auto xl:items-center xl:h-[119px] xl:max-w-[1130px]  ">
        
        <div className="text-[white] mr-[32px] my-[20px] ml-[-15px] ">
          <img src="Logo/logo_hstock_new_vertical.svg" alt="Logo" height="77"
          width="62" />
        </div>

        <div className=" flex-grow w-100%">
          <div className="flex-col  hidden md:flex  ">

            <div className="flex justify-between pb-[8px]">
            
              <div className=" flex">
                <ul className="flex h-[36px]">
                  <Link to="/projects/">
                    <li className=" mr-[30px] text-[14px] text-[black] hover:text-[crimson] hover:underline ">For buyers</li>
                  </Link>
                  <Link to="/about">
                    <li className="mr-[30px] text-[14px] text-[black] hover:text-[crimson] hover:underline ">For sellers</li>
                  </Link>
                  <Link to="/profile">
                    <li className="mr-[30px] text-[14px] text-[black] hover:text-[crimson] hover:underline ">FAQ</li>
                  </Link>

                  <Link to="/gemini">
                    <li className="mr-[30px] text-[14px] text-[black] hover:text-[crimson] hover:underline ">About the project</li>
                  </Link>
                  <Link to="/Blog">
                    <li className="mr-[30px] text-[14px] text-[black]  hover:text-[crimson] hover:underline ">
                      Blog
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="px-1"> lang </div>

            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                  <form action="https://hstock.org/en/search" method="get" className="flex">
                  <input type="text" name="search" placeholder="Site search" className=" 
                  lg:px-[2px] lg:py-[1px] lg:w-[479px] lg:border-[0px] lg:border-b-[1px] lg:border-gray-300 lg:focus:outline-none
                  xl:px-[2px] xl:py-[1px] xl:w-[754px] xl:border-[0px] xl:border-b-[1px] xl:border-gray-300 xl:focus:outline-none  " 
                  />
                      <button type="submit" className="  py-2 px-4 border-[0px] bg-white">
                          
                      </button>
                  </form>
              </div>          


              <div className="flex items-center">
                <div className=" w-[48px] profile-user_icon">
                <img src="Logo/profile-user.svg" alt="Logo" height="47" width="48" />
                </div>
                <div className="flex-row w-[68px] ">
                
                  <Link to="/signup"><div className="mb-[7px] font-semibold text-[15px]">Sign up</div></Link>
                  <Link to="/login"><div className="mb-[7px] text-[15px]">Sign in</div></Link>
                </div>
              </div>

            </div>

          </div>
          
  
          <div onClick={handleNav} className="block md:hidden">
          </div>
          
          

          

        </div>
      </div>

      <div className="flex bg-white rounded-lg px-[15px] justify-between  mx-auto items-center h-[56px] w-full lg:hidden">
        <div onClick={handleNav} className="block px-[20px] ">
        </div>
        <div className="text-[white]  my-[20px]  ">
            <img src="Logo/logo_hstock_new.svg" alt="Logo" height="38"
            width="115" />
        </div>

        <button className="  py-2 px-4 border-[0px] bg-white">
           
        </button>

        <div
            className={
              nav
                ? "fixed left-0 top-[59px] w-full h-full border-r border-r-gray-900 bg-white ease-in-out duration-[1000ms] md:hidden"
                : "ease-in-out duration-[800ms] w-full h-full fixed left-[-100%] top-[59px]"
            }
          >
            <div className="flex h-[119px] items-center px-4 bg-[black]">
              <div><img src="Logo/user.svg"/></div>
              <div className="text-white px-[15px] mb-[12px]">
                <div className=" text-sm">Sign in</div>
                <div className=" text-sm">Sign up</div>
              </div>

            </div>

            <div className="w-full text-3xl m-4">
              <div class='category-header text-[10px]'>
                CATEGORIES
              </div> 
              <div class='category-container text-[15px] '>
                <ul>
                  {categories_items.map((item,index) => (
                    <Mob_nav_categories_Item key={index} {...item} />
                  ))}
                </ul>
              </div>
              
            </div>
            
            <div>
              <Link to="/projects/">
                <li className="p-4 text-[black] font-semibold">For buyers</li>
              </Link>
              <Link to="/about">
                <li className="p-4 text-[black] font-semibold">For sellers</li>
              </Link>
              <Link to="/profile">
                <li className="p-4 text-[black] font-semibold">FAQ</li>
              </Link>

              <Link to="/gemini">
                <li className="p-4 text-[black] font-semibold">About the project</li>
              </Link>
              
              <div class='flex justify-end mr-[10px]'>
              <li  class="footer-social__item ">
              <img src="Logo/youtube-icon.svg"  alt="Logo" height="37"
              width="42" />
      
              </li>
              <li  class="footer-social__item">
              <img src="Logo/telegram-icon.svg" alt="Logo" height="37"
              width="42" />
                  
              </li>
              <li class="footer-social__item">
              <img src="Logo/vk-icon.svg" alt="Logo" height="37"
              width="42" />   
              </li>
              </div>
              
            </div>
          </div>


      </div>

    </header>
  );
};

function Navbars() {
  return <div style={{ backgroundColor: 'blue', color: 'white' }}>Navbar</div>; // Set your desired Navbar style here
}

export default Navbar;
