import { useState, useEffect } from "react";
import cards from "../assets/card.json";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import WorkIcon from "@mui/icons-material/Work";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PetsIcon from "@mui/icons-material/Pets";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";

const CardGame = () => {
  const [currentCard, setCurrentCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCard = sessionStorage.getItem("selectedCard");
    if (savedCard) {
      setCurrentCard(JSON.parse(savedCard));
    }
  }, []);

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const selectedCard = cards[randomIndex];

    sessionStorage.setItem("selectedCard", JSON.stringify(selectedCard));
    setCurrentCard(selectedCard);
  };

  const categoryStyles = {
    Deportes: { color: "#1E90FF", icon: <SportsSoccerIcon style={{ color: "white" }} /> },
    Profesión: { color: "#FF1493", icon: <WorkIcon style={{ color: "white" }} /> },
    Historia: { color: "#FFD700", icon: <HistoryEduIcon style={{ color: "white" }} /> },
    Comida: { color: "#32CD32", icon: <RestaurantIcon style={{ color: "white" }} /> },
    Animales: { color: "#FF4500", icon: <PetsIcon style={{ color: "white" }} /> },
    Películas: { color: "#8A2BE2", icon: <MovieIcon style={{ color: "white" }} /> },
  };

  return (
    <div style={{ position: "relative", textAlign: "center", marginTop: "20px" }}>
      <h1>Juego de Cartas</h1>
      <button
        onClick={getRandomCard}
        style={{
          padding: "10px 20px",
          fontSize: "50px",
          backgroundColor: "#3f51b5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Sacar Carta
      </button>
      {currentCard && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            width: "fit-content",
            margin: "0 auto",
            backgroundColor: "#f9f9f9",
          }}
        >
          {Object.keys(currentCard).map((category) => (
            <div
              key={category}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: categoryStyles[category].color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                }}
              >
                {categoryStyles[category].icon}
              </div>
              <p style={{ margin: "0", fontSize: "16px" }}>{currentCard[category]}</p>
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "15px",
          width: "250px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h4 style={{ marginBottom: "15px", textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>
          Referencias:
        </h4>
        {Object.keys(categoryStyles).map((category) => (
          <div
            key={category}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: categoryStyles[category].color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
              }}
            >
              {categoryStyles[category].icon}
            </div>
            <p style={{ margin: "0", fontSize: "16px", fontWeight: "bold" }}>{category}</p>
          </div>
        ))}
      </div>
      <div 
        style={{
         display: "flex",
         justifyContent: "center",
         marginTop: "20px",
         gap: "20px",
        }}
      >
      <button
        onClick={() => navigate("/timer")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Ir al Temporizador
      </button>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "BLUE",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Ir al INICIO
      </button>
      </div>
      
    </div>
  );
};

export default CardGame;
