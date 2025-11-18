import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n/LanguageProvider";
import { Link } from "react-router-dom";
import { useEffect } from "react";

type AIKey = "initial" | "afterProjectType" | "afterTimeline" | "afterBudget" | "thanks";

interface Message {
  id: string;
  type: "user" | "ai";
  // For user messages we use `content`; for AI messages we prefer `aiKey` to support live translation
  content?: string;
  aiKey?: AIKey;
  timestamp: Date;
}

const AIConsultationSection = () => {
  const { t } = useI18n();

  const getAIText = (key: AIKey) => {
    switch (key) {
      case "initial":
        return t('ai.initialMessage');
      case "afterProjectType":
        return t('ai.prompts.afterProjectType');
      case "afterTimeline":
        return t('ai.prompts.afterTimeline');
      case "afterBudget":
        return t('ai.prompts.afterBudget');
      case "thanks":
        return t('ai.prompts.thanks');
      default:
        return t('ai.prompts.askMore');
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      aiKey: "initial",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "", company: "" });
  const [consultationData, setConsultationData] = useState({
    project_type: "",
    budget: "",
    timeline: "",
    description: "",
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [depositPaid, setDepositPaid] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    useEffect(() => {
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17738011487',
        });
      }
    }, []);

    setMessages((prev) => [...prev, userMessage]);

    // Capture structured answers based on current message count
    const currentMessageCount = messages.length;
    if (currentMessageCount === 1) {
      setConsultationData((prev) => ({ ...prev, project_type: inputMessage }));
    } else if (currentMessageCount === 3) {
      setConsultationData((prev) => ({ ...prev, timeline: inputMessage }));
    } else if (currentMessageCount === 5) {
      setConsultationData((prev) => ({ ...prev, budget: inputMessage }));
    } else if (currentMessageCount === 7) {
      setConsultationData((prev) => ({ ...prev, description: inputMessage }));
    }

    // Simulate AI response
    setTimeout(() => {
      const key = generateAIResponse(inputMessage, currentMessageCount);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        aiKey: key ?? "afterProjectType",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);

      // Show contact form after the "Thanks! Please provide your contact information..." message
      // This will be when currentMessageCount === 7 (after the 8th message is added)
      if (currentMessageCount >= 7) {
        setShowContactForm(true);
      }
    }, 1000);

    setInputMessage("");
  };

  // Pick up deposit status if user completed payment on /payments
  // We use a simple localStorage flag for this session
  if (!depositPaid && typeof window !== 'undefined') {
    const paid = localStorage.getItem('consultationDepositPaid');
    if (paid === 'true') {
      setDepositPaid(true);
      localStorage.removeItem('consultationDepositPaid');
    }
  }

  const generateAIResponse = (userInput: string, messageCount: number): AIKey | null => {
    if (messageCount === 1) return "afterProjectType";
    if (messageCount === 3) return "afterTimeline";
    if (messageCount === 5) return "afterBudget";
    if (messageCount >= 7) return "thanks";
    return null;
  };

  const handleSubmitConsultation = async () => {
    if (!userInfo.name || !userInfo.email) {
      toast({
        title: t('ai.toast.missingInfoTitle'),
        description: t('ai.toast.missingInfoDesc'),
        variant: "destructive",
      });
      return;
    }

    try {
      // Prepare translated messages for persistence
      const messagesForPersist = messages.map((m) => ({
        ...m,
        content: m.aiKey ? getAIText(m.aiKey) : m.content,
        timestamp: m.timestamp.toISOString(),
      }));

      // Save to database
      const { error } = await supabase.from("consultations").insert([
        {
          name: userInfo.name,
          email: userInfo.email,
          company: userInfo.company,
          project_type: consultationData.project_type,
          budget: consultationData.budget,
          timeline: consultationData.timeline,
          description: consultationData.description,
          conversation_messages: messagesForPersist,
        },
      ]);

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-consultation-email", {
        body: {
          name: userInfo.name,
          email: userInfo.email,
          company: userInfo.company,
          ...consultationData,
          conversationMessages: messagesForPersist,
        },
      });

      toast({
        title: t('ai.toast.successTitle'),
        description: t('ai.toast.successDesc'),
      });

      // Reset state
      setUserInfo({ name: "", email: "", company: "" });
      setConsultationData({
        project_type: "",
        budget: "",
        timeline: "",
        description: "",
      });
      setMessages([
        {
          id: "1",
          type: "ai",
          aiKey: "initial",
          timestamp: new Date(),
        },
      ]);
      setShowContactForm(false);
    } catch (error) {
      console.error("Error submitting consultation:", error);
      toast({
        title: t('ai.toast.errorTitle'),
        description: t('ai.toast.errorDesc'),
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="ai-consultation"
      className="py-24 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {t('ai.sectionTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('ai.sectionSubtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                {t('ai.chatTitle')}
              </CardTitle>
              <CardDescription>
                {t('ai.chatDescription')}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto space-y-4 p-4 bg-background/30 rounded-lg border border-border/10">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""
                      }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                        }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-card text-card-foreground"
                        }`}
                    >
                      <p className="text-sm">{message.aiKey ? getAIText(message.aiKey) : message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder={t('ai.inputPlaceholder')}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    (e.preventDefault(), handleSendMessage())
                  }
                  className="min-h-[80px] bg-background/50"
                />
                <Button
                  onClick={handleSendMessage}
                  variant="hero"
                  size="lg"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Contact Form */}
              {showContactForm && (
                <div className="mt-8 p-6 bg-card/30 rounded-lg border border-border/20">
                  <h3 className="text-lg font-semibold mb-4">
                    {t('ai.contact.heading')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="name">{t('ai.contact.name')}</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) =>
                          setUserInfo((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t('ai.contact.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) =>
                          setUserInfo((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="company">{t('ai.contact.company')}</Label>
                    <Input
                      id="company"
                      value={userInfo.company}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      className="bg-background/50"
                    />
                  </div>

                  {/* Payment section */}
                  <div className="mb-6 p-4 rounded-md border border-border/30 bg-background/40">
                    <h4 className="font-semibold mb-2">{t('ai.payment.heading')}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{t('ai.payment.note')}</p>
                    {(() => {
                      const parsed = parseFloat((consultationData.budget || '').toString().replace(/[^0-9.]/g, '')) || 0;
                      const amount = Math.max(0, parsed * 0.2);
                      return (
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="text-sm">
                            <div className="text-muted-foreground">{t('ai.payment.amount')}</div>
                            <div className="text-lg font-medium">{amount.toFixed(2)}</div>
                          </div>
                          {depositPaid ? (
                            <div className="text-green-600 text-sm font-medium">{t('ai.payment.paid')}</div>
                          ) : (
                            <Button variant="hero" asChild>
                              <Link to={`/payments?amount=${amount.toFixed(2)}&reason=Consultation%20Deposit`}>
                                {t('ai.payment.payCta')}
                              </Link>
                            </Button>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  <Button
                    onClick={handleSubmitConsultation}
                    variant="hero"
                    className="w-full"
                    disabled={!depositPaid}
                    title={!depositPaid ? t('ai.payment.required') : undefined}
                  >
                    {t('ai.contact.submit')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIConsultationSection;