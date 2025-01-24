import React, { useState, useRef } from 'react';
import { Layout } from 'antd';
import Sidebar from '@/components/Layout/Sidebar';
import ChatSearch from '@/components/ChatSearch';
import BookmarkCard from '@/components/BookmarkCard/Bookmark';
import { Bookmark } from '@/types';

const { Content } = Layout;

const Home: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const chatSearchRef = useRef<any>(null);

  const handleBookmarkClick = (text: string) => {
    if (chatSearchRef.current) {
      chatSearchRef.current.setInput(text);
    }
  };

  return (
    <Layout style={{  backgroundColor: '#f3f5fa' }}>
      <Layout className="home-layout">
        <Content className="responsive-layout" style={{ 
          padding: '50px 24px',
          backgroundColor: '#f3f5fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="content-wrapper" style={{ 
            display: 'flex', 
            alignItems: 'center',
            height: '100%',
            width: '100%',
            justifyContent: 'center'}}>
              
            <div className="sidebar-area" style={{ 
              width: '10%',
              maxWidth: '100px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Sidebar />
            </div>

            <div className="search-area" style={{ 
              width: '75%',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <ChatSearch ref={chatSearchRef} />
            </div>

            <div className="bookmark-area" style={{ 
              width: '20%',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <BookmarkCard onTextClick={handleBookmarkClick} />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home; 