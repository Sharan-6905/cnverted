const LOGO_URL = "https://www.cnvrted.com/favicon.png";

export function emailShell(opts: { heading: string; bodyHtml: string }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
  </head>
  <body style="margin:0;padding:0;background:#F7F6F3;">
    <div style="background:#F7F6F3;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#FFFFFF;border-radius:16px;border:1px solid #E7E5DD;" bgcolor="#FFFFFF">
        <tr>
          <td style="padding:32px 32px 0;" bgcolor="#FFFFFF">
            <img src="${LOGO_URL}" alt="Cnvrted" width="56" height="56" style="display:block;width:56px;height:56px;border-radius:14px;" />
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px;" bgcolor="#FFFFFF">
            <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:#0A0A0A;">${opts.heading}</h1>
            ${opts.bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #E7E5DD;" bgcolor="#FFFFFF">
            <p style="margin:0;font-size:12px;color:#9A9A9A;">Cnvrted &middot; Real-time buying signals for outbound teams.</p>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`;
}
