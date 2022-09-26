import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdUnarchive } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import PropTypes from "prop-types";
import {LocaleConsumer} from '../context/LocaleContext'

function Navigation({ logout, name }) {
  return (
    <LocaleConsumer>
    {
      ({ locale, toggleLocale}) => {
        return (
          <nav className="navigation">
            <ul>
              <li>
                <button onClick={toggleLocale} className='action'>
                  {locale === "id" ? "en" : "id"}
                </button>
              </li>
              <li>
                <Link to="/arsip">
                  <MdUnarchive />
                </Link>
              </li>
              <li>
                <Link to="/add">
                  <MdOutlineAddBox />
                </Link>
              </li>
              <li>
                <button onClick={logout} className="button-logout">
                  {name} <FiLogOut />
                </button>
              </li>
            </ul>
          </nav>
           )
          }
        }
      </LocaleConsumer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
