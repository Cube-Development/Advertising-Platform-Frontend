import { useEffect, useId, useRef, useState, type RefObject } from "react";

import { useInViewport } from "@shared/lib/use-in-viewport";
import { cn } from "../lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>; // Container ref
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  repeat?: number;
  /** Не поддерживается после перехода на SMIL; оставлено для совместимости. */
  repeatDelay?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false, // Include the reverse prop
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  repeat = Infinity,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Луч анимируется бесконечно (repeat: Infinity) и пишет x1/x2/y1/y2 градиента
  // каждый кадр — четыре атрибута SVG на каждый экземпляр. Пока секция за
  // пределами экрана или вкладка свёрнута, это чистая трата: держим градиент в
  // статическом состоянии.
  const isActive = useInViewport(svgRef);

  // duration === 0 используется для статичных дорожек без свечения.
  const isAnimated = isActive && duration > 0;
  const animationKey = `${duration}-${delay}-${repeat}-${reverse}`;

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Call the updatePath initially to set the initial path
    updatePath();

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      ref={svgRef}
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        {/*
          Анимация градиента сделана нативным SMIL, а не motion.
          Раньше motion писал x1/x2/y1/y2 из JS каждый кадр — четыре атрибута
          SVG на каждый луч. На главной их полтора десятка, и в профиле это
          оказалось единственной оставшейся нагрузкой на простое (10% CPU,
          после удаления лучей — 0%). <animate> исполняет браузер: ни JS в
          кадре, ни записей в DOM, а значит и Sentry Replay их не пишет.
          Визуально то же самое: те же значения, та же длительность и та же
          кривая easeOutExpo через calcMode="spline".
        */}
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          x2="0%"
          y1="0%"
          y2="0%"
        >
          {isAnimated &&
            (["x1", "x2", "y1", "y2"] as const).map((axis) => (
              <animate
                // Пересоздаём при смене параметров: SMIL не подхватывает
                // изменения своих атрибутов на лету.
                key={`${axis}-${animationKey}`}
                attributeName={axis}
                values={gradientCoordinates[axis].join(";")}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount={repeat === Infinity ? "indefinite" : repeat + 1}
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.16 1 0.3 1"
              />
            ))}

          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
