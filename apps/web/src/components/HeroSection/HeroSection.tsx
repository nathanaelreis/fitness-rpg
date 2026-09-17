import { Character, CharacterRace, CharacterClass } from "@fitness-rpg/shared";
import styles from "./HeroSection.module.css";
import { DynamicAvatar } from "../DynamicAvatar/DynamicAvatar";

interface HeroSectionProps { character: Character; }

const RACE_LABELS: Record<string, string> = { [CharacterRace.HUMAN]: "Humano", [CharacterRace.ELF]: "Elfo", [CharacterRace.DWARF]: "Anão" };
const CLASS_LABELS: Record<string, string> = { [CharacterClass.WARRIOR]: "Guerreiro", [CharacterClass.MAGE]: "Mago", [CharacterClass.ARCHER]: "Arqueiro" };

export function HeroSection({ character }: HeroSectionProps) {
  const raceLabel = character.race ? RACE_LABELS[character.race] : "Raça";
  const classLabel = character.class ? CLASS_LABELS[character.class] : "Classe";

  return (
    <section className={styles.container}>
      <div className={styles.avatarGlow}>
        <DynamicAvatar appearance={character.appearance} mode="face" />
      </div>
      <div className={styles.info}>
        <h1 className={styles.name}>{character.name}</h1>
        {/* Genero removido a pedido. Mostrando Raça e Classe separadas! */}
        <p className={styles.levelClass}>Lv. {character.level} • {raceLabel} {classLabel}</p>
        <div className={styles.eloBadge}>
          ⚔️ Arena Elo: <span>{character.elo}</span>
        </div>
      </div>
    </section>
  );
}
