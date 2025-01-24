import React, { useState } from 'react';
import { 
  ReloadOutlined,
  FolderOutlined,
  AppstoreOutlined,
  UserOutlined,
  MobileOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import './Sidebar.css';

const Sidebar = () => {
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="http://gips2.baidu.com/it/u=2161708353,627709820&fm=3028&app=3028&f=JPEG&fmt=auto?w=2560&h=1920" alt="Logo" />
      </div>
      
      <nav className="nav-items">
        <button className="nav-item" onClick={() => window.location.reload()}>
          <ReloadOutlined />
        </button>
        <button className="nav-item">
          <FolderOutlined />
        </button>
        <button className="nav-item">
          <AppstoreOutlined />
        </button>
        <button className="nav-item">
          <UserOutlined />
        </button>
        <button 
          className="nav-item"
          onMouseEnter={() => setShowQRCode(true)}
          onMouseLeave={() => setShowQRCode(false)}
        >
          <MobileOutlined />
          {showQRCode && (
            <div className="qrcode-popup">
              <img src='' alt="QR Code" />
            </div>
          )}
        </button>
        <button className="nav-item">
          <DesktopOutlined />
        </button>
      </nav>
    </div>
  );
};

export default Sidebar; 
