import React from 'react';
import Icon from '@mdi/react';
import './sidebar.scss';
import { useNavigate } from 'react-router-dom';

interface SidebarItemProps {
  title: string;
  icon: string;
  link: string;
}

export default function SidebarItem(props: SidebarItemProps) {
  const { title, icon, link } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };
  return (
    <li>
      <div
        className="sidebar-item"
        onClick={handleClick}
      >
        <div className="item-icon">
          <Icon path={icon} size={1.2} />
        </div>
        <span className="item-label">{title}</span>
      </div>
    </li>
  );
}
