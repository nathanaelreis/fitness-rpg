import { Character, CharacterClass } from "@fitness-rpg/shared";
import styles from "./HeroSection.module.css";

interface Props { character: Character; }

const CLASS_EMOJI: Record<CharacterClass, string> = {
  [CharacterClass.WARRIOR]: "??",
  [CharacterClass.MAGE]:    "??",
  [CharacterClass.ARCHER]:  "??",
};

const CLASS_LABEL: Record<CharacterClass, string> = {
  [CharacterClass.WARRIOR]: "Guerreiro",
  [CharacterClass.MAGE]:    "Mago",
  [CharacterClass.ARCHER]:  "Arqueiro",
};

export function HeroSection({ character }: Props) {
  return (
    <section className={styles.section} aria-label="Perfil do personagem">
      <div className={styles.avatar}>
        <div className={styles.avatarRing} data-class={character.class}>
          {CLASS_EMOJI[character.class]}
        </div>
        <span className={styles.levelBadge} aria-label={`Nível ${character.level}`}>
          Lv{character.level}
        </span>
      </div>

      <div className={styles.info}>
        <h1 className={styles.name}>{character.name}</h1>
        <div className={styles.meta}>
          <span className={styles.classBadge}>{CLASS_LABEL[character.class]}</span>
        </div>
      </div>

      <div className={styles.eloSection} aria-label={`Rating Arena: ${character.elo}`}>
        <span className={styles.eloLabel}>Arena</span>
        <span className={styles.eloValue}>{character.elo.toLocaleString("pt-BR")}</span>
      </div>
    </section>
  );
}
