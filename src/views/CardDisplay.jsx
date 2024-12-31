import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import WorkIcon from "@mui/icons-material/Work";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PetsIcon from "@mui/icons-material/Pets";
import MovieIcon from "@mui/icons-material/Movie";

const categoryStyles = {
  Deportes: { color: "#1E90FF", icon: <SportsSoccerIcon style={{ color: "white" }} /> },
  Profesión: { color: "#FF1493", icon: <WorkIcon style={{ color: "white" }} /> },
  Historia: { color: "#FFD700", icon: <HistoryEduIcon style={{ color: "white" }} /> },
  Comida: { color: "#32CD32", icon: <RestaurantIcon style={{ color: "white" }} /> },
  Animales: { color: "#FF4500", icon: <PetsIcon style={{ color: "white" }} /> },
  Películas: { color: "#8A2BE2", icon: <MovieIcon style={{ color: "white" }} /> },
};

const CardDisplay = ({ card }) => {
  if (!card) return null;

  return (
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
      {Object.keys(card).map((category) => (
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
          <p style={{ margin: "0", fontSize: "16px" }}>{card[category]}</p>
        </div>
      ))}
    </div>
  );
};

export default CardDisplay;
