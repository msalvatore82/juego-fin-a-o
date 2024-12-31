import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import WheelComponent from "./WheelComponent";
import { useNavigate } from "react-router-dom";

const TurnManager = () => {
  const [turn, setTurn] = useState(0);
  const [teams, setTeams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedTeams = JSON.parse(sessionStorage.getItem("teams")) || [];
    const updatedTeams = storedTeams.map((team) => ({
      ...team,
      wonCorona: team.wonCorona || [],
    }));
    setTeams(updatedTeams);

    const storedCategory = sessionStorage.getItem("selectedCategory") || null;
    setSelectedCategory(storedCategory);
  }, []);

  const handleTurnChange = () => {
    setTurn((prevTurn) => {
      return prevTurn === teams.length - 1 ? 0 : prevTurn + 1;
    });
  };

  const handleWinCorona = () => {
    if (selectedCategory && selectedCategory.includes("👑")) {
      const winningTeam = teams[turn];

      if (winningTeam.wonCorona.includes(selectedCategory)) {
        setModalMessage("¡Este equipo ya ha ganado esta corona!");
        setOpenModal(true);
        return;
      }

      const updatedTeams = [...teams];
      const currentTeam = updatedTeams[turn];

      currentTeam.wonCorona = [...currentTeam.wonCorona, selectedCategory];

      setTeams(updatedTeams);

      sessionStorage.setItem("teams", JSON.stringify(updatedTeams));
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
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
              {Array.isArray(teams[turn]?.wonCorona) &&
                teams[turn]?.wonCorona.map((corona, index) => (
                  <li style={{ fontSize: "20px" }} key={index}>{corona}</li>
                ))}
            </ul>
            <h4>Por equipos:</h4>

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
                          backgroundColor: "#f9f9f9",
                        },
                        "&:hover": {
                          backgroundColor: "#f1f1f1",
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

        <Box
          style={{
            width: "60%",
            padding: "20px",
          }}
        >
          <WheelComponent
            turn={turn}
            onCategorySelected={(category) => setSelectedCategory(category)}
          />
        </Box>
      </Box>

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
