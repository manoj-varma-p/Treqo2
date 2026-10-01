import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers-db";
import { getAlertSettingsFromDb, getGeneralSettingsFromDb } from "@/lib/content-db";
import { sendEmailViaResend } from "@/lib/email-service";

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body.source === "string" ? body.source.trim().slice(0, 100) : "blog_newsletter";

    // Validate Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Save subscriber into database / file store
    const { subscriber, isNew } = await addSubscriber(email, source);
    console.log(`[Newsletter] Subscriber recorded (${isNew ? "new" : "existing"}):`, subscriber.email);

    // Fetch alert & general settings for contact details & email keys
    const [alertConfig, generalSettings] = await Promise.all([
      getAlertSettingsFromDb().catch(() => null),
      getGeneralSettingsFromDb().catch(() => null),
    ]);

    const supportPhone = generalSettings?.supportPhone || alertConfig?.notifyPhones || "+91 93466 31131";
    const cleanPhoneDigits = supportPhone.replace(/\D/g, "") || "919346631131";
    const supportEmail = generalSettings?.supportEmail || alertConfig?.notifyEmails?.split(",")[0]?.trim() || "treqo.themarketingschool@gmail.com";
    const whatsappUrl = generalSettings?.whatsappUrl || `https://wa.me/${cleanPhoneDigits}?text=Hi%20Treqo%20Team%2C%20I%20just%20subscribed%20to%20your%20newsletter%20and%20would%20like%20to%20connect!`;

    // 1. Send Welcome & "Contact Us" Email to the Subscriber
    const subscriberSubject = "Welcome to Treqo Field Notes — Let's connect!";
    const subscriberHtml = `
      <div style="background-color: #FDFAF6; margin: 0; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1A0A1A;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(59, 13, 59, 0.08); border: 1px solid #F5EDE0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #3B0D3B 0%, #2A082A 100%); padding: 36px 32px; text-align: center;">
              <span style="display: inline-block; background: rgba(255,255,255,0.15); color: #FDFAF6; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 999px; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.2);">
                TREQO FIELD NOTES
              </span>
              <h1 style="color: #FDFAF6; font-size: 26px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.5px;">
                Welcome to Treqo!
              </h1>
              <p style="color: rgba(253, 250, 246, 0.85); font-size: 14px; margin: 0; line-height: 1.5;">
                Real campaign playbooks, zero generic fluff.
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <p style="font-size: 16px; line-height: 1.6; color: #1A0A1A; margin: 0 0 16px 0;">
                Hello,
              </p>
              <p style="font-size: 15px; line-height: 1.6; color: #4A3A4A; margin: 0 0 18px 0;">
                Thank you for subscribing to <strong>Treqo Field Notes</strong>! You've joined an ambitious group of marketers, founders, and career-switchers who receive our weekly teardowns on performance marketing, attribution models, and growth frameworks tested on live ad budgets.
              </p>

              <!-- Callout Box Asking Them To Contact Us -->
              <div style="background-color: #FAF5EE; border-left: 4px solid #3B0D3B; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <h2 style="font-size: 17px; font-weight: 700; color: #3B0D3B; margin: 0 0 8px 0;">
                  🤝 We'd love to connect with you directly!
                </h2>
                <p style="font-size: 14px; line-height: 1.6; color: #5A4A5A; margin: 0;">
                  Whether you're looking to transition into modern performance marketing, scale your brand's growth, or have questions about our upcoming cohort and admissions process — <strong>our mentors and admissions team are eager to chat with you</strong>.
                </p>
              </div>

              <p style="font-size: 14px; font-weight: 700; color: #1A0A1A; margin: 24px 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                Ways to get in touch with us:
              </p>

              <!-- Contact Options Grid -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <!-- Option 1: WhatsApp -->
                <tr>
                  <td style="padding: 10px 0;">
                    <a href="${whatsappUrl}" target="_blank" style="display: block; background: #25D366; color: #ffffff; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-weight: 700; font-size: 14px; text-align: center; box-shadow: 0 2px 8px rgba(37, 211, 102, 0.25);">
                      💬 Chat with Us on WhatsApp (${escapeHtml(supportPhone)})
                    </a>
                  </td>
                </tr>

                <!-- Option 2: Phone Call -->
                <tr>
                  <td style="padding: 6px 0;">
                    <a href="tel:${cleanPhoneDigits}" style="display: block; background: #3B0D3B; color: #ffffff; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-weight: 700; font-size: 14px; text-align: center;">
                      📞 Call Our Team: ${escapeHtml(supportPhone)}
                    </a>
                  </td>
                </tr>

                <!-- Option 3: Direct Reply -->
                <tr>
                  <td style="padding: 10px 0 0 0;">
                    <div style="border: 1px dashed #D0C0D0; border-radius: 12px; padding: 14px 18px; text-align: center; background: #FFFDFB;">
                      <p style="font-size: 13px; color: #5A4A5A; margin: 0 0 6px 0;">
                        Or simply hit <strong>Reply</strong> to this email directly:
                      </p>
                      <a href="mailto:${escapeHtml(supportEmail)}" style="color: #3B0D3B; font-weight: 700; font-size: 14px; text-decoration: none;">
                        ✉️ ${escapeHtml(supportEmail)}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Program Highlights -->
              <div style="border-top: 1px solid #F0E6D8; padding-top: 20px; margin-top: 24px;">
                <p style="font-size: 13px; line-height: 1.6; color: #6A5A6A; margin: 0 0 12px 0;">
                  <strong>Curious about our upcoming cohort?</strong> Explore our live program details and student projects at <a href="https://www.treqo.org" style="color: #3B0D3B; font-weight: 600; text-decoration: underline;">www.treqo.org</a>.
                </p>
                <p style="font-size: 14px; color: #1A0A1A; margin: 16px 0 0 0; line-height: 1.5;">
                  Best regards,<br>
                  <strong style="color: #3B0D3B;">The Treqo Mentorship & Admissions Team</strong><br>
                  <span style="font-size: 12px; color: #7A6A7A;">School of Modern Marketing</span>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAF5EE; border-top: 1px solid #F5EDE0; padding: 20px 32px; text-align: center;">
              <p style="font-size: 11px; color: #8A7A8A; margin: 0; line-height: 1.5;">
                You received this email because you subscribed to Treqo Field Notes at treqo.org/blog.<br>
                Treqo School of Modern Learning Pvt. Ltd. · Madhapur, Hyderabad, India.
              </p>
            </td>
          </tr>

        </table>
      </div>
    `;

    const subscriberText = `
Welcome to Treqo Field Notes!

Thank you for subscribing to Treqo Field Notes. You're now on our list to receive weekly teardowns on modern digital marketing, attribution models, and growth frameworks.

WE'D LOVE TO CONNECT WITH YOU DIRECTLY!
Whether you're looking to transition into digital marketing, scale your brand, or have questions about our upcoming cohort, our mentors and admissions team are eager to chat with you.

How to reach us right now:
- WhatsApp: ${whatsappUrl}
- Phone: ${supportPhone}
- Direct Email Reply: ${supportEmail}
- Website: https://www.treqo.org

Best regards,
The Treqo Mentorship & Admissions Team
    `.trim();

    // Fire email to subscriber via Resend
    let emailSent = false;
    let emailError: string | undefined = undefined;

    try {
      const resendRes = await sendEmailViaResend({
        to: [email],
        subject: subscriberSubject,
        html: subscriberHtml,
        text: subscriberText,
        apiKey: alertConfig?.resendApiKey || process.env.RESEND_API_KEY,
      });

      emailSent = resendRes.success;
      if (!resendRes.success) {
        emailError = resendRes.error;
        console.warn("[Newsletter Resend Notice]:", resendRes.error);
      } else {
        console.log("[Newsletter Resend Success]: Email sent to subscriber", email);
      }
    } catch (err: unknown) {
      emailError = err instanceof Error ? err.message : "Error sending email";
      console.error("[Newsletter Resend Exception]:", err);
    }

    // 2. Also notify the Treqo Admin Team
    if (alertConfig?.emailAlertsEnabled && alertConfig?.notifyEmails) {
      const teamEmails = alertConfig.notifyEmails
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

      if (teamEmails.length > 0) {
        const adminSubject = `📬 New Blog Newsletter Subscriber: ${email}`;
        const adminHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #EFEAE2; border-radius: 16px;">
            <div style="border-bottom: 2px solid #3B0D3B; padding-bottom: 12px; margin-bottom: 16px;">
              <h2 style="color: #3B0D3B; margin: 0; font-size: 20px;">📬 New Newsletter Subscriber</h2>
              <p style="color: #666; margin: 4px 0 0 0; font-size: 13px;">Subscribed from Blog Page (Field Notes)</p>
            </div>
            <div style="background: #FAF5EE; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #777; width: 120px;">Email:</td>
                  <td style="padding: 6px 0; color: #111; font-weight: bold;"><a href="mailto:${escapeHtml(email)}" style="color: #3B0D3B;">${escapeHtml(email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #777;">Source:</td>
                  <td style="padding: 6px 0; color: #111; font-weight: 600;">${escapeHtml(source)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #777;">Time:</td>
                  <td style="padding: 6px 0; color: #555;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #777;">Welcome Sent:</td>
                  <td style="padding: 6px 0; color: ${emailSent ? "#16a34a" : "#dc2626"}; font-weight: bold;">${emailSent ? "Yes (Delivered)" : "Pending / Check Resend"}</td>
                </tr>
              </table>
            </div>
            <div style="text-align: center; margin-top: 16px;">
              <a href="mailto:${escapeHtml(email)}?subject=Connecting%20from%20Treqo" style="display: inline-block; background: #3B0D3B; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 13px;">
                Email Subscriber Directly
              </a>
            </div>
          </div>
        `;

        sendEmailViaResend({
          to: teamEmails,
          subject: adminSubject,
          html: adminHtml,
          text: `New subscriber on Treqo Blog: ${email} at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
          apiKey: alertConfig.resendApiKey || process.env.RESEND_API_KEY,
        }).catch((err) => console.error("[Admin Alert Email Error]:", err));
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! Check your inbox for our welcome note and contact details.",
      emailSent,
      isNew,
    });
  } catch (error) {
    console.error("[API Newsletter Subscribe Error]:", error);
    return NextResponse.json(
      { error: "Something went wrong while subscribing. Please try again." },
      { status: 500 }
    );
  }
}
