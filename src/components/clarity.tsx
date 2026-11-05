import { getNonce } from "@/lib/nonce";

/**
 * Microsoft Clarity (session recordings + heatmaps). Same project as the app at
 * beta.cnvrted.com, so a visitor can be followed from here into signup. The ID
 * is public; production uses it by default and the env var can override.
 * Only real cnvrted.com hosts record, so preview deploys don't.
 *
 * The nonce lets this inline loader run; 'strict-dynamic' then trusts the
 * Clarity script it appends. Collection hosts are allowed in Proxy's CSP.
 */
const PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ||
  (process.env.VERCEL_ENV === "production" ? "z8scgms740" : "");

export async function Clarity() {
  if (!PROJECT_ID) return null;
  const loader = `if(/(^|\\.)cnvrted\\.com$/.test(location.hostname)){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",${JSON.stringify(PROJECT_ID)})}`;
  return <script nonce={await getNonce()} dangerouslySetInnerHTML={{ __html: loader }} />;
}
