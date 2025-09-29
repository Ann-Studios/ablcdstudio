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

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const AIConsultationSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI development consultant. Tell me about your project idea - what do you want to build? I'll help gather all the details and connect you with our development team.",
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
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

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
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(inputMessage, currentMessageCount),
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

  const generateAIResponse = (userInput: string, messageCount: number): string => {
    if (messageCount === 1) {
      return "That sounds like an interesting project! What's your timeline for this project? And do you have any specific technology preferences?";
    }
    if (messageCount === 3) {
      return "Great! What's your budget range for this project?";
    }
    if (messageCount === 5) {
      return "Perfect! Can you describe the main goals or features you want in this project?";
    }
    if (messageCount >= 7) {
      return "Thanks! Please provide your contact information so our team can reach out with a proposal.";
    }

    return "Can you tell me more about your project?";
  };

  const handleSubmitConsultation = async () => {
    if (!userInfo.name || !userInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and email address.",
        variant: "destructive",
      });
      return;
    }

    try {
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
          conversation_messages: JSON.parse(JSON.stringify(messages)),
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
          conversationMessages: messages,
        },
      });

      toast({
        title: "Thank You!",
        description:
          "Your consultation has been submitted. We'll be in touch within 24 hours.",
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
          content:
            "Hello! I'm your AI development consultant. Tell me about your project idea - what do you want to build? I'll help gather all the details and connect you with our development team.",
          timestamp: new Date(),
        },
      ]);
      setShowContactForm(false);
    } catch (error) {
      console.error("Error submitting consultation:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
            AI Project Consultation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe your project to our AI assistant and get instant feedback
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Development Consultation Chat
              </CardTitle>
              <CardDescription>
                Tell us about your project requirements, timeline, and goals
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
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Describe your project idea..."
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
                    Let's Get You Connected
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
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
                      <Label htmlFor="email">Email *</Label>
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
                    <Label htmlFor="company">Company</Label>
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
                  <Button
                    onClick={handleSubmitConsultation}
                    variant="hero"
                    className="w-full"
                  >
                    Submit Consultation Request
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