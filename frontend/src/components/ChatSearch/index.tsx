import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Input, Button, List } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { chatWithAI } from '@/services/chat';
import ReactMarkdown from 'react-markdown';
import './index.css';

// 在组件外部定义一个全局变量来控制动画是否已播放
let hasAnimationPlayed = false;

// 在组件外部定义欢迎消息组件
const WelcomeContent = React.memo(() => (
  <div style={{ 
    textAlign: 'center',
    color: '#999'
  }}>
    <img 
      src="https://img1.baidu.com/it/u=251522009,1665113150&fm=253&fmt=auto&app=138&f=JPEG?w=512&h=216" 
      alt="empty" 
      style={{ width: 230, marginBottom: 16 }}
    />
    <div className="welcome-content" >
      <TypeWriter text="Hi，我是changxin，这里是我的数字花园，欢迎你的到来~" />
    </div>
  </div>
));

// 消息内容组件
const MessageContent = React.memo(({ content }: { content: string }) => {
  const hasMarkdown = content.includes('```') || content.includes('#') || 
                     content.includes('*') || content.includes('|');
  
  return hasMarkdown ? (
    <ReactMarkdown>{content}</ReactMarkdown>
  ) : (
    <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
  );
});

// 消息项组件
const MessageItem = React.memo(({ item }: { item: any }) => {
  if (item.type === 'welcome') {
    return (
      <List.Item style={{ 
        justifyContent: 'center',
        border: 'none',
        width: '100%',
        padding: '24px 0'
      }}>
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <WelcomeContent />
        </div>
      </List.Item>
    );
  }

  return (
    <List.Item style={{ 
      justifyContent: item.type === 'user' ? 'flex-end' : 'flex-start',
      border: 'none',
      width: 'auto',
      padding: '2px 0'
    }}>
      <div className={`message ${item.type}`}>
        {item.type === 'user' ? (
          <div>{item.content}</div>
        ) : (
          <>
            <img 
              src="http://gips2.baidu.com/it/u=2161708353,627709820&fm=3028&app=3028&f=JPEG&fmt=auto?w=2560&h=1920" 
              alt="AI" 
              className="ai-avatar"
            />
            <div className="message-content">
              <MessageContent content={item.content} />
            </div>
          </>
        )}
      </div>
    </List.Item>
  );
});

