import { useState } from 'react';
import { Button, Menu, MenuProps } from 'antd';

import ChatArea from './components/ChatArea';
import Info from './components/Info';
import { useStoreBox } from './store';

import '@chatui/core/dist/index.css';

const App = () => {
  const [current, setCurrent] = useState('chat');
  const { setTheme, setChat, setConversation } = useStoreBox();

  //items for custom menu
  const items: MenuProps['items'] = [
    {
      label: 'Chat',
      key: 'chat',
    },
    {
      label: 'Info',
      key: 'info',
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const handleNewChat = () => {
    setChat([]);
    setTheme('Wordpress');
    setConversation('');
    window.location.reload();
  };

  if (!process.env.REACT_APP_API_KEY) return <div className="openai-block">You need openai token</div>;

  return (
    <div className="App">
      <Button onClick={handleNewChat} className="new-chat-button">
        New Chat
      </Button>
      <Menu items={items} onClick={onClick} selectedKeys={[current]} mode="horizontal" />
      {current === 'chat' && <ChatArea />}
      {current === 'info' && <Info />}
    </div>
  );
};

export default App;
