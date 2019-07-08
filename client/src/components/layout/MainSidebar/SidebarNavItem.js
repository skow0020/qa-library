import { NavItem, NavLink } from "shards-react";

import PropTypes from "prop-types";
import React from "react";
import { NavLink as RouteNavLink } from "react-router-dom";

const SidebarNavItem = ({ item, key }) => (
  <NavItem id={item.title.replace(/ /g,'-').toLowerCase()}>
    <NavLink key={key} tag={RouteNavLink} to={item.to}>
      {item.htmlBefore && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
        />
      )}
      {item.title && <span>{item.title}</span>}
      {item.htmlAfter && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
        />
      )}
    </NavLink>
  </NavItem>
);

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object,
  key: PropTypes.number
};

export default SidebarNavItem;
