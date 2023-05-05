import { useState } from 'react';

import { Card, Input } from 'antd';

import { defaultSettings } from '../../constants';
import { useStoreBox } from '../../store';

const Info = () => {
  const { theme, setTheme } = useStoreBox();
  const [themeValue, setThemeValue] = useState('');

  const handleEnter = (value: string) => {
    console.log('value', value);
    setTheme(value);
    setThemeValue('');
  };

  return (
    <div className="Info">
      <div className="inner">
        <h1>Info about request settings</h1>
        <Card title="Model" bordered={false}>
          <p className="value">{defaultSettings.MODEL}</p>
          <p>
            Can do any language task with better quality, longer output, and consistent instruction-following
            Also supports inserting completions within text.
          </p>
        </Card>
        <Card title="Starting prompt" bordered={false}>
          <p className="value">
            {defaultSettings.STARTING_PROMPT}
            {theme}
          </p>
          <p>The context of you conversation</p>
          <Input
            placeholder="Enter new theme"
            value={themeValue}
            onChange={(value: any) => setThemeValue(value.target.value)}
            onPressEnter={(value: any) => handleEnter(value.target.value)}
          />
        </Card>
        <Card title="Maximum length" bordered={false}>
          <p className="value">{defaultSettings.MAX_TOKENS}</p>
          <p>
            The maximum number of tokens to generate in the completion. The token count of your prompt plus
            max_tokens cannot exceed the model's context length. Most models have a context length of 2048
            tokens (except for the newest models, which support 4096).
          </p>
        </Card>
        <Card title="Frequency penalty" bordered={false}>
          <p className="value">{defaultSettings.FREQUENCY_PENALTY}</p>
          <p>
            Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency
            in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
          </p>
        </Card>
        <Card title="Presence penalty" bordered={false}>
          <p className="value">{defaultSettings.PRESENCE_PENALTY}</p>
          <p>
            Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in
            the text so far, increasing the model's likelihood to talk about new topics.
          </p>
        </Card>
        <Card title="Temperature" bordered={false}>
          <p className="value">{defaultSettings.TEMPERATURE}</p>
          <p>
            What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output
            more random, while lower values like 0.2 will make it more focused and deterministic.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Info;
