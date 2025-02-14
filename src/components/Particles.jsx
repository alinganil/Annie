const Particles = ({ 
  particleColors = ['#FFB6C1', '#FF69B4', '#FF1493'],
  particleCount = 150,
  particleSpread = 15,
  speed = 0.05,
  particleBaseSize = 80,
  moveParticlesOnHover = true,
  alphaParticles = true 
}) => {
  const [particles, setParticles] = React.useState([]);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * particleBaseSize + 20,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed
    }));
    setParticles(newParticles);
  }, [particleCount, particleColors, particleBaseSize, speed]);

  React.useEffect(() => {
    const moveParticles = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX) % 100,
        y: (p.y + p.speedY) % 100
      })));
    };

    const interval = setInterval(moveParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!moveParticlesOnHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div 
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
    >
      {particles.map(p => {
        const distance = moveParticlesOnHover
          ? Math.hypot(p.x - mouse.x, p.y - mouse.y) / particleSpread
          : 1;
        return (
          <div
            key={p.id}
            className="absolute rounded-full transition-transform duration-300"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size / distance,
              height: p.size / distance,
              background: p.color,
              opacity: alphaParticles ? 0.6 : 1,
              transform: `translate(-50%, -50%)`
            }}
          />
        );
      })}
    </div>
  );
};

window.Particles = Particles;
