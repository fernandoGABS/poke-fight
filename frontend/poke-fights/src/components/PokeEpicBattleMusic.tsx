import React, { useRef, useState } from 'react';
import { Button, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const PokeEpicBattleMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if(audioRef.current){
        if (isPlaying) {
        audioRef.current?.pause();
        } else {
        audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    }
    
  };

  return (
    <Grid>
      <audio autoPlay={true} ref={audioRef} src="https://deeppink-oyster-159418.hostingersite.com/pokemon.mp3" />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePlayPause}
        sx={{
            float:"right",
          marginTop: -5,
          borderRadius: '50%',
          minWidth: '40px',
          minHeight: '40px',
          width: '40px',
          height: '40px',
          padding: 0,
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>
    </Grid>
  );
};

export default PokeEpicBattleMusic;