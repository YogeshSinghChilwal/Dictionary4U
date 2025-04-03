import * as React from "react";
import { Progress } from "@/components/ui/progress";

interface DynamicProgressProps {
  isLoading: boolean;
}

export function DynamicProgress({isLoading}:DynamicProgressProps){
  const [progress, setProgress] = React.useState(0);

  if(!isLoading){
    setProgress(100)
  }

  React.useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          // Increment progress, but cap it at 90% while loading
          if (prev < 90) return prev + 10;
          return prev;
        });
      }, 500); // Update every 500ms

      return () => clearInterval(interval); // Cleanup interval on unmount or when loading ends
    } else {
      setProgress(0); // Reset progress when not loading
    }
  }, [isLoading]);

  if (isLoading) {
    return (
        <Progress value={progress} className="w-[60%]" />
    );
  }

  return <div>Data Loaded Successfully!</div>;
}
