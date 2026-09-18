import { CharacterAppearance, Item, CharacterRace } from "@fitness-rpg/shared";
import styles from "./DynamicAvatar.module.css";

interface DynamicAvatarProps {
  appearance: CharacterAppearance;
  equippedItems?: Item[];
  mode?: "face" | "full";
  race?: CharacterRace;
  gender?: "male" | "female";
  beardStyle?: string | null;
}

export function DynamicAvatar({
  appearance,
  mode = "full",
  race = CharacterRace.HUMAN,
  gender = "male",
}: DynamicAvatarProps) {
  const { eyeColor } = appearance;

  // Imagem base gerada para cada raça
  const baseImg = race === CharacterRace.ELF 
    ? "/assets/characters/elf_male_base.jpg" 
    : race === CharacterRace.DWARF 
      ? "/assets/characters/dwarf_male_base.jpg" 
      : "/assets/characters/human_male_base.jpg";

  return (
    <div className={`${styles.avatarContainer} ${styles[mode]}`} style={{ position: "relative", overflow: "hidden" }}>
      <img 
        src={baseImg} 
        alt={`${race} ${gender}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: mode === "face" ? "cover" : "contain",
          objectPosition: mode === "face" ? "center 20%" : "center center",
          borderRadius: "inherit",
          display: "block"
        }}
      />
      <div 
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(circle at center, ${eyeColor}15 0%, transparent 70%)`
        }} 
      />
    </div>
  );
}