const ChatSearch = forwardRef((props, ref) => {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatListRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatListRef.current && messages.length > 0) {
      const lastMessage = chatListRef.current.querySelector('.chat-list .ant-list-items > :last-child');
      if (lastMessage) {
        lastMessage.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'  // 滚动到元素顶部对齐
        });
      }
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const keywordResponses: Record<string, string> = {
    '联系方式': '务热线：10096\n邮箱：service@chinatower.cn',
    '工作时间': '工作日：周一至周五 9:00-18:00\n节假日：以国家法定节假日为准',
  };

  const menuUrlMap: Record<string, string> = {
    '4A系统': 'http://4a.chinatowercom.cn/uac_oa/',
    '金山文档': 'http://yundoc.chinatowercom.cn/kdrive/latest',
    '禅道': 'http://10.43.86.7:9780/zentao/qa.html',
    '华为云': 'https://auth.huaweicloud.com/authui/login.html',
    '堡垒机': 'https://cbh.chinatowercom.cn/',
    '源代码组件分析': 'https://10.38.114.6/#/project/projectList',
    '铁塔换电': 'https://hd.chinatowercom.cn:8083',
    '铁塔换电准生产': 'https://hd.tower0788.cn/index',
    '铁塔充电': 'https://ebc.chinatowercom.cn/ikeawell_charge',
    '汽车充电': 'https://ev.chinatowercom.cn/',
    '小塔出行': 'https://ebike-oper.chinatowercom.cn',
    '电单车': 'https://ebike-oper.chinatowercom.cn',
    '视联':'https://ebc.chinatowercom.cn/ikeawell_charge/login.html',
    '换电APP下载': 'https://www.pgyer.com/BEFA'

  };

  const regexResponses: Array<{
    pattern: RegExp, 
    response: string | ((match: RegExpMatchArray) => string | Promise<string | undefined> | undefined)
  }> = [
    {
      pattern: /(?:执行|任务).*接口/,
      response: async (match) => {
        // 直接发送请求，不需要检查URL
        const response = await fetch('/api/jenkins/build', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          console.error('请求失败');
          return '请求失败';
        }
        console.log('请求成功');

        // 发送初始回复
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: `正在执行任务: 请稍后查看结果` 
        }]);

        // 等待10秒后开始轮询
        await new Promise(resolve => setTimeout(resolve, 10000));
        const result = await pollPendingMessage();
        console.log('轮询结果:', result);
        
        return result;
      }
    },
    {
      pattern: /^(?:帮我|请|)(?:打开|访问)\s*(.+?)(?:网站|官网)$/,
      response: async (match) => {
        const keyword = match[1].trim();
        console.log('网站关键词:', keyword);
        
        if (menuUrlMap[keyword]) {
          setTimeout(() => {
            window.open(menuUrlMap[keyword], '_blank', 'noopener,noreferrer');
          }, 500);
          return `正在跳转至${keyword} ${menuUrlMap[keyword]}`;
        }

        // 使用腾讯 AI 搜索官网
        const aiResponse = await chatWithAI(`请告诉我${keyword}的官方网站地址，只需要返回一个URL，不要其他任何文字。`);
        console.log('AI返回的响应:', aiResponse);
        
        const urlMatch = aiResponse.match(/https?:\/\/[^\s<>"]+/);
        console.log('提取的URL:', urlMatch?.[0]);

        if (urlMatch) {
          setTimeout(() => {
            window.open(urlMatch[0], '_blank');
          }, 500);
          return `正在为您打开${keyword}官网：${urlMatch[0]}`;
        }

        return undefined;
      }
    },
    {
      pattern: /^(?:帮我|请|)(?:打开|登录|执行)\s*[：:]*\s*([\u4e00-\u9fa5A-Za-z0-9\s]+)$/,
      response: (match) => {
        const keyword = match[1].trim();
        const url = menuUrlMap[keyword];
        
        if (url) {
          setTimeout(() => {
            window.open(url, '_blank');
          }, 800);
          return `正在跳转至${keyword} ${url}`;
        }
        
        return undefined;
      }
    },
    {
      pattern: /^(工单|工单号|查工单)\s*[:：]?\s*(\d+)$/,
      response: `工单正在处理中，请耐心等待。`
    },
    {
      pattern: /^(投诉|举报|建议)/,
      response: '您的意见对我们很重要，请拨打10096反馈，我们会认真处理。'
    },
    {
      pattern: /^(你好|你是|你是谁|介绍一下自己)/,
      response: 'Hi~ ，我是changxin，欢迎来到我的主页！'
    },
    {
      pattern: /121\.41\.117\.113/,
      response: (match) => {
        setTimeout(() => {
          window.open(`http://${match[0]}`, '_blank');
        }, 500);
        return '正在打开新窗口';
      }
    }
  ];

  const pollPendingMessage = async (maxTime = 10000, interval = 3000): Promise<string> => {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxTime) {
      try {
        const response = await fetch('/api/messages/latest-pending');
        const data = await response.json();
        
        if (data.success && data.data?.content) {

          // 更新消息状态为已处理
          await fetch(`/api/messages/${data.data.id}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'processed' })
          });

          return data.data.content; // 返回内容
        }
        
        await new Promise(resolve => setTimeout(resolve, interval));
        
      } catch (error) {
        console.error('获取消息失败:', error);
      }
    }
    
    return "执行完成，请打开浏览器查看结果";
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    setLoading(true);
    const userMessage = input.trim();
    console.log('用户输入:', userMessage);
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    
    try {
      let response: string;

      if (keywordResponses[userMessage]) {
        console.log('匹配到关键词回复:', userMessage);
        response = keywordResponses[userMessage];
      } else {
        const regexMatch = regexResponses.find(r => r.pattern.test(userMessage));
        if (regexMatch) {
          console.log('匹配到正则规则:', regexMatch.pattern);
          const match = userMessage.match(regexMatch.pattern);
          if (match) {
            console.log('正则匹配结果:', match);
            if (typeof regexMatch.response === 'function') {
              const result = await regexMatch.response(match);
              if (result === undefined) {
                console.log('未匹配到关键词', userMessage);
                console.log('函数返回undefined，回复默认消息');
                // response = await chatWithAI(userMessage);
                response = '执行成功，请打开浏览器查看';
              } else {
                console.log('使用函数返回的回复');
                response = result;
              }
            } else {
              console.log('使用静态回复');
              response = regexMatch.response;
            }
          } else {
            response = '无效的匹配';
          }
        } else {
          console.log('没有匹配规则，使用AI回复');
          response = await chatWithAI(userMessage);
        }
      }

      setMessages(prev => [...prev, { type: 'ai', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const messagesList = React.useMemo(() => (
    <List
      className="chat-list"
      ref={chatListRef}
      itemLayout="horizontal"
      dataSource={[{ type: 'welcome', content: '' } as any, ...messages]}
      locale={{ emptyText: null }}
      renderItem={item => <MessageItem item={item} />}
    />
  ), [messages]);

  useImperativeHandle(ref, () => ({
    setInput: (text: string) => {
      setInput(text);
    }
  }));

  return (
    <div className="chat-search">
      {messagesList}
      {loading && (
        <div className="thinking">
          <span>马上就好，正在处理中</span>
          <div className="thinking-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      <div className="input-area">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onPressEnter={handleSend}
          placeholder="输入指令或问题..."
          disabled={loading}
        />
        <Button className='send-btn'
          type="primary" 
          icon={<SendOutlined />} 
          onClick={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
});

// TypeWriter 组件移到最外层
const TypeWriter = React.memo(({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const textRef = useRef(text);
  
  useEffect(() => {
    if (hasAnimationPlayed) {
      setDisplayText(textRef.current);
      return;
    }

    const text = textRef.current;
    const timeouts: NodeJS.Timeout[] = [];
    
    for (let i = 1; i <= text.length; i++) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, i));
        if (i === text.length) {
          hasAnimationPlayed = true;
        }
      }, i * 60);
      timeouts.push(timeout);
    }

    return () => timeouts.forEach(clearTimeout);
  }, []); 

  return <div style={{ textAlign: 'center' }}>{displayText}</div>;
});

export default ChatSearch; 