import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, TextField, List, ListItem, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const TeamSelector = () => {
  const [participant, setParticipant] = useState('');
  const [participants, setParticipants] = useState(() => JSON.parse(sessionStorage.getItem('participants')) || []);
  const [teams, setTeams] = useState(() => JSON.parse(sessionStorage.getItem('teams')) || []);
  const [isRandom, setIsRandom] = useState(true);
  const [teamCount, setTeamCount] = useState(2);
  const [isTeamSetupComplete, setIsTeamSetupComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('participants', JSON.stringify(participants));
    sessionStorage.setItem('teams', JSON.stringify(teams));
  }, [participants, teams]);

  const handleAddParticipant = () => {
    if (participant.trim() !== '') {
      setParticipants(prev => [...prev, participant.trim()]);
      setParticipant('');
    }
  };

  const initializeTeams = () => {
    const newTeams = Array.from({ length: teamCount }, (_, i) => ({
      name: `Equipo ${i + 1}`,
      members: [],
    }));
    setTeams(newTeams);
    setIsTeamSetupComplete(true);
  };

  const handleAddToTeam = (teamIndex, name) => {
    if (name.trim() !== '') {
      setTeams(prev => {
        const updatedTeams = [...prev];
        updatedTeams[teamIndex].members.push(name);
        return updatedTeams;
      });
      setParticipants(prev => prev.filter(participant => participant !== name));
    }
  };

  const handleRandomTeams = () => {
    const shuffled = [...participants].sort(() => 0.5 - Math.random());
    const newTeams = Array.from({ length: teamCount }, (_, i) => ({
      name: `Equipo ${i + 1}`,
      members: [],
    }));
    shuffled.forEach((participant, index) => {
      newTeams[index % teamCount].members.push(participant);
    });
    setTeams(newTeams);
    setIsTeamSetupComplete(true);
  };

  const handleSaveTeams = () => {
    sessionStorage.setItem('teams', JSON.stringify(teams));
    alert('Equipos guardados con éxito en la sesión.');
  };

  const handleClearData = () => {
    sessionStorage.clear();
    setParticipants([]);
    setTeams([]);
    setIsTeamSetupComplete(false);
    alert('Datos eliminados de la sesión.');
  };

  const handleChangeTeamName = (teamIndex, newName) => {
    setTeams(prev => {
      const updatedTeams = [...prev];
      updatedTeams[teamIndex].name = newName;
      return updatedTeams;
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
          Selección de Equipos
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          ¿Prefieres equipos aleatorios o armar los tuyos?
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                setIsRandom(true);
                setIsTeamSetupComplete(false);
              }}
            >
              Equipos Aleatorios
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                setIsRandom(false);
                setIsTeamSetupComplete(false);
              }}
            >
              Armar Equipos
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <TextField
            label="Nombre del participante"
            variant="outlined"
            fullWidth
            value={participant}
            onChange={(e) => setParticipant(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={handleAddParticipant}
            fullWidth
          >
            Agregar Participante
          </Button>

          <List sx={{ mt: 2, textAlign: 'left' }}>
            {participants.map((name, index) => (
              <ListItem key={index}>{name}</ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 4 }}>
            Cantidad de Equipos
          </Typography>
          <Select
            value={teamCount}
            onChange={(e) => setTeamCount(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>

          {isRandom && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRandomTeams}
              sx={{ mt: 2 }}
            >
              Generar Equipos Aleatorios
            </Button>
          )}

          {!isRandom && !isTeamSetupComplete && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={initializeTeams}
              sx={{ mt: 2 }}
            >
              Configurar Equipos
            </Button>
          )}

          {isTeamSetupComplete && (
            <Box>
              {teams.map((team, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <TextField
                    label="Nombre del equipo"
                    variant="outlined"
                    fullWidth
                    value={team.name}
                    onChange={(e) => handleChangeTeamName(index, e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h6">{team.name}:</Typography>
                  <List>
                    {team.members.map((member, idx) => (
                      <ListItem key={idx}>{member}</ListItem>
                    ))}
                  </List>
                  <Select
                    value=""
                    onChange={(e) => handleAddToTeam(index, e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="" disabled>
                      Seleccionar Participante
                    </MenuItem>
                    {participants.map((name, idx) => (
                      <MenuItem key={idx} value={name}>{name}</MenuItem>
                    ))}
                  </Select>
                </Box>
              ))}
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleSaveTeams}
                sx={{ mt: 2 }}
              >
                Guardar Equipos
              </Button>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleClearData}
                sx={{ mt: 2 }}
              >
                Eliminar Datos
              </Button>
            </Box>
          )}

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
      </Box>
    </Container>
  );
};

export default TeamSelector;
