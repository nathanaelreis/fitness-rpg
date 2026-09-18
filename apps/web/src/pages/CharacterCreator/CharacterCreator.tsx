import { useState } from "react";
import { CharacterRace, CharacterClass, CharacterAppearance } from "@fitness-rpg/shared";
import { DynamicAvatar } from "../../components/DynamicAvatar/DynamicAvatar";
import { ActionHub } from "../../components/ActionHub/ActionHub";
import { mockActions } from "../../mocks/gameData";
import styles from "./CharacterCreator.module.css";

const HAIR_COLORS  = ["#3b2f2f","#1a1a1a","#c8a84b","#8b3a2a","#e0e0e0","#2e5a1c","#6a2db8","#c4762a","#5a8a5a","#8a2b2b"];
const EYE_COLORS   = ["#5c4033","#2e8b57","#1e90ff","#8a2be2","#daa520"];
const SKIN_COLORS  = ["#f5d0b5","#f0b9a0","#e0ac8f","#c28e70","#8d5b40"];
const HAIR_STYLES  = ["👦","👱","🧑","👩","🧔","💁"];
const EYE_SHAPES   = [
  { id:"shape_1", label:"●" },
  { id:"shape_2", label:"👁" },
  { id:"shape_3", label:"—" },
  { id:"shape_4", label:"◡" },
  { id:"shape_5", label:"◆" },
];
const TATTOOS    = ["🐉","🌿","⚡","☽","💀"];
const SCARS      = ["〰","⚔","✕","｜","✶"];
const ACCESSORIES = ["💍","📿","🏅","🎖","💎","⭐"];

const CLASSES = [
  { id: CharacterClass.WARRIOR, label: "Guerreiro", icon: "⚔️" },
  { id: CharacterClass.MAGE,    label: "Mago",      icon: "🔮" },
  { id: "ARCHER" as CharacterClass, label: "Arqueiro", icon: "🏹" },
  { id: "THIEF"  as CharacterClass, label: "Ladrão",   icon: "🗡️" },
];
const RACES = [
  { id: CharacterRace.HUMAN, label: "Humano",  desc: "Forte e versátil", icon: "👤" },
  { id: CharacterRace.ELF,   label: "Elfo",    desc: "Ágil e astuto",    icon: "🧝" },
  { id: CharacterRace.DWARF, label: "Anão",    desc: "Corajoso e tough", icon: "🧙" },
];

