"use client";
export function MorphingBlob({
  width = 200,
  height = 200,
  variant = "soft",
  className = "",
}) {
  const variants = {
    soft: {
      paths: [
        "M100,20 C140,20 170,50 170,100 C170,140 140,170 100,170 C60,170 30,140 30,100 C30,50 60,20 100,20",
        "M100,10 C150,20 180,40 180,100 C180,150 150,185 100,190 C50,185 20,150 20,100 C20,40 50,20 100,10",
      ],
      gradient: {
        id: "softGradient",
        colors: ["#fcd5ce", "#fac3b9"],
      },
      duration: 4,
    },
    organic: {
      paths: [
        "M80,30 C120,10 160,40 170,90 C175,140 145,180 90,185 C40,180 10,140 20,80 C25,40 50,25 80,30",
        "M70,40 C110,20 170,30 180,100 C185,160 140,190 80,190 C30,185 5,145 15,70 C20,35 45,30 70,40",
      ],
      gradient: {
        id: "organicGradient",
        colors: ["#c7d2fe", "#a5b4fc"],
      },
      duration: 5,
    },
    geometric: {
      paths: [
        "M100,30 C140,30 160,60 160,100 C160,140 140,170 100,170 C60,170 40,140 40,100 C40,60 60,30 100,30",
        "M100,25 C145,25 170,50 170,100 C170,150 145,175 100,175 C55,175 30,150 30,100 C30,50 55,25 100,25",
      ],
      gradient: {
        id: "geometricGradient",
        colors: ["#d1fae5", "#a7f3d0"],
      },
      duration: 6,
    },
    fluid: {
      paths: [
        "M100,15 C150,15 180,35 185,95 C188,155 155,185 100,185 C45,185 12,155 15,95 C20,35 50,15 100,15",
        "M100,20 C145,20 175,40 180,100 C182,160 150,180 100,180 C50,180 18,160 20,100 C25,40 55,20 100,20",
      ],
      gradient: {
        id: "fluidGradient",
        colors: ["#fed7aa", "#fdba74"],
      },
      duration: 4.5,
    },
    bubble: {
      paths: [
        "M100,25 C135,25 165,55 165,100 C165,145 135,175 100,175 C65,175 35,145 35,100 C35,55 65,25 100,25",
        "M100,30 C138,30 170,50 170,100 C170,150 138,170 100,170 C62,170 30,150 30,100 C30,50 62,30 100,30",
      ],
      gradient: {
        id: "bubbleGradient",
        colors: ["#e0e7ff", "#c7d2fe"],
      },
      duration: 3.5,
    },
    liquid: {
      paths: [
        "M85,35 C125,20 175,50 180,110 C182,160 140,185 95,180 C45,175 15,140 18,85 C22,35 55,35 85,35",
        "M90,30 C130,15 180,45 185,105 C188,165 145,190 90,185 C40,180 10,145 15,80 C20,30 60,30 90,30",
      ],
      gradient: {
        id: "liquidGradient",
        colors: ["#f0fdfa", "#ccfbf1"],
      },
      duration: 5.5,
    },
  };

  const config = variants[variant];
  const gradientId = config.gradient.id;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      className={`drop-shadow-lg ${className}`}
    >
      <defs>
        <style>{`
          @keyframes morph-${variant} {
            0%, 100% {
              d: path('${config.paths[0]}');
            }
            50% {
              d: path('${config.paths[1]}');
            }
          }
          
          .morphing-blob-${variant} {
            fill: url(#${gradientId});
            animation: morph-${variant} ${config.duration}s ease-in-out infinite;
          }
        `}</style>

        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.gradient.colors[0]} />
          <stop offset="100%" stopColor={config.gradient.colors[1]} />
        </linearGradient>
      </defs>

      <path className={`morphing-blob-${variant}`} d={config.paths[0]} />
    </svg>
  );
}
