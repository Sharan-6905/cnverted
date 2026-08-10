/* Brand logos. Recognizable marks are inlined as official-path SVGs (monochrome,
   currentColor); everything else renders as a clean wordmark. */
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

export function SlackMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z" />
    </svg>
  );
}

export function SalesforceMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M10.006 5.415a4.195 4.195 0 0 1 3.045-1.306c1.56 0 2.954.87 3.69 2.16.63-.285 1.32-.435 2.04-.435 2.79 0 5.052 2.28 5.052 5.1s-2.262 5.1-5.052 5.1c-.345 0-.69-.03-1.02-.105a3.69 3.69 0 0 1-3.225 1.89c-.51 0-.99-.12-1.425-.315a4.23 4.23 0 0 1-3.915 2.61 4.2 4.2 0 0 1-3.87-2.55 3.9 3.9 0 0 1-.81.087C1.98 17.146 0 15.166 0 12.706c0-1.65.885-3.09 2.205-3.87a4.5 4.5 0 0 1-.375-1.8A4.53 4.53 0 0 1 6.36 2.506c1.5 0 2.835.735 3.646 1.86" />
    </svg>
  );
}

export function HubSpotMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.984v-.066A2.198 2.198 0 0 0 17.233.836h-.066a2.198 2.198 0 0 0-2.198 2.198v.066c0 .87.507 1.623 1.24 1.978v2.858a5.728 5.728 0 0 0-2.472 1.228L6.42 4.923a2.36 2.36 0 0 0 .07-.56 2.37 2.37 0 1 0-2.37 2.37c.485 0 .932-.15 1.305-.404l6.44 5.016a5.767 5.767 0 0 0 .091 6.492l-1.959 1.96a1.874 1.874 0 0 0-.54-.088 1.888 1.888 0 1 0 1.887 1.887c0-.187-.03-.365-.087-.54l1.939-1.94a5.769 5.769 0 1 0 5.037-10.24 5.72 5.72 0 0 0-.11-.446zm-.943 8.646a2.96 2.96 0 1 1 0-5.92 2.96 2.96 0 0 1 0 5.92z" />
    </svg>
  );
}

export function NotionMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.328s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933z" />
    </svg>
  );
}

export function ZapierMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M15 12a3 3 0 0 1-.146.927l-3.927 3.927A3 3 0 0 1 9 12a3 3 0 0 1 .927-2.146l3.927-3.927A3 3 0 0 1 15 12zm8.854-.927l-6.927-.001 4.9-4.9a12.06 12.06 0 0 0-2-2l-4.9 4.9V.146a12.06 12.06 0 0 0-1.854-.146c-.63 0-1.248.05-1.854.146v6.927l-4.9-4.9a12.06 12.06 0 0 0-2 2l4.9 4.9H.146A12.06 12.06 0 0 0 0 12c0 .63.05 1.248.146 1.854h6.927l-4.9 4.9a12.06 12.06 0 0 0 2 2l4.9-4.9v6.926c.606.096 1.224.146 1.854.146.63 0 1.248-.05 1.854-.146V17.78l4.9 4.9a12.06 12.06 0 0 0 2-2l-4.9-4.9h6.927A12.06 12.06 0 0 0 24 12c0-.63-.05-1.248-.146-1.854z" />
    </svg>
  );
}

export function LinkedInMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function RedditMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

export function XMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** Styled wordmark fallback for brands without a simple monochrome glyph. */
export function Wordmark({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("font-display text-[15px] font-semibold tracking-tight", className)}>
      {name}
    </span>
  );
}

/* ── Full-color brand marks (no wrapper box) ── */

export function SlackColor({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z" />
      <path fill="#E01E5A" d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
      <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z" />
      <path fill="#36C5F0" d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
      <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z" />
      <path fill="#2EB67D" d="M17.685 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" />
      <path fill="#ECB22E" d="M15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z" />
      <path fill="#ECB22E" d="M15.163 17.685a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z" />
    </svg>
  );
}

export function SalesforceColor({ className }: IconProps) {
  return <SalesforceMark className={cn("text-[#00A1E0]", className)} />;
}
export function HubSpotColor({ className }: IconProps) {
  return <HubSpotMark className={cn("text-[#FF7A59]", className)} />;
}
export function NotionColor({ className }: IconProps) {
  return <NotionMark className={cn("text-ink", className)} />;
}
export function ZapierColor({ className }: IconProps) {
  return <ZapierMark className={cn("text-[#FF4F00]", className)} />;
}

/** Gmail app icon — the multi-color "M" envelope mark. */
export function GmailColor({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M3 8.5 8 12v8H4a1 1 0 0 1-1-1V8.5z" />
      <path fill="#34A853" d="M21 8.5 16 12v8h4a1 1 0 0 0 1-1V8.5z" />
      <path fill="#EA4335" d="M3 8.5 12 15l9-6.5V7a1 1 0 0 0-1-1h-1L12 12 5 6H4a1 1 0 0 0-1 1v1.5z" />
      <path fill="#C5221F" d="M3 7v1.5l5 3.6V8.2L5 6h-.6A1 1 0 0 0 3 7z" />
      <path fill="#FBBC04" d="M21 7v1.5l-5 3.6V8.2L19 6h.6A1 1 0 0 1 21 7z" />
    </svg>
  );
}

/** Google Calendar app icon — rounded square with the four brand colors and "31". */
export function GoogleCalendarColor({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#1967D2" d="M17 3h-2v4h2V3zM9 3H7v4h2V3z" />
      <path fill="#4285F4" d="M17 5H7a3 3 0 0 0-3 3v2h16V8a3 3 0 0 0-3-3z" />
      <path fill="#EA4335" d="M20 17.5 17.5 20H20v-2.5z" />
      <path fill="#34A853" d="M20 10h-3v4.5h3V10z" />
      <path fill="#FBBC04" d="M7 17.5V20h10.5l2.5-2.5H7z" />
      <path fill="#4285F4" d="M4 10v7a3 3 0 0 0 3 3v-4.5H4V10z" />
      <rect x="7" y="10" width="10" height="7.5" fill="#fff" />
      <text
        x="12"
        y="16.3"
        textAnchor="middle"
        fontSize="6.2"
        fontWeight="600"
        fill="#1967D2"
        fontFamily="Arial, sans-serif"
      >
        31
      </text>
    </svg>
  );
}

/** Colored wordmark in a brand's hue. */
export function ColorWordmark({
  name,
  color,
  className,
}: {
  name: string;
  color: string;
  className?: string;
}) {
  return (
    <span
      className={cn("font-sans text-[17px] font-semibold tracking-tight", className)}
      style={{ color }}
    >
      {name}
    </span>
  );
}
