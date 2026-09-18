import { useState, useEffect } from "react";
import { CharacterRace, CharacterClass, CharacterAppearance } from "@fitness-rpg/shared";
import { DynamicAvatar } from "../../components/DynamicAvatar/DynamicAvatar";
import { ActionHub } from "../../components/ActionHub/ActionHub";
import { mockActions } from "../../mocks/gameData";
import { 
  getSavedCharacters, 
  saveNewCharacter, 
  setActiveCharacter, 
  deleteCharacter, 
  MAX_CHARACTERS,
  SavedCharacter 
} from "../../services/characterStore";
import styles from "./CharacterCreator.module.css";

const HAIR_COLORS  = ["#3b2f2f","#1a1a1a","#c8a84b","#8b3a2a","#e0e0e0","#2e5a1c","#6a2db8","#c4762a","#5a8a5a","#8a2b2b"];
const EYE_COLORS   = ["#5c4033","#2e8b57","#1e90ff","#8a2be2","#daa520"];
const SKIN_COLORS  = ["#f5d0b5","#f0b9a0","#e0ac8f","#c28e70","#8d5b40"];
const HAIR_STYLES  = ["👦 Curto","👱 Ondulado","🧑 Espetado","👩 Longo","💁 Franja"];
const EYE_SHAPES   = [
  { id:"shape_1", label:"Redondo" },
  { id:"shape_2", label:"Amendoado" },
  { id:"shape_3", label:"Alongado" },
  { id:"shape_4", label:"Caído" },
  { id:"shape_5", label:"Intenso" },
];
const DWARF_BEARDS = ["Trança Dupla", "Barba Longa", "Barba Cheia", "Barba Curta", "Sem Barba"];
const TATTOOS    = ["🐉 Dragão","🌿 Élfico","⚡ Rúnico","☽ Lunar","💀 Tribal"];
const SCARS      = ["⚔ No Olho","✕ Cruzada","｜ Vertical","〰 Bochecha"];
const ACCESSORIES = ["💍 Brinco","📿 Colar","🏅 Broche","💎 Tiara"];

const CLASSES = [
  { id: CharacterClass.WARRIOR, label: "Guerreiro", icon: "⚔️" },
  { id: CharacterClass.MAGE,    label: "Mago",      icon: "🔮" },
  { id: "ARCHER" as CharacterClass, label: "Arqueiro", icon: "🏹" },
  { id: "THIEF"  as CharacterClass, label: "Ladrão",   icon: "🗡️" },
];
const RACES = [
  { id: CharacterRace.HUMAN, label: "Humano",  desc: "Equilibrado e versátil", icon: "👤" },
  { id: CharacterRace.ELF,   label: "Elfo",    desc: "Mais alto, esguio e ágil", icon: "🧝" },
  { id: CharacterRace.DWARF, label: "Anão",    desc: "Baixo, robusto e resistente", icon: "🧙" },
];

