import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import WheelComponent from "./WheelComponent";
import { useNavigate } from "react-router-dom";

const TurnManager = () => {
  const [turn, setTurn] = useState(0); // Estado para el turno actual
  const [teams, setTeams] = useState([]); // Estado para almacenar los equipos
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para la categoría seleccionada
  const [openModal, setOpenModal] = useState(false); // Estado para abrir y cerrar el modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje que se mostrará en el modal
  const navigate = useNavigate();

  // Recuperar los equipos desde sessionStorage
  useEffect(() => {
    const storedTeams = JSON.parse(sessionStorage.getItem("teams")) || [];
    // Asegurarse de que cada equipo tenga un array para wonCorona
    const updatedTeams = storedTeams.map((team) => ({
      ...team,
      wonCorona: team.wonCorona || [], // Inicializar wonCorona como un array vacío si no existe
    }));
    setTeams(updatedTeams);

    const storedCategory = sessionStorage.getItem("selectedCategory") || null;
    setSelectedCategory(storedCategory);
  }, []);

  // Función para manejar el cambio de turno entre los equipos
  const handleTurnChange = () => {
    setTurn((prevTurn) => {
      // Si el turno es el último, volver al primero
      return prevTurn === teams.length - 1 ? 0 : prevTurn + 1;
    });
  };

  // Función para manejar cuando un jugador gana una corona
  const handleWinCorona = () => {
    if (selectedCategory && selectedCategory.includes("👑")) {
      // Obtener el equipo actual
      const winningTeam = teams[turn];

      // Comprobar si la corona ya ha sido ganada por este equipo
      if (winningTeam.wonCorona.includes(selectedCategory)) {
        // Si la corona ya existe, mostrar el modal
        setModalMessage("¡Este equipo ya ha ganado esta corona!");
        setOpenModal(true); // Abrir el modal
        return; // Si ya tiene la corona, no agregarla de nuevo
      }

      // Añadir la nueva corona a la lista de coronas ganadas por el equipo
      const updatedTeams = [...teams];
      const currentTeam = updatedTeams[turn];

      currentTeam.wonCorona = [...currentTeam.wonCorona, selectedCategory]; // Añadir la nueva corona

      // Actualizar el equipo en el estado
      setTeams(updatedTeams);

      // Guardar la lista de equipos actualizada en sessionStorage
      sessionStorage.setItem("teams", JSON.stringify(updatedTeams));
    }
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        {/* Columna izquierda: Mostrar equipo actual y corona ganada */}
        <Box
          style={{
            width: "40%",
            padding: "20px",
          }}
        >
          <div style={{ fontSize: "25px", color: "#3f51b5", fontWeight: "bold" }}>
            Equipo Actual:
          </div>
          <div style={{ fontSize: "50px", color: "#32CD32", fontWeight: "bold", textShadow: "2px 2px 2px #000000" }}>
            {teams[turn]?.name.toUpperCase()}
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: "40%", height: "50px" }}
            onClick={handleTurnChange}
          >
            Cambiar equipo
          </Button>

          <Box mt={3}>
            <Button variant="contained" color="success" sx={{ width: "40%", height: "50px" }} onClick={handleWinCorona}>
              Ganar Corona
            </Button>
            <div style={{ fontSize: "20px", color: "#3f51b5", fontWeight: "bold", marginTop: "20px" }}>
              Coronas ganadas por el equipo:
            </div>
            <ul>
              {/* Mostrar las coronas ganadas por el equipo actual */}
              {Array.isArray(teams[turn]?.wonCorona) &&
                teams[turn]?.wonCorona.map((corona, index) => (
                  <li style={{ fontSize: "20px" }} key={index}>{corona}</li>
                ))}
            </ul>
            <h4>Por equipos:</h4>

            {/* Tabla de coronas ganadas por equipos */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Equipo</TableCell>
                    <TableCell align="left">Coronas Ganadas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams.map((team, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#f9f9f9", // Fondo alternado en filas impares
                        },
                        "&:hover": {
                          backgroundColor: "#f1f1f1", // Hover effect
                        },
                      }}
                    >
                      <TableCell>{team.name}</TableCell>
                      <TableCell align="left">
                        {team.wonCorona && team.wonCorona.join(", ")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Button
            variant="contained"
            color="info"
            sx={{ mt: 4, width: "40%", height: "50px" }}
            onClick={() => navigate("/")}
          >
            Volver al home
          </Button>
        </Box>

        {/* Columna derecha: Mostrar la ruleta */}
        <Box
          style={{
            width: "60%",
            padding: "20px",
          }}
        >
          <WheelComponent
            turn={turn}
            onCategorySelected={(category) => setSelectedCategory(category)} // Pasar la categoría seleccionada
          />
        </Box>
      </Box>

      {/* Modal para cuando un equipo ya ha ganado una corona */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>¡Error!</DialogTitle>
        <DialogContent>{modalMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TurnManager;