export function CharacterCreator() {
  const [name, setName]     = useState("Herói");
  const [race, setRace]     = useState<CharacterRace>(CharacterRace.HUMAN);
  const [cls, setCls]       = useState<CharacterClass>(CharacterClass.WARRIOR);
  const [gender, setGender] = useState<"male"|"female">("male");
  const [tattoo, setTattoo]  = useState<string | null>(null);
  const [scar, setScar]      = useState<string | null>(null);
  const [accessory, setAcc]  = useState<string | null>(null);
  const [appearance, setApp] = useState<CharacterAppearance>({
    hairStyle: "style_1", hairColor: "#3b2f2f",
    eyeShape:  "shape_1", eyeColor:  "#5c4033",
    skinTone:  "#f5d0b5",
  });
  const upd = (k: keyof CharacterAppearance, v: string) => setApp(a => ({ ...a, [k]: v }));

  return (
    <div className={styles.page}>

      {/* CABEÇALHO */}
      <div className={styles.header}>
        <div className={styles.headerAvatar}>😶</div>
        <div className={styles.headerTitle}>Criação de Personagem</div>
        <a href="#/" className={styles.closeBtn}>✕</a>
      </div>

      {/* NOME */}
      <input
        type="text"
        className={styles.nameInput}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="NOME"
      />

      {/* CLASSE E RAÇA + PREVIEW */}
      <div className={styles.stoneBlock}>
        <div className={styles.twoCol}>
          {/* Esquerda: Classes + Raças */}
          <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
            <div className={styles.blockTitle}>CLASSE</div>
            <div className={styles.classGrid}>
              {CLASSES.map(c => (
                <div key={c.id} className={styles.classCard} data-active={cls === c.id} onClick={() => setCls(c.id)}>
                  <div className={styles.classIcon}>{c.icon}</div>
                  <div className={styles.classLabel}>{c.label}</div>
                </div>
              ))}
            </div>
            <div className={styles.blockTitle} style={{marginTop:"4px"}}>RAÇA</div>
            <div className={styles.raceGrid}>
              {RACES.map(r => (
                <div key={r.id} className={styles.raceCard} data-active={race === r.id} onClick={() => setRace(r.id)}>
                  <div className={styles.racePortrait}>{r.icon}</div>
                  <div className={styles.raceLabel}>{r.label}</div>
                  <div className={styles.raceDesc}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Direita: Preview */}
          <div className={styles.previewBox}>
            <div className={styles.crownBadge}>👑</div>
            <div className={styles.previewChar}>
              <DynamicAvatar appearance={appearance} mode="full" />
            </div>
            <div className={styles.restoreBtn}>Restaurar Padrão</div>
          </div>
        </div>
      </div>

      {/* APARÊNCIA + EXTRAS */}
      <div className={styles.appearanceGrid}>

        {/* Aparência Básica (Esquerda) */}
        <div className={styles.appearanceBasic}>
          <div className={styles.appearanceTitle}>Aparência Básica</div>

          {/* Gênero */}
          <div className={styles.swatchLabel}>Gênero</div>
          <div className={styles.genderRow}>
            <div className={styles.genderBtn} data-active={gender==="male"}   onClick={() => setGender("male")}>♂ Masc.</div>
            <div className={styles.genderBtn} data-active={gender==="female"} onClick={() => setGender("female")}>♀ Fem.</div>
          </div>

          {/* Cor do Cabelo */}
          <div className={styles.swatchSection}>
            <div className={styles.swatchLabel}>Cor do Cabelo</div>
            <div className={styles.swatchRow}>
              {HAIR_COLORS.map(c => (
                <div key={c} className={styles.swatch} data-active={appearance.hairColor===c} style={{ background: c }} onClick={() => upd("hairColor", c)} />
              ))}
            </div>
          </div>

          {/* Estilo do Cabelo */}
          <div className={styles.swatchSection}>
            <div className={styles.swatchLabel}>Estilo do Cabelo</div>
            <div className={styles.hairStyleRow}>
              {HAIR_STYLES.map((h, i) => {
                const styleId = `style_${i+1}`;
                return (
                  <div key={styleId} className={styles.hairStyleThumb} data-active={appearance.hairStyle===styleId} onClick={() => upd("hairStyle", styleId)}>
                    {h}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formato dos Olhos */}
          <div className={styles.swatchSection}>
            <div className={styles.swatchLabel}>Formato dos Olhos</div>
            <div className={styles.eyeShapeRow}>
              {EYE_SHAPES.map(s => (
                <div key={s.id} className={styles.eyeThumb} data-active={appearance.eyeShape===s.id} onClick={() => upd("eyeShape", s.id)}>
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Cor dos Olhos */}
          <div className={styles.swatchSection}>
            <div className={styles.swatchLabel}>Cor dos Olhos</div>
            <div className={styles.swatchRow}>
              {EYE_COLORS.map(c => (
                <div key={c} className={styles.swatch} data-active={appearance.eyeColor===c} style={{ background: c }} onClick={() => upd("eyeColor", c)} />
              ))}
            </div>
          </div>

          {/* Cor da Pele */}
          <div className={styles.swatchSection}>
            <div className={styles.swatchLabel}>Cor da Pele</div>
            <div className={styles.swatchRow}>
              {SKIN_COLORS.map(c => (
                <div key={c} className={styles.swatch} data-active={appearance.skinTone===c} style={{ background: c }} onClick={() => upd("skinTone", c)} />
              ))}
            </div>
          </div>
        </div>

        {/* Extras: Tatuagens / Cicatrizes / Acessórios (Direita) */}
        <div className={styles.extrasPanel}>
          <div className={styles.extraSection}>
            <div className={styles.extraLabel}>Tatuagens</div>
            <div className={styles.extraGrid}>
              {TATTOOS.map(t => (
                <div key={t} className={styles.extraSlot} data-active={tattoo===t} onClick={() => setTattoo(tattoo===t ? null : t)}>{t}</div>
              ))}
            </div>
          </div>
          <div className={styles.extraSection}>
            <div className={styles.extraLabel}>Cicatrizes</div>
            <div className={styles.extraGrid}>
              {SCARS.map(s => (
                <div key={s} className={styles.extraSlot} data-active={scar===s} onClick={() => setScar(scar===s ? null : s)}>{s}</div>
              ))}
            </div>
          </div>
          <div className={styles.extraSection}>
            <div className={styles.extraLabel}>Acessórios</div>
            <div className={styles.extraGrid}>
              {ACCESSORIES.map(a => (
                <div key={a} className={styles.extraSlot} data-active={accessory===a} onClick={() => setAcc(accessory===a ? null : a)}>{a}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTÃO CRIAR */}
      <button className={styles.createBtn} onClick={() => alert(`Personagem "${name}" criado!`)}>
        CRIAR PERSONAGEM
      </button>

      <ActionHub actions={mockActions} />
    </div>
  );
}