export function CharacterCreator() {
  const [savedChars, setSavedChars] = useState<SavedCharacter[]>([]);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  const [name, setName]         = useState("Herói");
  const [race, setRace]         = useState<CharacterRace>(CharacterRace.HUMAN);
  const [cls, setCls]           = useState<CharacterClass>(CharacterClass.WARRIOR);
  const [gender, setGender]     = useState<"male"|"female">("male");
  const [beardStyle, setBeard]  = useState<string>("Trança Dupla");
  const [tattoo, setTattoo]     = useState<string | null>(null);
  const [scar, setScar]         = useState<string | null>(null);
  const [accessory, setAcc]     = useState<string | null>(null);

  const [appearance, setApp] = useState<CharacterAppearance>({
    hairStyle: "style_1", 
    hairColor: "#3b2f2f",
    eyeShape:  "shape_1", 
    eyeColor:  "#5c4033",
    skinTone:  "#f5d0b5",
  });

  useEffect(() => {
    const chars = getSavedCharacters();
    setSavedChars(chars);
    if (chars.length > 0) {
      setSelectedCharId(chars[0].id);
    }
  }, []);

  const upd = (k: keyof CharacterAppearance, v: string) => setApp(a => ({ ...a, [k]: v }));

  const handleSelectChar = (char: SavedCharacter) => {
    setSelectedCharId(char.id);
    setActiveCharacter(char.id);
    setName(char.name);
    setRace(char.race);
    setCls(char.class);
    setGender(char.gender);
    setApp(char.appearance);
    if (char.beardStyle) setBeard(char.beardStyle);
  };

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Por favor, digite um nome para seu personagem!");
      return;
    }

    const res = saveNewCharacter({
      name: name.trim(),
      race,
      class: cls,
      gender,
      appearance,
      beardStyle: race === CharacterRace.DWARF ? beardStyle : undefined
    });

    if (!res.success) {
      alert(res.error);
      return;
    }

    alert(`🎉 Personagem "${name}" criado e salvo com sucesso!`);
    const updated = getSavedCharacters();
    setSavedChars(updated);
    if (res.character) {
      setSelectedCharId(res.character.id);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Tem certeza que deseja apagar este personagem?")) {
      deleteCharacter(id);
      const updated = getSavedCharacters();
      setSavedChars(updated);
      if (updated.length > 0) {
        handleSelectChar(updated[0]);
      }
    }
  };

  return (
    <div className={styles.page}>

      {/* CABEÇALHO */}
      <div className={styles.header}>
        <div className={styles.headerAvatar}>
          {race === CharacterRace.ELF ? "🧝" : race === CharacterRace.DWARF ? "🧙" : "👤"}
        </div>
        <div className={styles.headerTitle}>Criação e Gestão de Personagens</div>
        <a href="#/" className={styles.closeBtn}>✕</a>
      </div>

      {/* BARRA DE SELEÇÃO DE SLOTS DE PERSONAGENS SALVOS */}
      <div style={{
        background: "linear-gradient(180deg, #3f3c31 0%, #2a2821 100%)",
        border: "2px solid #8c734b",
        borderRadius: "8px",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: "bold", color: "#fcd34d", textTransform: "uppercase" }}>
            Seus Personagens ({savedChars.length}/{MAX_CHARACTERS})
          </span>
          <span style={{ fontSize: "0.55rem", color: "#9ca3af" }}>Slot 3: Bloqueado (VIP)</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
          {savedChars.map((sc) => (
            <div 
              key={sc.id} 
              onClick={() => handleSelectChar(sc)}
              style={{
                background: selectedCharId === sc.id ? "linear-gradient(180deg, #78641c 0%, #594523 100%)" : "#4b4842",
                border: selectedCharId === sc.id ? "2px solid #fbbf24" : "1px solid #282622",
                borderRadius: "6px",
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}
            >
              <div style={{ fontSize: "0.65rem", fontWeight: "bold", color: "#fbbf24" }}>{sc.name}</div>
              <div style={{ fontSize: "0.55rem", color: "#e5e7eb" }}>Lv. {sc.level} • {sc.race}</div>
              {savedChars.length > 1 && (
                <span 
                  onClick={(e) => handleDelete(sc.id, e)}
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "4px",
                    color: "#f87171",
                    fontSize: "0.6rem",
                    cursor: "pointer"
                  }}
                  title="Deletar Personagem"
                >
                  ✕
                </span>
              )}
            </div>
          ))}

          {/* Slot Vazio para criar outro */}
          {savedChars.length < MAX_CHARACTERS && (
            <div 
              onClick={() => {
                setName(`Herói ${savedChars.length + 1}`);
                setSelectedCharId(null);
              }}
              style={{
                background: "#2c2b24",
                border: "1px dashed #8c734b",
                borderRadius: "6px",
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "44px"
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "#fbbf24" }}>＋</span>
              <span style={{ fontSize: "0.5rem", color: "#fcd34d", fontWeight: "bold" }}>Novo Slot</span>
            </div>
          )}

          {/* Slot Bloqueado */}
          <div 
            style={{
              background: "#1c1b17",
              border: "1px solid #3d3b31",
              borderRadius: "6px",
              padding: "6px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.5
            }}
          >
            <span style={{ fontSize: "0.8rem" }}>🔒</span>
            <span style={{ fontSize: "0.5rem", color: "#9ca3af" }}>Slot VIP</span>
          </div>
        </div>
      </div>

      {/* NOME DO PERSONAGEM */}
      <input
        type="text"
        className={styles.nameInput}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="DIGITE O NOME DO PERSONAGEM..."
      />

      {/* CLASSE E RAÇA + PREVIEW DINÂMICO REAL COM AS IMAGENS GERADAS */}
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

          {/* Direita: Preview dinâmico de alta fidelidade com a IA Base da Raça */}
          <div className={styles.previewBox} style={{ overflow: "hidden", padding: "4px" }}>
            <div className={styles.crownBadge}>👑</div>
            <div style={{ width: "100%", height: "170px" }}>
              <DynamicAvatar 
                appearance={appearance} 
                race={race} 
                gender={gender} 
                beardStyle={beardStyle}
                mode="full" 
              />
            </div>
            <div style={{ fontSize: "0.6rem", color: "#fcd34d", fontWeight: "bold", textAlign: "center" }}>
              {race === CharacterRace.HUMAN && "Corpo Base Humano Padrão"}
              {race === CharacterRace.ELF && "Corpo Base Elfo (Mais Alto e Esguio)"}
              {race === CharacterRace.DWARF && "Corpo Base Anão (Robusto com Barba)"}
            </div>
          </div>
        </div>
      </div>

      {/* APARÊNCIA BÁSICA + EXTRAS */}
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

          {/* Seletor específico de Barba para ANÕES */}
          {race === CharacterRace.DWARF && gender === "male" && (
            <div className={styles.swatchSection} style={{ background: "rgba(0,0,0,0.15)", padding: "4px", borderRadius: "4px" }}>
              <div className={styles.swatchLabel} style={{ color: "#78350f" }}>Estilo de Barba (Especial Anão)</div>
              <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "center" }}>
                {DWARF_BEARDS.map(b => (
                  <div 
                    key={b} 
                    onClick={() => setBeard(b)}
                    style={{
                      fontSize: "0.5rem",
                      padding: "2px 4px",
                      borderRadius: "3px",
                      background: beardStyle === b ? "#78350f" : "#4b4842",
                      color: beardStyle === b ? "#fef3c7" : "#d1d5db",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cor do Cabelo */}
          <div className={styles.swatchSection}>
            <div className={styles.swatchLabel}>Cor do Cabelo / Barba</div>
            <div className={styles.swatchRow}>
              {HAIR_COLORS.map(c => (
                <div key={c} className={styles.swatch} data-active={appearance.hairColor===c} style={{ background: c }} onClick={() => upd("hairColor", c)} />
              ))}
            </div>
          </div>

          {/* Estilo do Cabelo */}
          <div className={styles.swatchSection}>
            <div className={styles.swatchLabel}>Estilo do Cabelo</div>
            <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "center" }}>
              {HAIR_STYLES.map((h, i) => {
                const styleId = `style_${i+1}`;
                return (
                  <div 
                    key={styleId} 
                    onClick={() => upd("hairStyle", styleId)}
                    style={{
                      fontSize: "0.55rem",
                      padding: "2px 6px",
                      borderRadius: "3px",
                      background: appearance.hairStyle === styleId ? "#065f46" : "#4b4842",
                      color: appearance.hairStyle === styleId ? "#ecfdf5" : "#d1d5db",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    {h}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formato dos Olhos */}
          <div className={styles.swatchSection}>
            <div className={styles.swatchLabel}>Formato dos Olhos</div>
            <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "center" }}>
              {EYE_SHAPES.map(s => (
                <div 
                  key={s.id} 
                  onClick={() => upd("eyeShape", s.id)}
                  style={{
                    fontSize: "0.55rem",
                    padding: "2px 5px",
                    borderRadius: "3px",
                    background: appearance.eyeShape === s.id ? "#065f46" : "#4b4842",
                    color: appearance.eyeShape === s.id ? "#ecfdf5" : "#d1d5db",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
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
                <div key={t} className={styles.extraSlot} data-active={tattoo===t} onClick={() => setTattoo(tattoo===t ? null : t)} style={{ fontSize: "0.55rem", padding: "2px", textAlign: "center" }}>
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.extraSection}>
            <div className={styles.extraLabel}>Cicatrizes</div>
            <div className={styles.extraGrid}>
              {SCARS.map(s => (
                <div key={s} className={styles.extraSlot} data-active={scar===s} onClick={() => setScar(scar===s ? null : s)} style={{ fontSize: "0.55rem", padding: "2px", textAlign: "center" }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.extraSection}>
            <div className={styles.extraLabel}>Acessórios</div>
            <div className={styles.extraGrid}>
              {ACCESSORIES.map(a => (
                <div key={a} className={styles.extraSlot} data-active={accessory===a} onClick={() => setAcc(accessory===a ? null : a)} style={{ fontSize: "0.55rem", padding: "2px", textAlign: "center" }}>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTÃO SALVAR / CRIAR NOVO PERSONAGEM */}
      <button className={styles.createBtn} onClick={handleCreate}>
        💾 SALVAR PERSONAGEM NOVO (SLOT {savedChars.length + 1})
      </button>

      <ActionHub actions={mockActions} />
    </div>
  );
}

