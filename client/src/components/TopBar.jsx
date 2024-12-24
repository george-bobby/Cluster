import React from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaProjectDiagram } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { BiBookReader } from "react-icons/bi";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";

const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(SetTheme(themeValue));
  };

  const handleSearch = async (data) => { };

  return (
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary'>
      {/* Logo and Name */}
      <Link to='/' className='flex gap-2 items-center'>
        <div
          className={`p-1 md:p-2 rounded text-white ${theme === "dark" ? "text-black bg-[#000000]" : "text-white bg-[#000000]"
            }`}
        >
          <TbSocial />
        </div>
        <span
          className={`text-xl md:text-2xl ${theme === "dark" ? "text-white" : "text-[#000000]"
            } font-semibold`}
        >
          Cluster
        </span>
      </Link>

      {/* Navigation Links */}
      <div className='hidden md:flex gap-6 items-center text-lg'>
        <Link to='/projects' className='flex items-center gap-2 text-ascent-1'>
          <FaProjectDiagram />
          <span>Projects</span>
        </Link>
        <Link to='/hackathons' className='flex items-center gap-2 text-ascent-1'>
          <MdOutlineEventNote />
          <span>Hackathons</span>
        </Link>
        <Link to='/research' className='flex items-center gap-2 text-ascent-1'>
          <BiBookReader />
          <span>Research</span>
        </Link>
      </div>

      {/* Search Bar */}
      <form
        className='hidden md:flex items-center justify-center'
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder='Search...'
          styles='w-[12rem] lg:w-[24rem] rounded-l-full py-2 h-[40px]'  // Explicitly set height to 40px
          register={register("search")}
        />
        <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#0444a4] text-white px-6 py-2 rounded-r-full h-[40px]'  // Set same height as TextInput
        />
      </form>

      {/* Icons */}
      <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl'>
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className='hidden lg:flex'>
          <IoMdNotificationsOutline />
        </div>
        <div>
          <CustomButton
            onClick={() => dispatch(Logout())}
            title='Log Out'
            containerStyles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full'
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
