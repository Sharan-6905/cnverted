// Decorative compositions reconstructed from the Figma layers.
// Content, navigation and controls are composed separately as responsive HTML.
import Image from "next/image";
import { assets } from "./assets";
import { SignalWires } from "./signal-wires";
import {
  FeatureModelCycle,
  FeatureRecipeCards,
  FeatureTriggerCycle,
} from "./feature-motion";

const signalPlaybackRate = 1.653125;
const brainSignalTiming = {
  speed: 80 * signalPlaybackRate,
  cycle: 3.8 / signalPlaybackRate,
  packetLength: 28,
};
const strategySignalTiming = {
  speed: 96 * signalPlaybackRate,
  cycle: 4.6 / signalPlaybackRate,
  packetLength: 36,
};
const brainArrival = 2.1 / signalPlaybackRate;
const strategyArrival = 2.6 / signalPlaybackRate;
const processingTime = 0.12 / signalPlaybackRate;

export function HomeLandscape() {
  return (
    <div
      className="absolute h-[807px] left-0 overflow-clip top-0 w-[1443px]"
      data-node-id="8:320"
    >
      <div
        className="absolute h-[1018px] left-[-51px] top-[59px] w-[1528px]"
        data-node-id="8:321"
        data-name="image 34"
      >
        <div
          className="absolute h-[991px] left-[21px] top-[-21px] w-[1487px]"
          data-node-id="8:322"
        >
          <div
            className="absolute h-[991px] left-0 top-[-60px] w-[1487px]"
            data-node-id="8:323"
            data-name="image 39"
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute bg-[#fff5e6] inset-0" />
              <Image
                loading="eager"
                alt=""
                className="absolute max-w-none object-cover size-full"
                src={assets.home.imgImage39}
                width={2975}
                height={1982}
                sizes="(max-width: 767px) 767px, 1440px"
              />
            </div>
            <div
              className="absolute inset-[33.2%_71.76%_59.03%_12.98%] opacity-[0.54]"
              data-node-id="8:325"
              data-name="Object"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  loading="eager"
                  alt=""
                  className="absolute h-[99.35%] left-[0.03%] max-w-none top-[0.42%] w-[99.55%]"
                  src={assets.home.imgObject}
                  width={192}
                  height={65}
                  sizes="(max-width: 767px) 96px, 96px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute h-[364px] left-[-758px] top-[690px] w-[2942px]"
        data-node-id="8:326"
      >
        <div className="absolute inset-[-20.91%_-2.59%]">
          <Image
            loading="eager"
            unoptimized
            alt=""
            className="block max-w-none size-full"
            src={assets.home.imgEllipse4058}
            width={3095}
            height={517}
          />
        </div>
      </div>
      <div
        className="absolute h-[338px] left-[-927px] top-[-70px] w-[3280px]"
        data-node-id="8:327"
      >
        <div className="absolute inset-[-22.51%_-2.32%]">
          <Image
            loading="eager"
            unoptimized
            alt=""
            className="block max-w-none size-full"
            src={assets.home.imgEllipse4059}
            width={3433}
            height={491}
          />
        </div>
      </div>
    </div>
  );
}

export function BlogLandscape() {
  return (
    <div
      className="absolute h-[641px] left-0 overflow-clip top-px w-[1440px]"
      data-node-id="8:1152"
      data-name="image 36"
    >
      <div
        className="absolute h-[991px] left-[-30px] top-[-23px] w-[1487px]"
        data-node-id="8:1153"
        data-name="image 39"
      />
      <div
        className="absolute h-[641px] left-0 top-0 w-[1440px]"
        data-node-id="8:1154"
        data-name="bg"
      >
        <div
          className="-translate-y-1/2 absolute aspect-[1688/932] left-[-9.93%] right-[-11.25%] top-[calc(50%-51px)]"
          data-node-id="8:1155"
          data-name="image 61"
        >
          <Image
            loading="eager"
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={assets.blogListing.imgImage61}
            width={3376}
            height={1864}
            sizes="(max-width: 767px) 767px, 1440px"
          />
        </div>
        <div
          className="absolute h-[364px] left-[-767px] top-[495px] w-[2942px]"
          data-node-id="8:1156"
        >
          <div className="absolute inset-[-20.91%_-2.59%]">
            <Image
              loading="eager"
              unoptimized
              alt=""
              className="block max-w-none size-full"
              src={assets.blogListing.imgEllipse4058}
              width={3095}
              height={517}
            />
          </div>
        </div>
        <div
          className="absolute h-[289px] left-[-225px] top-[-102px] w-[1794px]"
          data-node-id="8:1157"
        >
          <div className="absolute inset-[-26.33%_-4.24%]">
            <Image
              loading="eager"
              unoptimized
              alt=""
              className="block max-w-none size-full"
              src={assets.blogListing.imgEllipse4059}
              width={1947}
              height={442}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutLandscape() {
  return (
    <div
      className="absolute h-[641px] left-0 overflow-clip top-0 w-[1440px]"
      data-node-id="8:1235"
      data-name="image 56"
    >
      <div
        className="absolute h-[991px] left-[-30px] top-[-23px] w-[1487px]"
        data-node-id="8:1236"
        data-name="image 39"
      />
      <div
        className="absolute h-[641px] left-0 top-0 w-[1440px]"
        data-node-id="8:1237"
        data-name="bg"
      >
        <div
          className="-translate-y-1/2 absolute aspect-[1536/1024] left-[-2.5%] right-[-0.56%] top-[calc(50%+16.5px)]"
          data-node-id="8:1238"
          data-name="image 64"
        >
          <Image
            loading="eager"
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={assets.blogArticle.imgImage64}
            width={1536}
            height={1024}
            sizes="(max-width: 767px) 767px, 768px"
          />
        </div>
        <div
          className="absolute h-[414px] left-[-765px] top-[466px] w-[2942px]"
          data-node-id="8:1239"
        >
          <div className="absolute inset-[-18.38%_-2.59%]">
            <Image
              loading="eager"
              unoptimized
              alt=""
              className="block max-w-none size-full"
              src={assets.blogArticle.imgEllipse4058}
              width={3095}
              height={567}
            />
          </div>
        </div>
        <div
          className="absolute h-[289px] left-[-225px] top-[-102px] w-[1794px]"
          data-node-id="8:1240"
        >
          <div className="absolute inset-[-26.33%_-4.24%]">
            <Image
              loading="eager"
              unoptimized
              alt=""
              className="block max-w-none size-full"
              src={assets.blogArticle.imgEllipse4059}
              width={1947}
              height={442}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CareerLandscape() {
  return (
    <div
      className="absolute bg-white h-[641px] left-0 overflow-clip top-px w-[1440px]"
      data-node-id="8:1413"
      data-name="bg image"
    >
      <div
        className="absolute h-[991px] left-[-30px] top-[37px] w-[1487px]"
        data-node-id="8:1414"
      >
        <div
          className="absolute h-[991px] left-0 top-[-60px] w-[1487px]"
          data-node-id="8:1415"
          data-name="image 39"
        >
          <div
            className="-translate-y-1/2 absolute aspect-[1683/610] flex items-center justify-center left-[-9.55%] right-[-12.91%] top-[calc(50%-142.5px)]"
            data-node-id="8:1416"
            style={{ containerType: "size" }}
          >
            <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
              <div className="relative size-full" data-name="image 60">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <Image
                    loading="eager"
                    alt=""
                    className="absolute h-[152.46%] left-[-0.09%] max-w-none top-[-12.36%] w-[100.08%]"
                    src={assets.careers.imgImage60}
                    width={3376}
                    height={1864}
                    sizes="(max-width: 767px) 767px, 1440px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-[51.46%_3.16%_45.21%_90.32%] opacity-[0.54]"
            data-node-id="8:1417"
            data-name="Object"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Image
                loading="eager"
                alt=""
                className="absolute h-[99.35%] left-[0.03%] max-w-none top-[0.42%] w-[99.55%]"
                src={assets.careers.imgObject}
                width={192}
                height={65}
                sizes="(max-width: 767px) 96px, 96px"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute h-[364px] left-[-767px] top-[514px] w-[2942px]"
        data-node-id="8:1418"
      >
        <div className="absolute inset-[-20.91%_-2.59%]">
          <Image
            loading="eager"
            unoptimized
            alt=""
            className="block max-w-none size-full"
            src={assets.careers.imgEllipse4058}
            width={3095}
            height={517}
          />
        </div>
      </div>
      <div
        className="absolute h-[188px] left-[-242px] top-[36px] w-[1824px]"
        data-node-id="8:1419"
      >
        <div className="absolute inset-[-40.48%_-4.17%]">
          <Image
            loading="eager"
            unoptimized
            alt=""
            className="block max-w-none size-full"
            src={assets.careers.imgEllipse4059}
            width={1977}
            height={341}
          />
        </div>
      </div>
    </div>
  );
}

export function BrainArtwork() {
  return (
    <div
      className="relative flex h-[325px] w-[605.5px] items-center justify-center"
      data-node-id="8:533"
      style={{ containerType: "size" }}
    >
      <FeatureModelCycle step={brainSignalTiming.cycle} />
      <div className="flex-none h-[100cqw] rotate-[90deg] w-[100cqh]">
        <div className="overflow-clip relative size-full">
          <div
            className="absolute h-[310px] left-[21.5px] top-[67px] w-[152px]"
            data-node-id="8:537"
          >
            <div
              className="absolute flex h-[167px] items-center justify-center left-[113px] top-[-11px] w-[66px]"
              data-node-id="8:538"
            >
              <div className="rotate-[-90deg] flex-none">
                <div
                  className="bg-white border-[#e9e8e5] border-[0.4px] border-solid content-stretch flex flex-col h-[66px] items-center justify-between px-[3.2px] py-[6px] relative rounded-[4.8px] w-[167px]"
                  data-name="Container"
                >
                  <p
                    className="[word-break:break-word] font-design-sans font-normal leading-[normal] not-italic relative shrink-0 text-[#5f5f5f] text-[8.32px] w-[154.08px]"
                    data-node-id="8:539"
                    style={{
                      fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100',
                    }}
                  >
                    Look for a list of founders seeking a team to help launch
                    their product on Instagram or LinkedIn.
                  </p>
                  <div
                    className="content-stretch flex items-center justify-end relative shrink-0 w-full"
                    data-node-id="8:540"
                    data-name="Container"
                  >
                    <div
                      className="content-stretch flex gap-[4.8px] h-[12.8px] items-center justify-center px-[11.52px] py-[4.8px] relative rounded-[144px] shrink-0 w-[49.6px]"
                      data-node-id="8:541"
                    >
                      <div
                        aria-hidden
                        className="absolute bg-[#111] inset-0 pointer-events-none rounded-[144px]"
                      />
                      <div
                        className="relative shrink-0 size-[8px]"
                        data-node-id="8:542"
                        data-name="PaperPlaneTilt"
                      >
                        <Image
                          unoptimized
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={assets.home.imgPaperPlaneTilt}
                          width={8}
                          height={8}
                        />
                      </div>
                      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0.8px_1.6px_3.68px_0px_rgba(255,255,255,0.25)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute flex h-[110.5px] items-center justify-center left-[74px] top-[155.5px] w-[71.5px]"
              data-node-id="8:544"
            >
              <div className="rotate-[-90deg] flex-none">
                <div className="h-[71.5px] relative w-[110.5px]">
                  <div className="absolute inset-[-0.7%_0_-0.7%_-3.33%]">
                    <SignalWires
                      source={assets.home.imgVector202}
                      width={114.182}
                      height={72.5}
                      timing={brainSignalTiming}
                      routes={[
                        {
                          id: "brain-intake",
                          d: "M114.182 72H39.682C19.8 72 3.68198 55.882 3.68198 36V0.5",
                          arrivesAt: brainArrival,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute h-[50.5px] left-[44.5px] top-[183.5px] w-0"
              data-node-id="8:545"
            >
              <div className="absolute inset-[-0.99%_-3.68px_0_-3.68px]">
                <SignalWires
                  source={assets.home.imgVector203}
                  width={7.36396}
                  height={51}
                  timing={brainSignalTiming}
                  routes={[
                    {
                      id: "brain-results",
                      d: "M3.68198 51V0.5",
                      startsAt:
                        brainArrival +
                        brainSignalTiming.packetLength /
                          brainSignalTiming.speed +
                        processingTime,
                    },
                  ]}
                />
              </div>
            </div>
            <div
              className="absolute flex h-[206px] items-center justify-center left-[-10px] top-[-22px] w-[105px]"
              data-node-id="8:548"
            >
              <div className="rotate-[-90deg] flex-none">
                <div className="bg-white border-[#e9e8e5] border-[0.24px] border-solid content-stretch flex flex-col gap-[4px] h-[105px] items-center overflow-clip px-[1.92px] py-[2.88px] relative rounded-[2.88px] w-[206px]">
                  <div
                    className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-[202px]"
                    data-node-id="8:549"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[0.96px] items-start relative shrink-0 w-[12.72px]"
                      data-node-id="8:550"
                    >
                      <div
                        className="content-stretch flex h-[7.68px] items-center justify-between px-[0.96px] relative shrink-0 w-full"
                        data-node-id="8:551"
                        data-name="Tab"
                      >
                        <div
                          className="content-stretch flex flex-col items-center relative shrink-0"
                          data-node-id="8:552"
                          data-name="Text"
                        >
                          <p
                            className="[word-break:break-word] font-open-sans font-normal leading-[normal] relative shrink-0 text-[#63607a] text-[3.36px] text-center whitespace-nowrap"
                            data-node-id="8:553"
                            style={{ fontVariationSettings: '"wdth" 100' }}
                          >
                            No.
                          </p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full"
                        data-node-id="8:554"
                      >
                        <div
                          className="content-stretch flex h-[28.8px] items-center justify-center px-[0.96px] py-[2.88px] relative shrink-0 w-full"
                          data-node-id="8:555"
                          data-name="Tab"
                        >
                          <div
                            className="content-stretch flex flex-col items-center justify-center relative shrink-0"
                            data-node-id="8:556"
                            data-name="Text"
                          >
                            <p
                              className="[word-break:break-word] font-open-sans font-normal leading-[normal] relative shrink-0 text-[3.36px] text-black text-center whitespace-nowrap"
                              data-node-id="8:557"
                              style={{ fontVariationSettings: '"wdth" 100' }}
                            >
                              01
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full"
                        data-node-id="8:558"
                      >
                        <div
                          className="content-stretch flex h-[28.8px] items-center justify-center px-[0.96px] py-[2.88px] relative shrink-0 w-full"
                          data-node-id="8:559"
                          data-name="Tab"
                        >
                          <div
                            className="content-stretch flex flex-col items-center justify-center relative shrink-0"
                            data-node-id="8:560"
                            data-name="Text"
                          >
                            <p
                              className="[word-break:break-word] font-open-sans font-normal leading-[normal] relative shrink-0 text-[3.36px] text-black text-center whitespace-nowrap"
                              data-node-id="8:561"
                              style={{ fontVariationSettings: '"wdth" 100' }}
                            >
                              02
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col gap-[0.96px] items-start relative shrink-0 w-[50.88px]"
                      data-node-id="8:562"
                    >
                      <div
                        className="content-stretch flex h-[7.68px] items-center justify-between px-[0.96px] relative shrink-0 w-full"
                        data-node-id="8:563"
                        data-name="Tab"
                      >
                        <div
                          className="content-stretch flex flex-col items-center relative shrink-0"
                          data-node-id="8:564"
                          data-name="Text"
                        >
                          <p
                            className="[word-break:break-word] font-open-sans font-normal leading-[normal] relative shrink-0 text-[#63607a] text-[3.36px] text-center whitespace-nowrap"
                            data-node-id="8:565"
                            style={{ fontVariationSettings: '"wdth" 100' }}
                          >
                            Company
                          </p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="8:566"
                      >
                        <div
                          className="content-stretch flex h-[28.8px] items-center px-[0.96px] py-[2.88px] relative shrink-0 w-full"
                          data-node-id="8:567"
                          data-name="Tab"
                        >
                          <div
                            className="content-stretch flex gap-[1.92px] items-center relative shrink-0"
                            data-node-id="8:568"
                          >
                            <div
                              className="relative shrink-0 size-[14px]"
                              data-node-id="8:569"
                            >
                              <Image
                                alt=""
                                className="absolute block inset-0 max-w-none size-full"
                                src={assets.home.imgEllipse4061}
                                width={28}
                                height={28}
                                sizes="(max-width: 767px) 64px, 64px"
                              />
                            </div>
                            <div
                              className="content-stretch flex flex-col items-center relative shrink-0"
                              data-node-id="8:570"
                              data-name="Text"
                            >
                              <p
                                className="[word-break:break-word] font-open-sans font-normal leading-[normal] relative shrink-0 text-[3.36px] text-black text-center whitespace-nowrap"
                                data-node-id="8:571"
                                style={{ fontVariationSettings: '"wdth" 100' }}
                              >
                                Robby Montana
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="8:572"
                      >
                        <div
                          className="content-stretch flex h-[28.8px] items-center px-[0.96px] py-[2.88px] relative shrink-0 w-full"
                          data-node-id="8:573"
                          data-name="Tab"
                        >
                          <div
                            className="content-stretch flex gap-[1.92px] items-center relative shrink-0"
                            data-node-id="8:574"
                          >
                            <div
                              className="relative shrink-0 size-[14px]"
                              data-node-id="8:575"
                            >
                              <Image
                                alt=""
                                className="absolute block inset-0 max-w-none size-full"
                                src={assets.home.imgEllipse4062}
                                width={28}
                                height={28}
                                sizes="(max-width: 767px) 64px, 64px"
                              />
                            </div>
                            <div
                              className="content-stretch flex flex-col items-center relative shrink-0"
                              data-node-id="8:576"
                              data-name="Text"
                            >
                              <p
                                className="[word-break:break-word] font-open-sans font-normal leading-[normal] relative shrink-0 text-[3.36px] text-black text-center whitespace-nowrap"
                                data-node-id="8:577"
                                style={{ fontVariationSettings: '"wdth" 100' }}
                              >
                                Naomi Bale
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col gap-[0.96px] items-start relative shrink-0 w-[37.68px]"
                      data-node-id="8:578"
                    >
                      <div
                        className="content-stretch flex h-[7.68px] items-center justify-between overflow-clip px-[0.96px] relative shrink-0 w-full"
                        data-node-id="8:579"
                        data-name="Tab"
                      >
                        <div
                          className="content-stretch flex flex-col items-center relative shrink-0"
                          data-node-id="8:580"
                          data-name="Text"
                        >
                          <p
                            className="[word-break:break-word] font-open-sans font-normal leading-[normal] relative shrink-0 text-[#63607a] text-[3.36px] text-center whitespace-nowrap"
                            data-node-id="8:581"
                            style={{ fontVariationSettings: '"wdth" 100' }}
                          >
                            About
                          </p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col h-[29px] items-center justify-center overflow-clip relative shrink-0 w-full"
                        data-node-id="8:582"
                      >
                        <div
                          className="content-stretch flex flex-col h-[12.48px] items-start relative shrink-0 w-full"
                          data-node-id="8:583"
                        >
                          <div
                            className="content-stretch flex items-center relative shrink-0 w-[33px]"
                            data-node-id="8:584"
                          >
                            <div
                              className="bg-[#e1ebae] content-stretch flex items-center justify-center py-[4px] relative rounded-[360px] shrink-0 w-[33px]"
                              data-node-id="8:585"
                            >
                              <p
                                className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-open-sans font-normal leading-[normal] relative shrink-0 text-[#5f6e1a] text-[3.36px] text-center underline whitespace-nowrap"
                                data-node-id="8:586"
                                style={{ fontVariationSettings: '"wdth" 100' }}
                              >
                                Brand Launch
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col h-[29px] items-center justify-center overflow-clip relative shrink-0 w-full"
                        data-node-id="8:587"
                      >
                        <div
                          className="content-stretch flex flex-col h-[12.48px] items-start relative shrink-0 w-full"
                          data-node-id="8:588"
                        >
                          <div
                            className="content-stretch flex items-center relative shrink-0 w-[33px]"
                            data-node-id="8:589"
                          >
                            <div
                              className="bg-[#e1ebae] content-stretch flex items-center justify-center py-[4px] relative rounded-[360px] shrink-0 w-[33px]"
                              data-node-id="8:590"
                            >
                              <p
                                className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-open-sans font-normal leading-[normal] relative shrink-0 text-[#5f6e1a] text-[3.36px] text-center underline whitespace-nowrap"
                                data-node-id="8:591"
                                style={{ fontVariationSettings: '"wdth" 100' }}
                              >
                                Product Launch
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col gap-[0.96px] items-start relative shrink-0 w-[37.68px]"
                      data-node-id="8:592"
                    >
                      <div
                        className="content-stretch flex h-[7.68px] items-center justify-between overflow-clip px-[0.96px] relative shrink-0 w-full"
                        data-node-id="8:593"
                        data-name="Tab"
                      >
                        <div
                          className="content-stretch flex flex-col items-center relative shrink-0"
                          data-node-id="8:594"
                          data-name="Text"
                        >
                          <p
                            className="[word-break:break-word] font-open-sans font-normal leading-[normal] relative shrink-0 text-[#63607a] text-[3.36px] text-center whitespace-nowrap"
                            data-node-id="8:595"
                            style={{ fontVariationSettings: '"wdth" 100' }}
                          >
                            Social Media
                          </p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col h-[29px] items-start justify-center overflow-clip relative shrink-0 w-full"
                        data-node-id="8:596"
                      >
                        <div
                          className="content-stretch flex flex-col h-[12.48px] items-start relative shrink-0 w-full"
                          data-node-id="8:597"
                        >
                          <div
                            className="content-stretch flex items-center px-[0.96px] py-[2.88px] relative shrink-0 w-full"
                            data-node-id="8:598"
                            data-name="Tab"
                          >
                            <div
                              className="content-stretch flex items-center relative shrink-0"
                              data-node-id="8:599"
                            >
                              <div
                                className="content-stretch flex flex-col items-center relative shrink-0"
                                data-node-id="8:600"
                                data-name="Text"
                              >
                                <p
                                  className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-open-sans font-normal leading-[normal] relative shrink-0 text-[#2468ff] text-[3.36px] text-center underline whitespace-nowrap"
                                  data-node-id="8:601"
                                  style={{
                                    fontVariationSettings: '"wdth" 100',
                                  }}
                                >
                                  X, Linkedin, Instagram
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col h-[29px] items-start justify-center overflow-clip relative shrink-0 w-full"
                        data-node-id="8:602"
                      >
                        <div
                          className="content-stretch flex flex-col h-[12.48px] items-start relative shrink-0 w-full"
                          data-node-id="8:603"
                        >
                          <div
                            className="content-stretch flex items-center px-[0.96px] py-[2.88px] relative shrink-0 w-full"
                            data-node-id="8:604"
                            data-name="Tab"
                          >
                            <div
                              className="content-stretch flex items-center relative shrink-0"
                              data-node-id="8:605"
                            >
                              <div
                                className="content-stretch flex flex-col items-center relative shrink-0"
                                data-node-id="8:606"
                                data-name="Text"
                              >
                                <p
                                  className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-open-sans font-normal leading-[normal] relative shrink-0 text-[#2468ff] text-[3.36px] text-center underline whitespace-nowrap"
                                  data-node-id="8:607"
                                  style={{
                                    fontVariationSettings: '"wdth" 100',
                                  }}
                                >
                                  X, Linkedin, Instagram
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col gap-[0.96px] items-start relative shrink-0 w-[37.68px]"
                      data-node-id="8:608"
                    >
                      <div
                        className="content-stretch flex h-[7.68px] items-center justify-between overflow-clip px-[0.96px] relative shrink-0 w-full"
                        data-node-id="8:609"
                        data-name="Tab"
                      >
                        <div
                          className="content-stretch flex flex-col items-center relative shrink-0"
                          data-node-id="8:610"
                          data-name="Text"
                        >
                          <p
                            className="[word-break:break-word] font-open-sans font-normal leading-[normal] relative shrink-0 text-[#63607a] text-[3.36px] text-center whitespace-nowrap"
                            data-node-id="8:611"
                            style={{ fontVariationSettings: '"wdth" 100' }}
                          >
                            Website
                          </p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col h-[29px] items-start justify-center overflow-clip relative shrink-0 w-full"
                        data-node-id="8:612"
                      >
                        <div
                          className="content-stretch flex flex-col h-[12.48px] items-start relative shrink-0 w-full"
                          data-node-id="8:613"
                        >
                          <div
                            className="content-stretch flex items-center px-[0.96px] py-[2.88px] relative shrink-0 w-full"
                            data-node-id="8:614"
                            data-name="Tab"
                          >
                            <div
                              className="content-stretch flex items-center relative shrink-0"
                              data-node-id="8:615"
                            >
                              <div
                                className="content-stretch flex flex-col items-center relative shrink-0"
                                data-node-id="8:616"
                                data-name="Text"
                              >
                                <p
                                  className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-open-sans font-normal leading-[normal] relative shrink-0 text-[#2468ff] text-[3.36px] text-center underline whitespace-nowrap"
                                  data-node-id="8:617"
                                  style={{
                                    fontVariationSettings: '"wdth" 100',
                                  }}
                                >
                                  techwave.com
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col h-[29px] items-start justify-center overflow-clip relative shrink-0 w-full"
                        data-node-id="8:618"
                      >
                        <div
                          className="content-stretch flex flex-col h-[12.48px] items-start relative shrink-0 w-full"
                          data-node-id="8:619"
                        >
                          <div
                            className="content-stretch flex items-center px-[0.96px] py-[2.88px] relative shrink-0 w-full"
                            data-node-id="8:620"
                            data-name="Tab"
                          >
                            <div
                              className="content-stretch flex items-center relative shrink-0"
                              data-node-id="8:621"
                            >
                              <div
                                className="content-stretch flex flex-col items-center relative shrink-0"
                                data-node-id="8:622"
                                data-name="Text"
                              >
                                <p
                                  className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-open-sans font-normal leading-[normal] relative shrink-0 text-[#2468ff] text-[3.36px] text-center underline whitespace-nowrap"
                                  data-node-id="8:623"
                                  style={{
                                    fontVariationSettings: '"wdth" 100',
                                  }}
                                >
                                  livefoot.com
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-[#fafaf9] border-[#f5f5f4] border-[0.367px] border-solid content-stretch flex h-[17px] items-center justify-center overflow-clip px-[2.4px] relative rounded-[3.673px] shrink-0 w-[179px]"
                    data-node-id="8:624"
                    data-name="Container"
                  >
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0"
                      data-node-id="8:625"
                      data-name="Text"
                    >
                      <p
                        className="[word-break:break-word] font-design-sans font-normal leading-[1.2] not-italic relative shrink-0 text-[#57534e] text-[8.64px] whitespace-nowrap"
                        data-node-id="8:626"
                        style={{
                          fontVariationSettings:
                            '"GRAD" 0, "ROND" 0, "wdth" 100',
                        }}
                      >
                        50+ Founders Detected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecipeArtwork() {
  return <FeatureRecipeCards />;
}

export function WorkflowArtwork() {
  return (
    <div
      className="relative flex h-[325px] w-[1226px] items-center justify-center"
      data-node-id="8:664"
      style={{ containerType: "size" }}
    >
      <div className="flex-none h-[100cqw] rotate-[90deg] w-[100cqh]">
        <div className="overflow-clip relative size-full">
          <div
            className="absolute flex h-[207.6px] items-center justify-center left-[136.5px] top-[67.9px] w-[87.6px]"
            data-node-id="8:668"
          >
            <div className="rotate-[-90deg] flex-none">
              <div
                className="bg-[#eef2ff] border-[#c7d2fe] border-[0.612px] border-dashed content-stretch drop-shadow-[0px_3.061px_4.591px_rgba(12,10,9,0.16)] flex flex-col gap-[6.122px] h-[87.6px] items-start p-[12.243px] relative rounded-[18.365px] w-[207.6px]"
                data-name="Container"
              >
                <div
                  className="bg-white border-[#f5f5f4] border-[0.612px] border-solid content-stretch drop-shadow-[0px_1.53px_1.53px_rgba(12,10,9,0.04)] flex flex-col gap-[7px] h-[58.157px] items-start p-[9.183px] relative rounded-[12.243px] shrink-0 w-[177.53px]"
                  data-node-id="8:669"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex items-center justify-between relative shrink-0 w-[157.635px]"
                    data-node-id="8:670"
                    data-name="Container"
                  >
                    <div
                      className="bg-[#fafaf9] border-[#f5f5f4] border-[0.612px] border-solid content-stretch flex gap-[3.061px] h-[18.365px] items-center overflow-clip pl-[3.061px] pr-[6.122px] relative rounded-[6.122px] shrink-0"
                      data-node-id="8:671"
                      data-name="Container"
                    >
                      <div
                        className="relative shrink-0 size-[12.243px]"
                        data-node-id="8:672"
                        data-name="Text"
                      >
                        <div
                          className="absolute left-0 size-[12.243px] top-0"
                          data-node-id="8:673"
                          data-name="Icon"
                        >
                          <Image
                            unoptimized
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={assets.home.imgIcon}
                            width={13}
                            height={13}
                          />
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="8:682"
                        data-name="Text"
                      >
                        <p
                          className="[word-break:break-word] font-design-sans font-normal leading-[1.2] not-italic relative shrink-0 text-[#57534e] text-[14.4px] whitespace-nowrap"
                          data-node-id="8:683"
                          style={{
                            fontVariationSettings:
                              '"GRAD" 0, "ROND" 0, "wdth" 100',
                          }}
                        >
                          Cnvrted
                        </p>
                      </div>
                    </div>
                    <div
                      className="bg-[#fafaf9] border-[#f5f5f4] border-[0.612px] border-solid content-stretch flex h-[18.365px] items-center justify-center px-[3.061px] relative rounded-[6.122px] shrink-0"
                      data-node-id="8:684"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col items-center relative shrink-0 w-[12.243px]"
                        data-node-id="8:685"
                        data-name="Text"
                      >
                        <p
                          className="[word-break:break-word] font-['Geist_Mono:Regular'] font-normal leading-[12.243px] relative shrink-0 text-[#a8a29e] text-[9.183px] text-center whitespace-nowrap"
                          data-node-id="8:686"
                        >
                          2
                        </p>
                      </div>
                    </div>
                  </div>
                  <FeatureTriggerCycle step={strategySignalTiming.cycle} />
                </div>
                <div
                  className="absolute left-[101.39px] size-[9.183px] top-[82.19px]"
                  data-node-id="8:689"
                  data-name="Container"
                >
                  <div className="absolute inset-[-2687.7%_-4225.37%_-762.49%_-3127.46%]">
                    <SignalWires
                      source={assets.home.imgContainer}
                      width={684.364}
                      height={326}
                      timing={strategySignalTiming}
                      routes={[
                        {
                          id: "strategy-result",
                          d: "M292.182 256V289.5C292.182 309.382 276.064 325.5 256.182 325.5H39.682C19.8 325.5 3.68198 309.382 3.68198 289.5V266.5",
                          startsAt:
                            strategyArrival +
                            strategySignalTiming.packetLength /
                              strategySignalTiming.speed +
                            processingTime,
                          width: 6,
                        },
                        {
                          id: "strategy-top",
                          d: "M191.182 0.5L193.512 96.3746C193.987 115.91 209.957 131.5 229.501 131.5H240.682C258.631 131.5 273.182 146.051 273.182 164",
                          arrivesAt: strategyArrival,
                          width: 6,
                        },
                        {
                          id: "strategy-branch",
                          // Flow from the canvas edge into the AI card's top port.
                          d: "M462 90H323.182C303.3 90 287.182 106.118 287.182 126V164",
                          arrivesAt: strategyArrival,
                          width: 6,
                        },
                        {
                          id: "strategy-right",
                          d: "M462 207H392.182",
                          arrivesAt: strategyArrival,
                          width: 6,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute flex h-[296px] items-center justify-center left-[27.5px] top-[319.5px] w-[212px]"
            data-node-id="8:694"
          >
            <div className="rotate-[-90deg] flex-none">
              <div
                className="bg-white border-[#c7d2fe] border-[0.612px] border-dashed content-stretch drop-shadow-[0px_3.061px_4.591px_rgba(12,10,9,0.16)] flex flex-col h-[212px] items-start justify-between px-[16px] py-[21px] relative rounded-[18.365px] w-[296px]"
                data-name="Container"
              >
                <div
                  className="content-stretch flex flex-col h-[10.713px] items-start overflow-clip relative shrink-0 w-[157.635px]"
                  data-node-id="8:695"
                  data-name="Paragraph"
                >
                  <p
                    className="[word-break:break-word] font-design-sans font-medium leading-[12.243px] not-italic relative shrink-0 text-[#0c0a09] text-[12px] whitespace-nowrap"
                    data-node-id="8:696"
                    style={{
                      fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100',
                    }}
                  >
                    Your GTM strategy
                  </p>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0"
                  data-node-id="8:697"
                >
                  <p
                    className="[word-break:break-word] font-design-sans font-normal h-[71px] leading-[1.2] not-italic overflow-hidden relative shrink-0 text-[#0a0a0a] text-[12px] text-ellipsis w-[263px]"
                    data-node-id="8:698"
                    style={{
                      fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100',
                    }}
                  >
                    Identified your top 10 customers. Cnvrted analyzes their
                    shared traits—not just demographics, but also the indicators
                    that led them to make a purchase. This analysis will serve
                    as your blueprint for success.
                  </p>
                  <div
                    className="content-stretch flex gap-[6px] items-start relative shrink-0"
                    data-node-id="8:699"
                  >
                    <div
                      className="relative shrink-0 size-[24px]"
                      data-node-id="8:700"
                    >
                      <Image
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={assets.home.imgEllipse4069}
                        width={48}
                        height={48}
                        sizes="(max-width: 767px) 64px, 64px"
                      />
                    </div>
                    <div
                      className="relative shrink-0 size-[24px]"
                      data-node-id="8:701"
                    >
                      <Image
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={assets.home.imgEllipse4068}
                        width={48}
                        height={48}
                        sizes="(max-width: 767px) 64px, 64px"
                      />
                    </div>
                    <div
                      className="relative shrink-0 size-[24px]"
                      data-node-id="8:702"
                    >
                      <Image
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={assets.home.imgEllipse4070}
                        width={48}
                        height={48}
                        sizes="(max-width: 767px) 64px, 64px"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="bg-[#fafaf9] border-[#f5f5f4] border-[0.612px] border-solid content-stretch flex gap-[3.061px] h-[29px] items-center justify-center overflow-clip px-[4px] relative rounded-[6.122px] shrink-0 w-[255px]"
                  data-node-id="8:703"
                  data-name="Container"
                >
                  <div
                    className="relative shrink-0 size-[19.2px]"
                    data-node-id="8:704"
                    data-name="RowsPlusBottom"
                  >
                    <Image
                      unoptimized
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={assets.home.imgRowsPlusBottom}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0"
                    data-node-id="8:705"
                    data-name="Text"
                  >
                    <p
                      className="[word-break:break-word] font-design-sans font-normal leading-[1.2] not-italic relative shrink-0 text-[#57534e] text-[14.4px] whitespace-nowrap"
                      data-node-id="8:706"
                      style={{
                        fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100',
                      }}
                    >
                      Add New Node
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StrategyArtwork() {
  return (
    <div
      className="border border-[#d5d5d5] border-solid h-[679px] overflow-clip relative rounded-[12px] shrink-0 w-full"
      data-node-id="8:717"
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute h-[1240px] left-[calc(50%+12px)] top-[calc(50%-52.5px)] w-[2010px]"
        data-node-id="8:718"
        data-name="image 48"
      >
        <Image
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={assets.home.imgImage48}
          width={2452}
          height={1512}
          sizes="(max-width: 767px) 767px, 1226px"
        />
      </div>
      <div
        className="absolute content-stretch flex flex-col gap-[48px] items-center left-[247px] top-[146px] w-[680.833px]"
        data-node-id="8:719"
      >
        <div
          className="h-[311.148px] relative shrink-0 w-full"
          data-node-id="8:720"
        >
          <div
            className="absolute flex h-[247.896px] items-center justify-center left-0 top-[63.25px] w-[211.86px]"
            data-node-id="8:721"
          >
            <div className="flex-none rotate-[-14.63deg]">
              <div
                className="bg-white content-stretch drop-shadow-[0px_4.8px_12px_rgba(0,0,0,0.05)] flex flex-col gap-[9.6px] items-start px-[9.6px] py-[14.4px] relative rounded-[9.6px]"
                data-name="Container"
              >
                <div
                  className="border-[0.96px] border-[rgba(255,255,255,0.04)] border-solid content-stretch flex flex-col h-[96px] items-start overflow-clip relative rounded-[9.6px] shrink-0 w-[144px]"
                  data-node-id="8:722"
                  data-name="Container"
                >
                  <div
                    className="h-[93.6px] relative shrink-0 w-[141.6px]"
                    data-node-id="8:723"
                    data-name="Video"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <Image
                        alt=""
                        className="absolute h-[246.87%] left-[-126.02%] max-w-none top-[-141.19%] w-[244.78%]"
                        src={assets.home.imgVideo}
                        width={1536}
                        height={1024}
                        sizes="(max-width: 767px) 767px, 768px"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[2.4px] items-start relative shrink-0 w-full"
                  data-node-id="8:724"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-col h-[19.2px] items-start overflow-clip relative shrink-0 w-[144px]"
                    data-node-id="8:725"
                    data-name="Text"
                  >
                    <p
                      className="[word-break:break-word] font-inter font-[450] leading-[19.2px] not-italic relative shrink-0 text-[13.2px] text-black tracking-[0.066px] whitespace-nowrap"
                      data-node-id="8:726"
                    >
                      Early stage Startup
                    </p>
                  </div>
                  <div
                    className="content-stretch flex flex-col h-[57.6px] items-start overflow-clip relative shrink-0 w-[144px]"
                    data-node-id="8:727"
                    data-name="Text"
                  >
                    <p
                      className="[word-break:break-word] font-inter font-[450] leading-[19.2px] not-italic relative shrink-0 text-[13.2px] text-[rgba(58,58,58,0.64)] tracking-[0.066px] w-[144px]"
                      data-node-id="8:728"
                    >{` Want to 0-1 brand strategy?`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute flex h-[225.341px] items-center justify-center left-[266.73px] top-0 w-[178.901px]"
            data-node-id="8:729"
          >
            <div className="flex-none rotate-[4.34deg]">
              <div
                className="bg-white content-stretch drop-shadow-[0px_4.8px_12px_rgba(0,0,0,0.05)] flex flex-col gap-[9.6px] items-start px-[9.6px] py-[14.4px] relative rounded-[9.6px]"
                data-name="Container"
              >
                <div
                  className="border-[0.96px] border-[rgba(255,255,255,0.04)] border-solid content-stretch flex flex-col h-[96px] items-start overflow-clip relative rounded-[9.6px] shrink-0 w-[144px]"
                  data-node-id="8:730"
                  data-name="Container"
                >
                  <div
                    className="h-[93.6px] relative shrink-0 w-[141.6px]"
                    data-node-id="8:731"
                    data-name="Video"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <Image
                        alt=""
                        className="absolute h-[171.29%] left-[-0.06%] max-w-none top-[-30.4%] w-[169.84%]"
                        src={assets.home.imgVideo1}
                        width={1536}
                        height={1024}
                        sizes="(max-width: 767px) 767px, 768px"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[2.4px] items-start relative shrink-0 w-full"
                  data-node-id="8:732"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-col h-[19.2px] items-start overflow-clip relative shrink-0 w-[144px]"
                    data-node-id="8:733"
                    data-name="Text"
                  >
                    <p
                      className="[word-break:break-word] font-inter font-[450] leading-[19.2px] not-italic relative shrink-0 text-[13.2px] text-black tracking-[0.066px] whitespace-nowrap"
                      data-node-id="8:734"
                    >
                      Scale Social Media
                    </p>
                  </div>
                  <div
                    className="content-stretch flex flex-col h-[57.6px] items-start overflow-clip relative shrink-0 w-[144px]"
                    data-node-id="8:735"
                    data-name="Text"
                  >
                    <p
                      className="[word-break:break-word] font-inter font-[450] leading-[19.2px] not-italic relative shrink-0 text-[13.2px] text-[rgba(58,58,58,0.64)] tracking-[0.066px] w-[144px]"
                      data-node-id="8:736"
                    >
                      Increase media trends and blend your content accordingly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute flex h-[236.501px] items-center justify-center left-[486.23px] top-[68.95px] w-[194.606px]"
            data-node-id="8:737"
          >
            <div className="flex-none rotate-[9deg]">
              <div
                className="bg-white content-stretch drop-shadow-[0px_4.8px_12px_rgba(0,0,0,0.05)] flex flex-col gap-[9.6px] items-start px-[9.6px] py-[14.4px] relative rounded-[9.6px]"
                data-name="Container"
              >
                <div
                  className="border-[0.96px] border-[rgba(255,255,255,0.04)] border-solid content-stretch flex flex-col h-[96px] items-start relative rounded-[9.6px] shrink-0 w-[144px]"
                  data-node-id="8:738"
                  data-name="Container"
                >
                  <div
                    className="h-[93.6px] relative shrink-0 w-[141.6px]"
                    data-node-id="8:739"
                    data-name="Video"
                  >
                    <Image
                      alt=""
                      className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                      src={assets.home.imgVideo2}
                      width={1536}
                      height={1024}
                      sizes="(max-width: 767px) 767px, 768px"
                    />
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[2.4px] items-start relative shrink-0 w-full"
                  data-node-id="8:740"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-col h-[19.2px] items-start overflow-clip relative shrink-0 w-[144px]"
                    data-node-id="8:741"
                    data-name="Text"
                  >
                    <p
                      className="[word-break:break-word] font-inter font-[450] leading-[19.2px] not-italic overflow-hidden relative shrink-0 text-[13.2px] text-black text-ellipsis tracking-[0.066px] w-full whitespace-nowrap"
                      data-node-id="8:742"
                    >
                      New Product
                    </p>
                  </div>
                  <div
                    className="content-stretch flex flex-col h-[57.6px] items-start overflow-clip relative shrink-0 w-[144px]"
                    data-node-id="8:743"
                    data-name="Text"
                  >
                    <p
                      className="[word-break:break-word] font-inter font-[450] leading-[19.2px] not-italic relative shrink-0 text-[13.2px] text-[rgba(58,58,58,0.64)] tracking-[0.066px] w-[144px]"
                      data-node-id="8:744"
                    >
                      Launce and introduce new product to market
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p
          className="[word-break:break-word] font-open-sans font-normal leading-[25.35px] relative shrink-0 text-[#aeaeae] text-[15.6px] text-center w-full"
          data-node-id="8:745"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          Click on anyone of prompt to start with
        </p>
      </div>
    </div>
  );
}

export function IntegrationArtwork() {
  return (
    <div
      className="relative flex h-[607px] w-[410px] items-center justify-center"
      data-node-id="8:752"
    >
      <div className="flex-none rotate-[90deg]">
        <div className="content-stretch flex flex-col gap-[10px] items-start relative w-[607px]">
          <div
            className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full"
            data-node-id="8:753"
          >
            <div
              className="content-stretch flex gap-[33px] items-center relative shrink-0 w-full"
              data-node-id="8:754"
            >
              <div
                className="bg-[rgba(243,243,243,0.2)] overflow-clip relative rounded-[12px] shrink-0 size-[95px]"
                data-node-id="8:755"
              >
                <div
                  className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[60px] items-center justify-center left-1/2 top-1/2 w-[64px]"
                  data-node-id="8:756"
                >
                  <div className="rotate-[-90deg] flex-none">
                    <div
                      className="h-[64px] relative w-[60px]"
                      data-name="hubspot-icon 1"
                    >
                      <Image
                        unoptimized
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={assets.home.imgHubspotIcon1}
                        width={60}
                        height={64}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#fef9d9] relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:758"
              />
              <div
                className="flex items-center justify-center relative shrink-0 size-[95px]"
                data-node-id="8:759"
              >
                <div className="rotate-[-90deg] flex-none">
                  <div className="relative size-[95px]">
                    <div className="absolute inset-[-4.21%]">
                      <Image
                        unoptimized
                        alt=""
                        className="block max-w-none size-full"
                        src={assets.home.imgFrame1686561841}
                        width={103}
                        height={103}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#fef9d9] relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:761"
              />
              <div
                className="flex items-center justify-center relative shrink-0 size-[95px]"
                data-node-id="8:762"
              >
                <div className="rotate-[-90deg] flex-none">
                  <div className="bg-[rgba(243,243,243,0.2)] overflow-clip relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] size-[95px]">
                    <div
                      className="absolute bg-[rgba(243,243,243,0.2)] left-[16px] overflow-clip size-[63px] top-[16px]"
                      data-node-id="8:763"
                    >
                      <div
                        className="absolute left-[7px] size-[49px] top-[7px]"
                        data-node-id="8:764"
                        data-name="Slack_icon_2019 1"
                      >
                        <Image
                          unoptimized
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={assets.home.imgSlackIcon20191}
                          width={49}
                          height={49}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex gap-[33px] items-center relative shrink-0 w-full"
              data-node-id="8:769"
            >
              <div
                className="bg-[#fef9d9] relative rounded-[12px] shrink-0 size-[95px]"
                data-node-id="8:770"
              />
              <div
                className="bg-[rgba(243,243,243,0.2)] overflow-clip relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:771"
              >
                <div
                  className="absolute flex items-center justify-center left-[15.5px] size-[64px] top-[15.5px]"
                  data-node-id="8:772"
                >
                  <div className="rotate-[-90deg] flex-none">
                    <div
                      className="relative rounded-[360px] size-[64px]"
                      data-name="image 57"
                    >
                      <Image
                        alt=""
                        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[360px] size-full"
                        src={assets.home.imgImage57}
                        width={1200}
                        height={1200}
                        sizes="(max-width: 767px) 600px, 600px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#e1ebae] opacity-47 relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:773"
              />
              <div
                className="bg-[rgba(243,243,243,0.2)] overflow-clip relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:774"
              >
                <div
                  className="absolute flex items-center justify-center left-[22.5px] size-[50px] top-[22.5px]"
                  data-node-id="8:775"
                >
                  <div className="rotate-[-90deg] flex-none">
                    <div
                      className="relative size-[50px]"
                      data-name="cdnlogo.com_zapier-logo 1"
                    >
                      <Image
                        unoptimized
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={assets.home.imgCdnlogoComZapierLogo1}
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#fef9d9] relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:777"
              />
            </div>
          </div>
          <div
            className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full"
            data-node-id="8:778"
          >
            <div
              className="content-stretch flex gap-[33px] items-center relative shrink-0 w-full"
              data-node-id="8:779"
            >
              <div
                className="bg-[rgba(243,243,243,0.2)] overflow-clip relative rounded-[12px] shrink-0 size-[95px]"
                data-node-id="8:780"
              >
                <div
                  className="absolute flex items-center justify-center left-[16px] size-[63px] top-[16px]"
                  data-node-id="8:781"
                >
                  <div className="rotate-[-90deg] flex-none">
                    <div className="bg-[rgba(243,243,243,0.2)] overflow-clip relative size-[63px]">
                      <div
                        className="absolute left-[7px] size-[49px] top-[7px]"
                        data-node-id="8:782"
                        data-name="Slack_icon_2019 1"
                      >
                        <Image
                          unoptimized
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={assets.home.imgSlackIcon20191}
                          width={49}
                          height={49}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#e1ebae] opacity-47 relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:787"
              />
              <div
                className="flex items-center justify-center relative shrink-0 size-[95px]"
                data-node-id="8:788"
              >
                <div className="rotate-[-90deg] flex-none">
                  <div className="bg-[rgba(243,243,243,0.2)] overflow-clip relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] size-[95px]">
                    <div
                      className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[53px] top-[calc(50%+0.5px)]"
                      data-node-id="8:789"
                      data-name="copilot-icon 1"
                    >
                      <Image
                        unoptimized
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={assets.home.imgCopilotIcon1}
                        width={53}
                        height={53}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#e1ebae] opacity-47 relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:796"
              />
              <div
                className="flex items-center justify-center relative shrink-0 size-[95px]"
                data-node-id="8:797"
              >
                <div className="rotate-[-90deg] flex-none">
                  <div className="bg-[rgba(243,243,243,0.2)] overflow-clip relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] size-[95px]">
                    <div
                      className="absolute left-[9.5px] rounded-[586px] size-[75px] top-[10px]"
                      data-node-id="8:798"
                      data-name="image 58"
                    >
                      <Image
                        alt=""
                        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[586px] size-full"
                        src={assets.home.imgImage58}
                        width={400}
                        height={400}
                        sizes="(max-width: 767px) 200px, 200px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex gap-[33px] items-center relative shrink-0 w-full"
              data-node-id="8:799"
            >
              <div
                className="bg-[#fef9d9] relative rounded-[12px] shrink-0 size-[95px]"
                data-node-id="8:800"
              />
              <div
                className="bg-[rgba(243,243,243,0.2)] overflow-clip relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:801"
              >
                <div
                  className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[60px] items-center justify-center left-1/2 top-1/2 w-[50px]"
                  data-node-id="8:802"
                >
                  <div className="rotate-[-90deg] flex-none">
                    <div
                      className="h-[50px] relative w-[60px]"
                      data-name="image 56"
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <Image
                          alt=""
                          className="absolute h-full left-0 max-w-none top-0 w-[369.53%]"
                          src={assets.home.imgImage56}
                          width={884}
                          height={200}
                          sizes="(max-width: 767px) 442px, 442px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#e1ebae] opacity-47 relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:803"
              />
              <div
                className="bg-[rgba(243,243,243,0.2)] overflow-clip relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:804"
              >
                <div
                  className="absolute flex h-[80px] items-center justify-center left-[19.5px] top-[7.5px] w-[55px]"
                  data-node-id="8:805"
                >
                  <div className="rotate-[-90deg] flex-none">
                    <div
                      className="h-[55px] overflow-clip relative w-[80px]"
                      data-name="Salesforce.com_logo 1"
                    >
                      <div
                        className="absolute inset-[0.26%_0.34%_0.26%_0.02%]"
                        data-node-id="8:806"
                        data-name="Group"
                      >
                        <Image
                          unoptimized
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={assets.home.imgGroup}
                          width={80}
                          height={55}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#fef9d9] relative rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 size-[95px]"
                data-node-id="8:813"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MapArtwork() {
  return (
    <div
      className="h-[796px] overflow-clip relative shrink-0 w-[1440px]"
      data-node-id="8:1279"
    >
      <div
        className="absolute h-[641px] left-0 overflow-clip top-[78px] w-[1440px]"
        data-node-id="8:1280"
        data-name="image 35"
      >
        <div
          className="absolute h-[991px] left-[-30px] top-[-23px] w-[1487px]"
          data-node-id="8:1281"
          data-name="image 39"
        />
        <div
          className="absolute h-[641px] left-0 top-0 w-[1440px]"
          data-node-id="8:1282"
          data-name="bg"
        >
          <div
            className="-translate-y-1/2 absolute aspect-[1672/941] blur-[3.25px] left-[-2.29%] right-[-2.36%] top-[calc(50%+174.5px)]"
            data-node-id="8:1283"
            data-name="image 67"
          >
            <Image
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={assets.blogArticle.imgImage67}
              width={1672}
              height={941}
              sizes="(max-width: 767px) 767px, 836px"
            />
          </div>
          <div
            className="absolute h-[364px] left-[-767px] top-[495px] w-[2942px]"
            data-node-id="8:1284"
          >
            <div className="absolute inset-[-20.91%_-2.59%]">
              <Image
                unoptimized
                alt=""
                className="block max-w-none size-full"
                src={assets.blogArticle.imgEllipse4060}
                width={3095}
                height={517}
              />
            </div>
          </div>
          <div
            className="absolute h-[289px] left-[-225px] top-[-102px] w-[1794px]"
            data-node-id="8:1285"
          >
            <div className="absolute inset-[-26.33%_-4.24%]">
              <Image
                unoptimized
                alt=""
                className="block max-w-none size-full"
                src={assets.blogArticle.imgEllipse4061}
                width={1947}
                height={442}
              />
            </div>
          </div>
          <div
            className="absolute flex items-center justify-center left-[957px] size-[126.564px] top-[481px]"
            data-node-id="8:1286"
          >
            <div className="rotate-[-45deg] flex-none">
              <div className="h-[123.085px] relative w-[55.903px]">
                <Image
                  unoptimized
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={assets.blogArticle.imgEllipse4074}
                  width={56}
                  height={124}
                />
              </div>
            </div>
          </div>
          <div
            className="absolute contents left-[694px] top-[221px]"
            data-node-id="8:1287"
            data-name="Mask group"
          >
            <div
              className="-translate-y-1/2 absolute aspect-[1672/941] left-[-14.72%] mask-alpha mask-intersect mask-no-clip [mask-repeat:no-repeat] [mask-position:906px_240px] [mask-size:343px_343px] right-[-6.88%] top-[calc(50%+153px)]"
              data-node-id="8:1289"
              style={{ maskImage: `url("${assets.blogArticle.imgImage68}")` }}
              data-name="image 68"
            >
              <Image
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={assets.blogArticle.imgImage67}
                width={1672}
                height={941}
                sizes="(max-width: 767px) 767px, 836px"
              />
            </div>
            <div
              className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+145.5px)] mask-alpha mask-intersect mask-no-clip [mask-repeat:no-repeat] [mask-size:343px_343px] size-[343px] top-[calc(50%+72px)]"
              data-node-id="8:1290"
              style={{ maskImage: `url("${assets.blogArticle.imgImage68}")` }}
            >
              <Image
                unoptimized
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={assets.blogArticle.imgEllipse4072}
                width={343}
                height={343}
              />
            </div>
          </div>
          <div
            className="absolute left-[694px] size-[343px] top-[221px]"
            data-node-id="8:1291"
          >
            <div className="absolute inset-[-1.02%]">
              <Image
                unoptimized
                alt=""
                className="block max-w-none size-full"
                src={assets.blogArticle.imgEllipse4071}
                width={350}
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
