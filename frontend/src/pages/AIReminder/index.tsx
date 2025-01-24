import React from 'react';
import { Layout } from 'antd';
import './index.css';

const { Content } = Layout;

const AIReminder: React.FC = () => {
  return (
    <Layout className="ai-reminder">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>AI日程 - 智能日程管理助手</h1>
          <p className="subtitle">让AI帮你规划每一天，提升工作效率</p>
          <div className="hero-buttons">
            <button className="primary-button">立即开始</button>
            <button className="secondary-button">了解更多</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero-calendar.png" alt="AI日程展示" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>核心功能</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI智能规划</h3>
            <p>自动分析你的日程，智能调整安排���让时间管理更高效</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>灵活日程管理</h3>
            <p>支持多视图切换，日/周/月度规划一目了然</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>智能提醒</h3>
            <p>基于场景的智能提醒，不错过重要事项</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>多端同步</h3>
            <p>数据实时同步，随时随地管理日程</p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="how-it-works">
        <h2>如何使用</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>输入日程</h3>
            <p>简单输入你的日程安排</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI分析</h3>
            <p>AI智能分析并优化你的时间安排</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>智能提醒</h3>
            <p>及时收到重要日程提醒</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>用户评价</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"AI日程帮我节省了大量时间，再也不用手动规划日程了。"</p>
            <div className="testimonial-author">
              <img src="/images/avatar1.png" alt="用户头像" />
              <div>
                <h4>张先生</h4>
                <p>产品经理</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"智能提醒功能特别实用，让我的工作安排更加合理。"</p>
            <div className="testimonial-author">
              <img src="/images/avatar2.png" alt="用户头像" />
              <div>
                <h4>李女士</h4>
                <p>自由职业者</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>开始使用 AI日程</h2>
        <p>让AI助你规划完美日程</p>
        <button className="primary-button">立即开始</button>
      </section>
    </Layout>
  );
};

export default AIReminder; 