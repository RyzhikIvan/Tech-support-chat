/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';
import { Configuration, OpenAIApi } from 'openai';

import { defaultSettings } from '../../constants';
import { useStoreBox } from '../../store';
import { buildPrompt, addToPrompt } from '../../helpers';

const ChatArea = () => {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const { chat, setChat, theme, setConversation, conversation } = useStoreBox();

  const [openai, setOpenai] = useState(
    new OpenAIApi(new Configuration({ apiKey: process.env.REACT_APP_API_KEY })),
  );

  useEffect(() => {
    if (chat.length > 0 && messages.length === 0) {
      chat.map((item) => {
        appendMsg({
          type: item.type,
          content: { text: item.content.text },
          createdAt: item.createdAt,
          position: item.position,
          _id: item._id,
        });
        return null;
      });
    }
  }, []);

  useEffect(() => {
    setChat(messages);
  }, [messages]);

  const handleSend = (type: any, val: string) => {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);
      const prompt: string = buildPrompt(val, theme, conversation, chat, setConversation);

      openai
        .createCompletion({
          model: defaultSettings['MODEL'],
          prompt: prompt,
          stop: defaultSettings['USER_PREFIX'],
          max_tokens: defaultSettings['MAX_TOKENS'],
          temperature: defaultSettings['TEMPERATURE'],
          frequency_penalty: defaultSettings['FREQUENCY_PENALTY'],
          presence_penalty: defaultSettings['PRESENCE_PENALTY'],
        })
        .then((completion) => {
          const responseText = completion.data.choices![0].text!;
          addToPrompt(prompt, responseText, setConversation);
          appendMsg({
            type: 'text',
            content: { text: responseText.trim() },
          });
        });
    }
  };

  function renderMessageContent(msg: any) {
    const { content, createdAt } = msg;

    const date = new Date(createdAt);
    const formattedTime = date.toLocaleTimeString();

    return (
      <div className="bubble-wrapper">
        <Bubble>
          <p className="bubble-time">{formattedTime}</p>
          <p>{content.text}</p>
        </Bubble>
      </div>
    );
  }

  return (
    <Chat
      navbar={{ title: 'Tech Support chat' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      locale="en"
      placeholder="Type a message"
    />
  );
};

export default ChatArea;
