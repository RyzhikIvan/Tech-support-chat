import create from 'zustand';
import { persist } from 'zustand/middleware';

type ChatStore = {
  theme: string;
  setTheme: (theme: string) => void;
  conversation: string;
  setConversation: (theme: string) => void;
  chat: any[];
  setChat: (chat: any[]) => void;
};

const res: string | null = localStorage.getItem('my-chat');
const part: any[] = res ? JSON.parse(res!).state.chat : null;

export const Store = create<ChatStore>()(
  persist(
    (set) => ({
      theme: 'Wordpress',
      setTheme: (theme) => set({ theme }),
      conversation: '',
      setConversation: (conversation) => set({ conversation }),
      chat: part ? part : [],
      setChat: (chat) => set({ chat }),
    }),
    { name: 'my-chat' },
  ),
);

export const useStoreBox = () => Store((state) => state);
