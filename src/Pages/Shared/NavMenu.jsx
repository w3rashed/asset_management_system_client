import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import useAuth from "@/Hooks/useAuth";
import React, { useEffect } from "react";
import LoginModal from "./LoginModal/LoginModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const NavMenu = () => {
  const { user, logOut } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [showForm, setShowForm] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);

  console.log(user?.email);

  const { data: item = {}, refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: false,
  });
  console.log(item);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  const handleLogOut = () => {
    logOut();
  };

  const role = item?.role;

  console.log(user);

  const menuLinks = (
    <>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              backgroundColor: isActive ? "transparent" : "",
              // border: isActive ? "1px solid #23BE0A" : "",
              color: isActive ? "green" : "",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/"
        >
          HOME
        </NavLink>
      </li>
      {/* without logged in */}
      {!role && (
        <>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/join_employee"
            >
              Join as Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/join_hr_manager"
            >
              Join as HR Manager
            </NavLink>
          </li>
        </>
      )}
      {/* employee */}
      {role == "employee" && (
        <>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/my_assets"
            >
              My Assets
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/my_team"
            >
              My Team
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/request_for_assets"
            >
              Request for an Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/porfile"
            >
              Profile
            </NavLink>
          </li>
        </>
      )}
      {/* hr manager  */}
      {role == "hrManager" && (
        <>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/asset_list"
            >
              Asset List
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/add_asset"
            >
              Add an Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/all_requests"
            >
              All Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/customer_requset_list"
            >
              Customer Request List
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/my_employee_list"
            >
              My Employee List
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/add_employee"
            >
              Add an Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "transparent" : "",
                  // border: isActive ? "1px solid #23BE0A" : "",
                  color: isActive ? "green" : "",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
              to="/porfile"
            >
              Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <GiHamburgerMenu className="text-xl"></GiHamburgerMenu>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Asset Nex</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuLinks}</ul>
      </div>
      <div className="navbar-end">
        {user && (
          <>
            <Button onClick={handleLogOut} className=" btn-active ">
              SIGN OUT
            </Button>
          </>
        )}
        {user ? (
          <div className="ml-2" onClick={() => setShowInfo(!showInfo)}>
            <img className="rounded-full size-16" src={user.photoURL} alt="" />
          </div>
        ) : (
          <Button onClick={() => setShowForm(true)}>Login</Button>
        )}
        {showForm && !user && (
          <LoginModal isOpen={showForm} closeModal={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
};

export default NavMenu;
