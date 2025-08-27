
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import { UseAuth } from "../hooks/UseAuth";
import { getStreamToken } from "../lib/api";
import PageLoader from "../components/PageLoader";

const VITE_STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;


export const CallPage: React.FC = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);

  const { authUser, isLoading } = UseAuth();

    useEffect(() => {
  const initCall = async () => {
    try {
      // setIsLoading(true);
      const response = await getStreamToken();
      if (!response?.token || !authUser) return;

      const user = {
        id: authUser._id,
        name: authUser.fullName,
        image: authUser.profilePic,
      };

      const videoClient = new StreamVideoClient({
        apiKey: VITE_STREAM_API_KEY,
        user,
        token: response.token,
      });

      const callInstance = videoClient.call("default", callId);
      await callInstance.join({ create: true });

      setClient(videoClient);
      setCall(callInstance);
      // setIsLoading(false);
    } catch (error) {
      console.error("Error joining call:", error);
      toast.error("Could not join the call. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  initCall();
}, [authUser, callId]);


  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );


};
  const CallContent: React.FC = () => {
 


   const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  // When navigating, render nothing
  if (callingState === CallingState.LEFT) return null;

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};


