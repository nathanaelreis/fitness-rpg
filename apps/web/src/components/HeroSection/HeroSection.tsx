import { Character, CharacterRace } from "@fitness-rpg/shared";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  character: Character;
}

const RACE_LABELS: Record<string, string> = {
  [CharacterRace.HUMAN]: "Humano",
  [CharacterRace.ELF]: "Elfo",
  [CharacterRace.DWARF]: "Anão"
};

export function HeroSection({ character }: HeroSectionProps) {
  const raceLabel = character.race ? RACE_LABELS[character.race] : "Herói";
  const genderLabel = character.gender === "female" ? "Feminino" : "Masculino";

  return (
    <section className={styles.container}>
      <div className={styles.avatarGlow}>
        <div className={styles.avatarPlaceholder}>
          <span className={styles.avatarEmoji}>
            {character.race === CharacterRace.DWARF ? "?????" : 
             character.race === CharacterRace.ELF ? "?????" : "???"}
          </span>
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.name}>{character.name}</h1>
        <p className={styles.levelClass}>
          Lv. {character.level} • {raceLabel} ({genderLabel})
        </p>
        <div className={styles.eloBadge}>
          ?? Arena Elo: <span>{character.elo}</span>
        </div>
      </div>
    </section>
  );
}
