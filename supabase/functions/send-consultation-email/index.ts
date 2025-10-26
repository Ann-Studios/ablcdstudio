import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConsultationEmailRequest {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  description?: string;
  conversationMessages: Array<{
    id: string;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      company,
      projectType,
      budget,
      timeline,
      description,
      conversationMessages
    }: ConsultationEmailRequest = await req.json();

    console.log("Processing consultation email for:", email);

    // Format conversation messages for email
    const conversationHtml = conversationMessages
      .map(msg => `
        <div style="margin: 10px 0; padding: 10px; background: ${msg.type === 'user' ? '#f0f0f0' : '#e7f3ff'}; border-radius: 5px;">
          <strong>${msg.type === 'user' ? '🧑 Client' : '🤖 AI'}:</strong>
          <p style="margin: 5px 0 0 0;">${msg.content}</p>
        </div>
      `).join('');

    // Send email using fetch to Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ABLCD Studio <consultations@ablcdstudios.dev>",
        to: ["kafui@ablcdstudios.dev"], // Replace with your actual email
        subject: `New Project Consultation from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
              New Project Consultation
            </h1>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #6b46c1; margin-top: 0;">Client Information</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
              ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
              ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
            </div>

            ${description ? `
            <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #6b46c1; margin-top: 0;">Project Description</h3>
              <p>${description}</p>
            </div>
            ` : ''}

            <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #6b46c1; margin-top: 0;">AI Conversation</h3>
              ${conversationHtml}
            </div>

            <div style="background: #fef7ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
              <p style="margin: 0; color: #6b46c1;"><strong>Next Steps:</strong> Reach out to ${name} at ${email} to discuss their project requirements.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error(`Email API error: ${emailResponse.status}`);
    }

    const emailResult = await emailResponse.json();

    console.log("Email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-consultation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);