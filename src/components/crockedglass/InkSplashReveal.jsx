"use client";

/*
  <InkSplashReveal>: wrap the "Hi, Cnvrted!" window in it.

  When the section scrolls into view, ink in Cnvrted's blue, pink and orange splashes out from behind the window and
  fills the section, then the window zooms out to its resting size. Trigger rule and props follow React Bits'
  AnimatedContent (threshold, delay, once). No dependencies beyond React.

    import InkSplashReveal from './InkSplashReveal';

    <InkSplashReveal threshold={0.3}>
      <DashboardWindow />      // your existing app window, unchanged
    </InkSplashReveal>

  The fluid is adapted from "The fluid menu" by Animorio (https://animorio.com), under its licence for your own site.
*/
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { createInkSplash } from './inkSplash';
import './InkSplashReveal.css';

const InkSplashReveal = forwardRef(function InkSplashReveal(
  {
    children,
    className = '',
    style,
    as: Tag = 'section',

    /* when it plays (same meaning as AnimatedContent) */
    threshold = 0.3,
    delay = 0,
    once = true,

    /* the ink */
    splash = 1.5,
    close = 1.0,
    swirl = 14,
    jets = 8,
    stir = 0.7,
    orange = 0.26,
    pink = 0.36,
    grain = 3,
    dither = 0.8,
    grid = 112,             /* simulation cells across the short side (more = finer, smoother ink) */
    image,                  /* a photo URL: the ink reveals this picture instead of drawing in colour */
    colors,                 /* { blue, orange, pink, paper } as hex, overrides the CSS defaults */

    /* the window */
    zoomFrom = 1.1,
    zoomDuration = 1.2,
    zoomAt = 0.4,

    onSplash,
    onReveal,
    ...rest
  },
  ref,
) {
  const rootRef = useRef(null);
  const engine = useRef(null);
  const latest = useRef({});
  latest.current = { onSplash, onReveal };

  useImperativeHandle(ref, () => ({
    play: () => engine.current?.play(),
    reverse: () => engine.current?.reverse(),
    replay: () => engine.current?.replay(),
    reset: () => engine.current?.reset(),
    get element() { return rootRef.current; },
  }), []);

  useEffect(() => {
    engine.current = createInkSplash(rootRef.current, {
      threshold, delay, once, splash, close, swirl, jets, stir, orange, pink, grain, dither, zoomAt, grid, image,
      onSplash: () => latest.current.onSplash?.(),
      onReveal: () => latest.current.onReveal?.(),
    });
    return () => {
      engine.current?.destroy();
      engine.current = null;
    };
    /* the engine is rebuilt only when a setting that shapes the simulation changes */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, delay, once, splash, close, swirl, jets, stir, orange, pink, grain, dither, zoomAt, grid, image]);

  const vars = {
    '--ink-zoom-from': zoomFrom,
    '--ink-zoom-duration': `${zoomDuration}s`,
    ...(colors?.blue && { '--ink-blue': colors.blue }),
    ...(colors?.orange && { '--ink-orange': colors.orange }),
    ...(colors?.pink && { '--ink-pink': colors.pink }),
    ...(colors?.paper && { '--ink-paper': colors.paper }),
    ...style,
  };

  return (
    <Tag ref={rootRef} className={`ink-reveal ${className}`.trim()} style={vars} {...rest}>
      <canvas className="ink-reveal__ink" aria-hidden="true" data-ink="" />
      <div className="ink-reveal__still" aria-hidden="true" />
      <div className="ink-reveal__window" data-window="">
        {children}
      </div>
    </Tag>
  );
});

export default InkSplashReveal;
