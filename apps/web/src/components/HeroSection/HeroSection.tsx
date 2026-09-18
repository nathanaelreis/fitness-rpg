import { Character } from "@fitness-rpg/shared";
import { DynamicAvatar } from "../DynamicAvatar/DynamicAvatar";
import styles from "./HeroSection.module.css";

interface Props { character: Character; }

export function HeroSection({ character }: Props) {
  const raceLabel = character.race === 'human' ? 'Humano' : character.race === 'elf' ? 'Elfo' : 'Anão';
  const classLabel = character.class === 'WARRIOR' ? 'Guerreiro' : character.class === 'MAGE' ? 'Mago' : 'Arqueiro';

  return (
    <section className={styles.heroCard}>
      <div className={styles.avatarRing}>
        <DynamicAvatar appearance={character.appearance} mode="face" />
      </div>
      <div className={styles.info}>
        <h1 className={styles.name}>{character.name}</h1>
        <div className={styles.classInfo}>Lv. {character.level} • {raceLabel} {classLabel}</div>
        <div className={styles.eloBadge}>
          ⚔️ ARENA ELO: {character.elo}
        </div>
      </div>
    </section>
  );
}
