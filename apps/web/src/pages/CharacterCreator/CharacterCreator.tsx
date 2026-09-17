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
    skinTone: "#fcd34d",
    hairColor: "#4a3018",
    eyeColor: "#1d4ed8",
    hairStyle: "style_1"
  });

  const skinColors = ["#fcd34d", "#f87171", "#d97706", "#78350f", "#e2e8f0"];
  const hairColors = ["#4a3018", "#f59e0b", "#dc2626", "#10b981", "#e2e8f0"];
  const eyeColors = ["#1d4ed8", "#15803d", "#b91c1c", "#a21caf", "#000000"];
  const hairStyles = ["style_1", "style_2", "style_3"];

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
          <label>Estilo de Cabelo</label>
          <div className={styles.buttonGroup}>
            {hairStyles.map(h => <button key={h} className={appearance.hairStyle === h ? styles.btnActive : styles.btn} onClick={() => setAppearance({...appearance, hairStyle: h})}>{h.replace('style_', 'Tipo ')}</button>)}
          </div>
        </div>

        <div className={styles.field}>
          <label>Cor do Cabelo</label>
          <div className={styles.colorPicker}>
            {hairColors.map(c => <div key={c} className={styles.colorSwatch} style={{ background: c, border: appearance.hairColor === c ? '2px solid white' : 'none' }} onClick={() => setAppearance({...appearance, hairColor: c})} />)}
          </div>
        </div>

        <div className={styles.field}>
          <label>Cor dos Olhos</label>
          <div className={styles.colorPicker}>
            {eyeColors.map(c => <div key={c} className={styles.colorSwatch} style={{ background: c, border: appearance.eyeColor === c ? '2px solid white' : 'none' }} onClick={() => setAppearance({...appearance, eyeColor: c})} />)}
          </div>
        </div>

        <button className={styles.saveBtn} onClick={() => alert('Personagem salvo!')}>Confirmar Criação</button>
      </div>
    </div>
  );
}
