const ClickSpark = ({ sparkColor = "#FFF", sparkSize = 12, sparkRadius = 20, sparkCount = 12, duration = 600, extraScale = 1.2 }) => {
  const [sparks, setSparks] = React.useState([]);

  const createSpark = (x, y) => {
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (Math.PI * 2 * i) / sparkCount
    }));
    setSparks(prev => [...prev, ...newSparks]);
    setTimeout(() => {
      setSparks(prev => prev.filter(s => !newSparks.includes(s)));
    }, duration);
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    createSpark(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <div 
      className="absolute inset-0"
      onClick={handleClick}
      style={{ zIndex: 50 }}
    >
      {sparks.map(spark => (
        <div
          key={spark.id}
          className="absolute"
          style={{
            left: spark.x,
            top: spark.y,
            width: sparkSize,
            height: sparkSize,
            background: sparkColor,
            borderRadius: '50%',
            transform: `rotate(${spark.angle}rad) translateX(${sparkRadius}px) scale(${extraScale})`,
            transition: `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

window.ClickSpark = ClickSpark;
