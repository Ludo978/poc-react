import React from 'react';
import { sidebarContent } from '../../constants';
import SidebarItem from './SidebarItem';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-content">
        { sidebarContent.map(({ title, icon, link }) => (
          <SidebarItem title={title} icon={icon} link={link} key={link} />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
