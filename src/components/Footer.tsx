import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-border bg-background">
      <section id="contact" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-muted-foreground mb-8">
              Have an inquiry? Contact us below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:contact@ablcdstudios.dev"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    contact@ablcdstudios.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                {/* <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"> */}
                 {/* <Phone className="w-6 h-6 text-primary" /> */}
                {/* </div> */}
                <div>
                  {/* <h3 className="font-semibold mb-1">Phone</h3> */}
                  {/* <a
                    href="tel:+1234567890"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +1 (234) 567-890
                  </a> */}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Available Worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <Input
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-background/50 resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Links Below */}
        <div className="mt-16 pt-8 border-t border-border">
          <nav className="flex flex-wrap justify-center gap-6 mb-6">
            <Link
              to="/#services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.services")}
            </Link>
            <Link
              to="/#work-process"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.process")}
            </Link>
            <Link
              to="/#faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.faq")}
            </Link>
            <Link
              to="/legal-mention"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.legal")}
            </Link>
            <Link
              to="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/terms-of-service"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </nav>
          
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} ABLCD Studios. {t("footer.rights")}
          </p>
          </div>
      </section>
    </footer>
  );
};

export default Footer;
