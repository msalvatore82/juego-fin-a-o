import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import { FaFutbol, FaBriefcase, FaHistory, FaAppleAlt, FaPaw, FaFilm } from 'react-icons/fa'; // Importar los iconos
import Confetti from 'react-confetti'; // Importar react-confetti

// Las categorías con los íconos y con las coronas
const categories = [
  { option: 'Deportes', style: { backgroundColor: '#FF6347' }, icon: <FaFutbol /> },
  { option: 'Animales', style: { backgroundColor: '#00BFFF' }, icon: <FaPaw /> },
  { option: 'Profesión 👑', style: { backgroundColor: '#32CD32' }, icon: <FaBriefcase /> },
  { option: 'Historia 👑', style: { backgroundColor: '#FFD700' }, icon: <FaHistory /> },
  { option: 'Deportes 👑', style: { backgroundColor: '#FF6347' }, icon: <FaFutbol /> },
  { option: 'Comida', style: { backgroundColor: '#8A2BE2' }, icon: <FaAppleAlt /> },
  { option: 'Profesión', style: { backgroundColor: '#32CD32' }, icon: <FaBriefcase /> },
  { option: 'Comida 👑', style: { backgroundColor: '#8A2BE2' }, icon: <FaAppleAlt /> },
  { option: 'Animales 👑', style: { backgroundColor: '#00BFFF' }, icon: <FaPaw /> },
  { option: 'Películas', style: { backgroundColor: '#FF8C00' }, icon: <FaFilm /> },
  { option: 'Historia', style: { backgroundColor: '#FFD700' }, icon: <FaHistory /> },
  { option: 'Películas 👑', style: { backgroundColor: '#FF8C00' }, icon: <FaFilm /> },
];

const WheelComponent = ({ turn, onCategorySelected }) => {
  const [mustSpin, setMustSpin] = useState(false); // Estado para iniciar el giro
  const [prizeNumber, setPrizeNumber] = useState(0); // Estado para la categoría seleccionada
  const [showConfetti, setShowConfetti] = useState(false); // Estado para controlar el confeti
  const [spinning, setSpinning] = useState(false); // Estado para verificar si la ruleta está girando

  const playAlarm = () => {
    const audio = new Audio('/src/assets/success-fanfare-trumpets-6185.mp3');
    audio.play().catch((error) => {
      console.error('Error al reproducir el audio:', error);
    });
  };
  // Función que maneja el clic en el botón de girar
  const handleSpinClick = () => {
    setMustSpin(true);
    setSpinning(true); // Iniciar el estado de giro
    const newPrizeNumber = Math.floor(Math.random() * categories.length); // Seleccionar un valor aleatorio
    setPrizeNumber(newPrizeNumber); // Establecer el número ganador
  };

  // Notificar a TurnManager la categoría seleccionada
  useEffect(() => {
    if (!spinning) {
      const selectedCategory = categories[prizeNumber].option;
      onCategorySelected(selectedCategory); // Pasar la categoría seleccionada al TurnManager

      // Si la categoría tiene corona, reproducir el sonido y mostrar confeti
      if (categories[prizeNumber].option.includes("👑")) {
        playAlarm();
        setShowConfetti(true); // Mostrar confeti
        setTimeout(() => setShowConfetti(false), 3000); // Esconder confeti después de 3 segundos
      }
    }
  }, [spinning, prizeNumber, onCategorySelected]);

  // Función para cuando la ruleta deje de girar
  const handleStopSpinning = () => {
    setMustSpin(false); // Desactivar el giro
    setSpinning(false); // Cambiar el estado de giro
  };

  return (
    <>
      <div align="center" style={{ marginTop: '20px' }}>
        <Wheel
          mustStartSpinning={mustSpin} // Hacer que la ruleta empiece a girar
          prizeNumber={prizeNumber} // Número del premio seleccionado
          data={categories} // Datos con las categorías y sus iconos
          outerBorderColor="#dedede" // Color del borde exterior
          outerBorderWidth={4} // Ancho del borde exterior
          innerBorderColor="#f2f2f2" // Color del borde interior
          radiusLineColor="#dedede" // Color de las líneas radiales
          radiusLineWidth={4} // Ancho de las líneas radiales
          textColors={["#ffffff"]} // Color del texto dentro de los segmentos
          fontSize={25} // Tamaño de la fuente
          perpendicularText={false} // Texto perpendicular en los segmentos
          backgroundColors={categories.map(category => category.style.backgroundColor)} // Colores de fondo de cada segmento
          renderText={(index) => (
            <div style={{ textAlign: "center" }}>
              {categories[index].icon} {/* Icono en el segmento */}
              <div>{categories[index].option}</div> {/* Nombre de la categoría */}
            </div>
          )}
          onStopSpinning={handleStopSpinning} // Cuando la ruleta termine de girar, se llama esta función
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleSpinClick} // Iniciar el giro al hacer clic
          disabled={mustSpin} // Deshabilitar el botón mientras la ruleta gira
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: mustSpin ? 'not-allowed' : 'pointer',
          }}
        >
          {mustSpin ? 'Girando...' : 'Girar'}
        </Button>
        <br />
        {!mustSpin ? (
          <>
            <div
              style={{
                fontSize: '70px',
                color: 'white',
                backgroundColor: categories[prizeNumber].style.backgroundColor, // Usar el color de fondo de la categoría ganadora
                padding: '10px',
                width: 'fit-content',
                marginTop: '20px',
                borderRadius: '10px',
              }}
            >
              {categories[prizeNumber].option} {categories[prizeNumber].icon}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {/* Mostrar confeti solo si la categoría tiene corona */}
      {showConfetti && <Confetti />}
    </>
  );
};

export default WheelComponent;
