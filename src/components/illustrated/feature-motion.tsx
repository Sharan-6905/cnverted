import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import {
  TrendingUp,
  UsersRound,
  Globe2,
  Rocket,
  Layers3,
  BriefcaseBusiness,
} from "lucide-react";
import { assets } from "./assets";
import "./feature-motion.css";

// Pre-rendered frames share ScaledArtwork's visibility and reduced-motion rules.
function FeatureCycle({
  children,
  step,
  phase = 0,
  className = "",
}: {
  children: ReactNode[];
  step: number;
  phase?: number;
  className?: string;
}) {
  return (
    <div
      className={`feature-cycle feature-cycle-${children.length} ${className}`}
    >
      {children.map((child, index) => (
        <div
          key={index}
          className="feature-cycle-frame feature-motion"
          style={
            {
              "--feature-cycle": `${step * children.length}s`,
              "--feature-delay": `${(index - children.length) * step - phase - 0.35}s`,
            } as CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}

const featureModels = [
  {
    name: "Claude",
    image: "/brands/claude-color.svg",
    tint: "#fae4d7",
    color: "#bc6548",
  },
  {
    name: "Kimi",
    image: "/brands/kimi-color.svg",
    tint: "#1c3353",
    color: "#f0f6ff",
    dark: true,
  },
  {
    name: "ChatGPT",
    image: "/brands/openai.svg",
    tint: "#ddf3e9",
    color: "#275e4d",
  },
  {
    name: "Gemini",
    image: "/brands/gemini-color.svg",
    tint: "#e6eaff",
    color: "#526abe",
  },
];

export function FeatureModelCycle({ step }: { step: number }) {
  return (
    <div className="feature-llm">
      <FeatureCycle step={step}>
        {featureModels.map((model) => (
          <div
            key={model.name}
            className="feature-llm-model"
            data-dark={model.dark || undefined}
            style={
              {
                "--model-tint": model.tint,
                "--model-color": model.color,
              } as CSSProperties
            }
          >
            <Image
              src={model.image}
              width={29}
              height={29}
              alt=""
              unoptimized
              loading="eager"
            />
            <span>{model.name}</span>
          </div>
        ))}
      </FeatureCycle>
    </div>
  );
}

const recipes = [
  [
    {
      title: "Startup fit",
      detail: "The traits behind your best customers.",
      image: assets.home.imgVideo,
      focus: "68% 70%",
    },
    {
      title: "Expansion fit",
      detail: "New markets. A familiar fit.",
      image: assets.home.imgVideo1,
      focus: "30% 60%",
    },
  ],
  [
    {
      title: "Hiring teams",
      detail: "Growing teams. New needs.",
      image: assets.home.imgVideo1,
      focus: "25% 60%",
    },
    {
      title: "Fresh funding",
      detail: "New capital. Clear intent.",
      image: assets.home.imgVideo2,
      focus: "55% 60%",
    },
  ],
  [
    {
      title: "Product launch",
      detail: "New offers. Rising demand.",
      image: assets.home.imgVideo2,
      focus: "50% 50%",
    },
    {
      title: "New leadership",
      detail: "New leaders. Fresh priorities.",
      image: assets.home.imgVideo,
      focus: "50% 55%",
    },
  ],
];

export function FeatureRecipeCards() {
  return (
    <div className="feature-recipe-scene" data-node-id="8:627">
      <div className="feature-recipe-aura" />
      {recipes.map((variants, index) => (
        <div
          key={index}
          className={`feature-recipe-slot feature-recipe-slot-${index}`}
        >
          <div
            className="feature-recipe-float feature-motion"
            style={{ "--float-delay": `${index * -1.4}s` } as CSSProperties}
          >
            <div className="feature-recipe-card">
              <FeatureCycle step={3.2} phase={index * 0.85}>
                {variants.map((recipe) => (
                  <div key={recipe.title} className="feature-recipe-content">
                    <div className="feature-recipe-image">
                      <Image
                        src={recipe.image}
                        width={192}
                        height={128}
                        sizes="120px"
                        loading="eager"
                        alt=""
                        style={{
                          objectPosition: recipe.focus,
                          transformOrigin: recipe.focus,
                        }}
                      />
                    </div>
                    <strong>{recipe.title}</strong>
                    <small>{recipe.detail}</small>
                  </div>
                ))}
              </FeatureCycle>
            </div>
          </div>
        </div>
      ))}
      <div className="feature-recipe-learning">
        <div
          className="feature-recipe-float feature-motion"
          style={{ "--float-delay": "-2.1s" } as CSSProperties}
        >
          <div className="feature-recipe-learning-card">
            <Image
              src={assets.home.imgInfinity}
              width={27}
              height={27}
              alt=""
              unoptimized
            />
            <div>
              <strong>Your ICP, evolving</strong>
              <small>Learning from every signal</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const featureTriggers = [
  { label: "Funding raised", Icon: TrendingUp, color: "#a37a28" },
  { label: "Hiring surge", Icon: UsersRound, color: "#8867b3" },
  { label: "Market expansion", Icon: Globe2, color: "#357da6" },
  { label: "Product launch", Icon: Rocket, color: "#ba6b4f" },
  { label: "New tools adopted", Icon: Layers3, color: "#708439" },
  { label: "Leadership change", Icon: BriefcaseBusiness, color: "#5b78b4" },
];

export function FeatureTriggerCycle({ step }: { step: number }) {
  return (
    <FeatureCycle step={step} className="feature-trigger-cycle">
      {featureTriggers.map(({ label, Icon, color }) => (
        <span
          key={label}
          className="feature-trigger"
          style={{ "--trigger-color": color } as CSSProperties}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </span>
      ))}
    </FeatureCycle>
  );
}
