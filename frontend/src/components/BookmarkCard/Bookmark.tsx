import * as React from 'react';
import './Bookmark.css';
import { SendOutlined } from '@ant-design/icons';

interface BookmarkCardProps {
  onTextClick?: (text: string) => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ onTextClick }) => {
  const handleClick = (text: string) => {
    if (onTextClick) {
      onTextClick(text);
    }
  };

  const bookmarkItems = [
    '你是谁？',
    '查询北京未来3天天气',
    '帮我打开百度官网',
    '帮我打开知乎官网',
    '帮我打开B站官网',
    '帮我打开小红书官网',
    '帮我打开微博官网',
    '帮我打开抖音官网',
    '帮我打开京东官网',
    '帮我打开腾讯视频官网',
    '帮我打开爱奇艺官网',
  ];

  return (
    <div className="bookmark">
      <div className="title">
        <span>常用问题和指令</span>
      </div>
      
      <div className="txt-items" >
        {bookmarkItems.map((text, index) => (
          <div 
            key={index}
            className="txt-item" 
            onClick={() => handleClick(text)}
          >
            <span>{text}</span>
            <SendOutlined className="arrow-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkCard; 