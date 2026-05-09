import { AnimatedBeam, cn, CustomHeading } from "@shared/ui";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { WORKFLOW_STEPS } from "../model/constants";
import { WorkflowStep } from "../model/types";
import { StepCard } from "./step-card";

/** Время полёта луча через один сегмент (сек) */
const SEGMENT_DURATION = 2.5;
/** Пауза ПОСЛЕ загорания карточки ПЕРЕД вылетом луча (мс) */
const PAUSE_BEFORE_BEAM = 1000;
/** Пауза перед рестартом цикла (мс) */
const RESET_PAUSE = 2000;
/** Начальная задержка (мс) */
const INITIAL_PAUSE = 800;

const SEGMENT_COUNT = WORKFLOW_STEPS.length - 1;
const INITIAL_SEGMENTS = new Array<boolean>(SEGMENT_COUNT).fill(false);

interface WorkflowProps {
  title: ReactNode;
  subtitle: ReactNode;
  steps: WorkflowStep[];
}

export function Workflow({ title, subtitle, steps }: WorkflowProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const step5Ref = useRef<HTMLDivElement>(null);
  const stepRefs = useMemo(
    () => [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref],
    [],
  );

  const [activeStep, setActiveStep] = useState(-1);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [flyingSegments, setFlyingSegments] = useState(INITIAL_SEGMENTS);
  const [cycle, setCycle] = useState(0);

  const sleep = useCallback(
    (ms: number) => new Promise<void>((r) => setTimeout(r, ms)),
    [],
  );

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        // ── Reset ──
        setActiveStep(-1);
        setCompletedIds(new Set());
        setFlyingSegments(INITIAL_SEGMENTS);
        setCycle((c) => c + 1);

        await sleep(INITIAL_PAUSE);
        if (cancelled) return;

        // ── 1. Зажигаем первую карточку ──
        setActiveStep(0);
        setCompletedIds(new Set([WORKFLOW_STEPS[0].id]));

        // ── 2. Цикл: пауза → луч → зажигание следующей ──
        for (let i = 0; i < SEGMENT_COUNT; i++) {
          if (cancelled) return;

          // A. Пауза после загорания карточки
          await sleep(PAUSE_BEFORE_BEAM);
          if (cancelled) return;

          // B. Луч вылетает
          setFlyingSegments((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });

          // C. Ждём пока луч долетит
          await sleep(500);
          if (cancelled) return;

          // D. Луч прибыл → зажигаем следующую карточку
          setActiveStep(i + 1);
          setCompletedIds((prev) =>
            new Set(prev).add(WORKFLOW_STEPS[i + 1].id),
          );
        }

        // Финальная пауза
        await sleep(RESET_PAUSE);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [sleep, stepRefs]);

  return (
    <section className="container relative w-full py-12 grid gap-4 lg:gap-10">
      <CustomHeading title={title} subtitle={subtitle} />

      <div ref={containerRef} className="relative grid justify-center">
        <div className="relative z-10 flex flex-col justify-center gap-6 lg:flex-row lg:items-stretch lg:justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-row items-center w-full gap-4 lg:flex-col lg:items-center lg:justify-start lg:w-1/5 lg:gap-5"
            >
              <StepCard
                ref={stepRefs[index]}
                id={step.id}
                icon={step.icon}
                isCompleted={completedIds.has(step.id)}
                isConnected={activeStep === index}
              />
              <div className="flex-1 text-left lg:flex-none lg:text-center lg:px-0 lg:mt-0">
                <h3
                  className={cn(
                    "text-sm font-bold mb-1 transition-colors duration-500",
                    activeStep === index || completedIds.has(step.id)
                      ? "text-[#1AB5C5]"
                      : "text-slate-800",
                  )}
                >
                  {t(step.title)}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-tight">
                  {t(step.description)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Фоновые линии (всегда видны) */}
        {WORKFLOW_STEPS.slice(0, -1).map((_, i) => (
          <AnimatedBeam
            key={`track-${i}`}
            containerRef={containerRef}
            fromRef={stepRefs[i]}
            toRef={stepRefs[i + 1]}
            pathColor="#E2EAF0"
            pathOpacity={0.5}
            pathWidth={2}
            curvature={0}
            gradientStartColor="transparent"
            gradientStopColor="transparent"
            duration={0}
          />
        ))}

        {/* Активные лучи AnimatedBeam */}
        {WORKFLOW_STEPS.slice(0, -1).map((_, i) =>
          flyingSegments[i] ? (
            <AnimatedBeam
              key={`beam-${cycle}-${i}`}
              containerRef={containerRef}
              fromRef={stepRefs[i]}
              toRef={stepRefs[i + 1]}
              duration={SEGMENT_DURATION}
              gradientStartColor="#0badc2"
              gradientStopColor="#0badc2"
              pathColor="rgba(11,173,194,0.5)"
              pathWidth={2}
              curvature={0}
              repeat={0}
            />
          ) : null,
        )}
      </div>
    </section>
  );
}
