export const getRegistrationSuccessEmailHtml = ({
  name,
  dateTime,
  location,
}: {
  name: string;
  dateTime: string;
  location: string;
}) => /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Account created</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table width="560" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:560px;width:100%;background:#ffffff;border-radius:8px;
                 overflow:hidden;border:1px solid #e0e0e0;">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a2e;padding:28px 32px;text-align:center;">
              <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:1px;">
                🛍️ Project Ecommerce
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px;">

              <!-- Icon -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td align="center">
                    <div style="width:56px;height:56px;background:#e3f2fd;border-radius:50%;
                                text-align:center;line-height:56px;font-size:26px;
                                display:inline-block;">🎉</div>
                  </td>
                </tr>
              </table>

              <h1 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111111;text-align:center;">
                Account created!
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#555555;line-height:1.6;text-align:center;">
                Hi ${name}, your Project Ecommerce account has been successfully created. Welcome!
              </p>

              <!-- Account Details -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#f7f7f7;border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 10px;font-size:12px;color:#888888;
                               text-transform:uppercase;letter-spacing:0.5px;">
                      Account details
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                      <tr>
                        <td style="color:#888888;padding:4px 0;width:40%;">📅 Date &amp; time</td>
                        <td style="color:#111111;font-weight:600;text-align:right;padding:4px 0;">
                          ${dateTime}
                        </td>
                      </tr>
                      <tr>
                        <td style="color:#888888;padding:4px 0;">📍 Location</td>
                        <td style="color:#111111;font-weight:600;text-align:right;padding:4px 0;">
                          ${location}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Security note -->
              <p style="margin:0;font-size:13px;color:#888888;line-height:1.6;text-align:center;">
                If you did not create this account, please contact our support team immediately.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f7f7;padding:20px 32px;text-align:center;
                       border-top:1px solid #e0e0e0;">
              <p style="margin:0 0 4px;font-size:12px;color:#aaaaaa;">
                © ${new Date().getFullYear()} Project Ecommerce. All rights reserved.
              </p>
              <p style="margin:0;font-size:12px;color:#aaaaaa;">
                123 Main Street, Your City, Country
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

export const getLoginSuccessEmailHtml = ({
  name,
  dateTime,
  location,
}: {
  name: string;
  dateTime: string;
  location: string;
}) => /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Successful sign-in</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table width="560" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:560px;width:100%;background:#ffffff;border-radius:8px;
                 overflow:hidden;border:1px solid #e0e0e0;">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a2e;padding:28px 32px;text-align:center;">
              <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:1px;">
                🛍️ Project Ecommerce
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px;">

              <!-- Icon -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td align="center">
                    <div style="width:56px;height:56px;background:#e8f5e9;border-radius:50%;
                                text-align:center;line-height:56px;font-size:26px;
                                display:inline-block;">✅</div>
                  </td>
                </tr>
              </table>

              <h1 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111111;text-align:center;">
                You're signed in!
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#555555;line-height:1.6;text-align:center;">
                Hi ${name}, you successfully signed in to your Project Ecommerce account.
              </p>

              <!-- Session Details -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#f7f7f7;border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 10px;font-size:12px;color:#888888;
                               text-transform:uppercase;letter-spacing:0.5px;">
                      Session details
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                      <tr>
                        <td style="color:#888888;padding:4px 0;width:40%;">📅 Date &amp; time</td>
                        <td style="color:#111111;font-weight:600;text-align:right;padding:4px 0;">
                          ${dateTime}
                        </td>
                      </tr>
                      <tr>
                        <td style="color:#888888;padding:4px 0;">📍 Location</td>
                        <td style="color:#111111;font-weight:600;text-align:right;padding:4px 0;">
                          ${location}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Security note -->
              <p style="margin:0;font-size:13px;color:#888888;line-height:1.6;text-align:center;">
                If this wasn't you, please contact our support team immediately.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f7f7;padding:20px 32px;text-align:center;
                       border-top:1px solid #e0e0e0;">
              <p style="margin:0 0 4px;font-size:12px;color:#aaaaaa;">
                © ${new Date().getFullYear()} Project Ecommerce. All rights reserved.
              </p>
              <p style="margin:0;font-size:12px;color:#aaaaaa;">
                123 Main Street, Your City, Country
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;
