const ValentinePage = () => {
  const [showMessage, setShowMessage] = React.useState(false);
  
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-rose-600 overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0">
        <Particles
          particleColors={['#FFB6C1', '#FF69B4', '#FF1493']}
          particleCount={150}
          particleSpread={15}
          speed={0.05}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
        />
      </div>

      {/* Click Spark Effect Layer */}
      <div className="absolute inset-0">
        <ClickSpark
          sparkColor="#FFF"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={12}
          duration={600}
          extraScale={1.2}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 text-center animate-bounce">
          Annie Escobar
        </h1>
        
        {/* Pixel Transition Card */}
        <div className="w-full max-w-md mx-auto">
          <PixelTransition
            firstContent={
              <div className="w-full h-full bg-gradient-to-r from-pink-400 to-red-400 flex items-center justify-center p-8 rounded-lg">
                <p className="text-3xl font-bold text-white text-center">
                  Click me to reveal a special message! 💝
                </p>
              </div>
            }
            secondContent={
              <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center justify-center p-8 rounded-lg">
                <p className="text-3xl font-bold text-white text-center mb-4">
                  Will you be my Valentine? 
                </p>
                <p className="text-xl text-white text-center">
                  Your smile lights up my world brighter than all these sparkles! ✨
                </p>
              </div>
            }
            gridSize={15}
            pixelColor="#FF69B4"
            animationStepDuration={0.5}
            aspectRatio="75%"
          />
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s linear infinite`,
                animationDelay: `${-Math.random() * 5}s`
              }}
            >
              <span className="text-2xl">❤️</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

window.ValentinePage = ValentinePage;
