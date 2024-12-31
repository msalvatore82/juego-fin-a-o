import { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupsIcon from '@mui/icons-material/Groups';
import TimerIcon from '@mui/icons-material/Timer';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Link } from 'react-router-dom';

const Home = () => {
  const [teams, setTeams] = useState([]); // Estado para almacenar los equipos

  // Recuperar los equipos desde sessionStorage
  useEffect(() => {
    const storedTeams = JSON.parse(sessionStorage.getItem("teams")) || [];
    const updatedTeams = storedTeams.map((team) => ({
      ...team,
      wonCorona: team.wonCorona || [], // Inicializar wonCorona como un array vacío si no existe
    }));
    setTeams(updatedTeams);
  }, []);

  // Función para resetear el juego y borrar los datos
  const resetGame = () => {
    sessionStorage.clear(); // Borrar todo el sessionStorage
    setTeams([]); // Limpiar el estado de los equipos
  };
  

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          p: 4,
          boxShadow: 3,
        }}
      >
       <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
          ¡Bienvenido al Juego de fin de año!
        </Typography>
        <Typography variant="h6" sx={{ color: '#757575', mb: 4 }}>
          Para jugar entre familiares y amigos. ¡Gana coronas y gana el premio!
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Button
              component={Link}
              to="/team-selection"
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<GroupsIcon />}
              sx={{ height: '90px', fontSize: '1rem', backgroundColor: '#3f51b5', color: 'white' }}
            >
              Selección de Equipos
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              component={Link}
              to="/timer"
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<TimerIcon />}
              sx={{ height: '90px', fontSize: '1rem' }}
            >
              Contador de Tiempo
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              component={Link}
              to="/card-selection"
              fullWidth
              variant="contained"
              color="success"
              startIcon={<ShuffleIcon />}
              sx={{ height: '90px', fontSize: '1rem' }}
            >
              Selección de Cartas
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              component={Link}
              to="/turn-management"
              fullWidth
              variant="contained"
              color="warning"
              startIcon={<SportsEsportsIcon />}
              sx={{ height: '90px', fontSize: '1rem' }}
            >
              Gestión de Turnos
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ color: '#3f51b5', fontWeight: 'bold', mb: 2 }}>
            Coronas ganadas por equipos:
          </Typography>

          {/* Tabla de coronas ganadas por equipos */}
          <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Equipo</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                    Coronas Ganadas
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': {
                        backgroundColor: '#f9f9f9', // Fondo alternado en filas impares
                      },
                      '&:hover': {
                        backgroundColor: '#f1f1f1', // Hover effect
                      },
                    }}
                  >
                    <TableCell>{team.name}</TableCell>
                    <TableCell align="left">
                      {team.wonCorona && team.wonCorona.join(', ')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Botón para resetear el juego */}
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="error"
            sx={{ height: '50px', fontSize: '1rem', width: '40%' }}
            onClick={resetGame}
          >
            Resetear Juego
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
