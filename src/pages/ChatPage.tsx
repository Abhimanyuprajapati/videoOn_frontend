import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UseAuth } from '../hooks/UseAuth';
import { getStreamToken } from '../lib/api';

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from '../components/ChatLoader';
import CallButton from '../components/CallButton';

const VITE_STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const ChatPage: React.FC = () => {
  const {id}= useParams();

  console.log("Chat ID:", id);
    const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = UseAuth();

  useEffect(() => {
    // get stream chat token from backend
    const fetchStreamToken = async () => {
      try {
        const response = await getStreamToken();
        console.log("Stream Token Response:", response);
           if (!response?.token || !authUser) return;
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(VITE_STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          response.token
        );

        const channelId = [authUser._id, id].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, id],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error setting up chat:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStreamToken();
  }, [authUser, id]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

    if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[88vh] p-4">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}
