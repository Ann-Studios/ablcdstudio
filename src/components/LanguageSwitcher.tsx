import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/i18n/LanguageProvider";
import type { Language } from "@/i18n/LanguageProvider";

const LanguageSwitcher = () => {
  const { lang, setLang } = useI18n();

  return (
    <Select value={lang} onValueChange={(v) => setLang(v as Language)}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
