import { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, TextField, Modal } from '@mui/material';
import CardDisplay from "./CardDisplay"; // Importa el componente reutilizable de la carta
import { useNavigate } from 'react-router-dom';

const Timer = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backgroundFlash, setBackgroundFlash] = useState('black');
  const [showExplosion, setShowExplosion] = useState(false);
  const [showCard, setShowCard] = useState(false); // Nueva bandera para mostrar la carta
  const [currentCard, setCurrentCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar la carta seleccionada del sessionStorage
    const savedCard = sessionStorage.getItem("selectedCard");
    if (savedCard) {
      setCurrentCard(JSON.parse(savedCard));
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 0.01);

        if (timeLeft <= 10) {
          setBackgroundFlash((prev) => (prev === 'black' ? 'red' : 'black'));
        }
      }, 10);
    } else if (timeLeft <= 0 && isRunning) {
      setIsRunning(false);
      setShowExplosion(true);
      playAlarm();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(minutes * 60 + seconds);
    setIsRunning(true);
    setIsModalOpen(true);
    setShowExplosion(false);
    setShowCard(false); // Asegurarnos de que la carta no esté visible al iniciar
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(null);
    setMinutes(1);
    setSeconds(0);
    setIsModalOpen(false);
    setBackgroundFlash('black');
    setShowExplosion(false);
    setShowCard(false);
  };

  const formatTime = () => {
    const mins = Math.floor((timeLeft || 0) / 60);
    const secs = Math.floor(timeLeft % 60);
    const millis = Math.floor((timeLeft % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${millis.toString().padStart(2, '0')}`;
  };

  const playAlarm = () => {
    const audio = new Audio('/src/assets/explosion-47821.mp3');
    audio.play().catch((error) => {
      console.error('Error al reproducir el audio:', error);
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          p: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Temporizador
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Configura el tiempo:
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <TextField
                label="Minutos"
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Segundos"
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                fullWidth
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="success"
            onClick={handleStart}
            fullWidth
            sx={{ mt: 4 }}
          >
            Iniciar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleReset}
            fullWidth
            sx={{ mt: 2 }}
          >
            Reiniciar
          </Button>

          <Button
            variant="contained"
            color="info"
            fullWidth
            onClick={() => navigate('/')}
            sx={{ mt: 4 }}
          >
            Volver al Home
          </Button>
        </Box>

        <Modal open={isModalOpen} onClose={handleReset}>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: showExplosion ? 'black' : backgroundFlash,
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              overflow: 'hidden',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {showExplosion ? (
              <div style={{ textAlign: 'center' }}>
                <img
                  src="https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif"
                  alt="Explosion"
                  style={{ width: '500px', height: 'auto', marginBottom: '20px' }}
                />
                <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowCard(true)}
                    disabled={!currentCard}
                  >
                    Mostrar Carta
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleReset}
                  >
                    Detener / Volver
                  </Button>
                </Box>
              </div>
            ) : (
              <Typography sx={{ fontFamily: 'monospace', fontSize: '200px' }}>
                {formatTime()}
              </Typography>
            )}
          </Box>
        </Modal>

        <Modal open={showCard} onClose={() => setShowCard(false)}>
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              color: 'black',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: 24,
              maxWidth: '500px',
              width: '90%',
              textAlign: 'center',
            }}
          >
            <CardDisplay card={currentCard} /> 
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowCard(false)}
              sx={{ mt: 2 }}
            >
              Volver al Temporizador
            </Button>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default Timer;
