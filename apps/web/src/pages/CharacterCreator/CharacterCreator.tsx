import React, { useState } from 'react';
import { CharacterRace, CharacterClass, CharacterAppearance } from '@fitness-rpg/shared';
import { DynamicAvatar } from '../../components/DynamicAvatar/DynamicAvatar';
import styles from './CharacterCreator.module.css';

export function CharacterCreator() {
  const [name, setName] = useState("Herói");
  const [race, setRace] = useState<CharacterRace>(CharacterRace.HUMAN);
  const [charClass, setCharClass] = useState<CharacterClass>(CharacterClass.WARRIOR);
  const [gender, setGender] = useState<'male'|'female'>('male');
  
  const [appearance, setAppearance] = useState<CharacterAppearance>({
    skinTone: "#f5d0b5",
    hairColor: "#3b2f2f",
    eyeColor: "#5c4033",
    hairStyle: "style_1",
    eyeShape: "shape_1"
  });

  // Cores restritas exatamente como no Guia de Referência do Jogador
  const skinColors = ["#f5d0b5", "#f0b9a0", "#e0ac8f", "#c28e70", "#8d5b40"]; // Tons Base
  const hairColors = ["#3b2f2f", "#1a1a1a", "#e5c158", "#9c3b22", "#e8e8e8"]; // Castanho, Preto, Loiro, Ruivo, Branco
  const eyeColors =  ["#5c4033", "#2e8b57", "#1e90ff", "#8a2be2", "#daa520"]; // Castanho, Verde, Azul, Roxo, Dourado

  const hairStyles = ["style_1", "style_2", "style_3"];
  const eyeShapes = [
    { id: "shape_1", label: "Redondo" },
    { id: "shape_2", label: "Amendoado" },
    { id: "shape_3", label: "Alongado" },
    { id: "shape_4", label: "Caído" },
    { id: "shape_5", label: "Intenso" }
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="#/" className={styles.backBtn}>← Cancelar</a>
        <h1>Criar Personagem</h1>
      </header>

      <div className={styles.previewSection}>
        <div className={styles.avatarWrapper}>
          <DynamicAvatar appearance={appearance} mode="full" />
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.field}>
          <label>Nome do Herói</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className={styles.input} />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Raça</label>
            <select value={race} onChange={e => setRace(e.target.value as CharacterRace)} className={styles.select}>
              <option value={CharacterRace.HUMAN}>Humano</option>
              <option value={CharacterRace.ELF}>Elfo</option>
              <option value={CharacterRace.DWARF}>Anão</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Classe</label>
            <select value={charClass} onChange={e => setCharClass(e.target.value as CharacterClass)} className={styles.select}>
              <option value={CharacterClass.WARRIOR}>Guerreiro</option>
              <option value={CharacterClass.MAGE}>Mago</option>
              <option value={CharacterClass.ARCHER}>Arqueiro</option>
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label>Gênero</label>
          <div className={styles.buttonGroup}>
            <button className={gender === 'male' ? styles.btnActive : styles.btn} onClick={() => setGender('male')}>Masculino</button>
            <button className={gender === 'female' ? styles.btnActive : styles.btn} onClick={() => setGender('female')}>Feminino</button>
          </div>
        </div>

        <div className={styles.field}>
          <label>Tom de Pele</label>
          <div className={styles.colorPicker}>
            {skinColors.map(c => <div key={c} className={styles.colorSwatch} style={{ background: c, border: appearance.skinTone === c ? '2px solid white' : 'none' }} onClick={() => setAppearance({...appearance, skinTone: c})} />)}
          </div>
        </div>

        <div className={styles.field}>
          <label>Estilo de Cabelo (1 a 3)</label>
          <div className={styles.buttonGroup}>
            {hairStyles.map((h, i) => <button key={h} className={appearance.hairStyle === h ? styles.btnActive : styles.btn} onClick={() => setAppearance({...appearance, hairStyle: h})}>Corte {i+1}</button>)}
          </div>
        </div>

        <div className={styles.field}>
          <label>Cor do Cabelo (As 5 Cores do Guia)</label>
          <div className={styles.colorPicker}>
            {hairColors.map(c => <div key={c} className={styles.colorSwatch} style={{ background: c, border: appearance.hairColor === c ? '2px solid white' : 'none' }} onClick={() => setAppearance({...appearance, hairColor: c})} />)}
          </div>
        </div>

        <div className={styles.field}>
          <label>Formato dos Olhos (1 a 5)</label>
          <div className={styles.buttonGroup} style={{flexWrap: 'wrap'}}>
            {eyeShapes.map(s => (
              <button key={s.id} className={appearance.eyeShape === s.id ? styles.btnActive : styles.btn} onClick={() => setAppearance({...appearance, eyeShape: s.id})}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>Cor dos Olhos (As 5 Cores do Guia)</label>
          <div className={styles.colorPicker}>
            {eyeColors.map(c => <div key={c} className={styles.colorSwatch} style={{ background: c, border: appearance.eyeColor === c ? '2px solid white' : 'none' }} onClick={() => setAppearance({...appearance, eyeColor: c})} />)}
          </div>
        </div>

        <button className={styles.saveBtn} onClick={() => alert('Personagem salvo!')}>Confirmar Criação</button>
      </div>
    </div>
  );
}
