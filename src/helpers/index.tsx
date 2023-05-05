import { defaultSettings } from '../constants';

export const buildPrompt = (
  user_input: string,
  theme: string,
  conversation: string,
  chat: any[],
  setConversation: (arg0: string) => void,
) => {
  let newConversation = conversation;
  let num_user_inputs = chat.length / 2;
  const user_prefix = defaultSettings['USER_PREFIX'];
  const starting_prompt = defaultSettings['STARTING_PROMPT'] + '' + theme;
  const ai_prefix = defaultSettings['AI_PREFIX'];

  if (newConversation === '') {
    newConversation = starting_prompt + '\n' + user_prefix + user_input + '\n' + ai_prefix;
  } else {
    newConversation = newConversation.trim() + '\n' + user_prefix + user_input + '\n' + ai_prefix;
  }
  num_user_inputs += 1;

  if (num_user_inputs > defaultSettings['MAX_NUM_USER_INPUTS']) {
    let split_conversation = newConversation.split('\n' + user_prefix);
    // Remove the two first elements and then put the rest back together
    split_conversation.splice(0, 2);
    const remaining_conversation = split_conversation.join('\n' + user_prefix);

    newConversation =
      starting_prompt +
      '\n' +
      defaultSettings['CUT_DIALOGUE_PLACEHOLDER'] +
      '\n' +
      user_prefix +
      remaining_conversation;
  }

  setConversation(newConversation.trim());
  return newConversation;
};

export const addToPrompt = (prompt: string, completion: string, setConversation: (arg0: string) => void) => {
  const res = prompt + completion;
  setConversation(res.trim());
};
