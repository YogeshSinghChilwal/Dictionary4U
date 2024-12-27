import { Volume2 } from "lucide-react";
import { useRef } from "react";

type Props = {
  audioLink: string;
  word: string;
};

const Audio = ({ audioLink, word }: Props) => {
  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    synth.speak(utterance);
  };

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    audioLink.length === 0 ? handleSpeak() : audioRef.current?.play();
  };

  return (
    <div className="mt-1">
      <audio ref={audioRef} src={audioLink} />
      <button onClick={playAudio}>
        <Volume2 />
      </button>
    </div>
  );
};

export default Audio;
