import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import { FaFutbol, FaBriefcase, FaHistory, FaAppleAlt, FaPaw, FaFilm } from 'react-icons/fa';
import Confetti from 'react-confetti';

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
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const playAlarm = () => {
    const audio = new Audio('/src/assets/success-fanfare-trumpets-6185.mp3');
    audio.play().catch((error) => {
      console.error('Error al reproducir el audio:', error);
    });
  };
  const handleSpinClick = () => {
    setMustSpin(true);
    setSpinning(true); 
    const newPrizeNumber = Math.floor(Math.random() * categories.length);
    setPrizeNumber(newPrizeNumber);
  };

  useEffect(() => {
    if (!spinning) {
      const selectedCategory = categories[prizeNumber].option;
      onCategorySelected(selectedCategory);

      if (categories[prizeNumber].option.includes("👑")) {
        playAlarm();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  }, [spinning, prizeNumber, onCategorySelected]);

  const handleStopSpinning = () => {
    setMustSpin(false);
    setSpinning(false);
  };

  return (
    <>
      <div align="center" style={{ marginTop: '20px' }}>
        <Wheel
          mustStartSpinning={mustSpin} 
          prizeNumber={prizeNumber}
          data={categories}
          outerBorderColor="#dedede"
          outerBorderWidth={4}
          innerBorderColor="#f2f2f2"
          radiusLineColor="#dedede"
          radiusLineWidth={4}
          textColors={["#ffffff"]}
          fontSize={25}
          perpendicularText={false}
          backgroundColors={categories.map(category => category.style.backgroundColor)}
          renderText={(index) => (
            <div style={{ textAlign: "center" }}>
              {categories[index].icon}
              <div>{categories[index].option}</div> 
            </div>
          )}
          onStopSpinning={handleStopSpinning}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleSpinClick}
          disabled={mustSpin}
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
                backgroundColor: categories[prizeNumber].style.backgroundColor,
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

      {showConfetti && <Confetti />}
    </>
  );
};

export default WheelComponent;
