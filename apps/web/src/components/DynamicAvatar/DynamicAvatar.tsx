import React from 'react';
import { CharacterAppearance, Item } from '@fitness-rpg/shared';
import styles from './DynamicAvatar.module.css';

interface DynamicAvatarProps {
  appearance: CharacterAppearance;
  equippedItems?: Item[];
  mode?: 'face' | 'full';
}

export function DynamicAvatar({ appearance, equippedItems = [], mode = 'full' }: DynamicAvatarProps) {
  const { skinTone, hairColor, eyeColor, hairStyle } = appearance;
  
  const hasChest = equippedItems.some(i => i.slot === 'CHEST');
  const hasWeapon = equippedItems.some(i => i.slot === 'WEAPON');

  return (
    <div className={`${styles.avatarContainer} ${styles[mode]}`}>
      {/* 
        NOTA ARQUITETURAL: 
        No jogo final com as artes prontas, este SVG seria substituído por múltiplas tags <img src="..." /> empilhadas (position: absolute),
        renderizando os PNGs recortados pelo artista 2D: Base_Corpo.png, Olhos_Vermelhos.png, Cabelo_1.png, Roupa_Couro.png, etc.
        Para demonstrar a funcionalidade via código sem as artes recortadas, utilizaremos camadas SVG dinâmicas coloridas.
      */}
      <svg viewBox={mode === 'face' ? "30 10 40 40" : "0 0 100 100"} className={styles.svgLayers}>
        
        {/* Layer 1: Base Body (colored by skinTone) */}
        <g id="layer-body" fill={skinTone}>
          <circle cx="50" cy="30" r="15" /> {/* Cabeça */}
          <path d="M 35,60 C 35,45 65,45 65,60 L 65,95 L 35,95 Z" /> {/* Corpo base */}
          <rect x="35" y="95" width="10" height="15" rx="5" /> {/* Perna E */}
          <rect x="55" y="95" width="10" height="15" rx="5" /> {/* Perna D */}
          <rect x="25" y="55" width="8" height="25" rx="4" /> {/* Braço E */}
          <rect x="67" y="55" width="8" height="25" rx="4" /> {/* Braço D */}
        </g>

        {/* Layer 2: Equipment - Chest */}
        {hasChest && (
          <g id="layer-chest-armor" fill="#475569">
            <path d="M 34,58 C 34,44 66,44 66,58 L 66,80 L 34,80 Z" />
            <rect x="48" y="45" width="4" height="35" fill="#334155" /> {/* Detalhe */}
          </g>
        )}

        {/* Layer 3: Face (colored by eyeColor) */}
        <g id="layer-face" fill={eyeColor}>
          <circle cx="43" cy="28" r="3" />
          <circle cx="57" cy="28" r="3" />
        </g>
        
        {/* Layer 4: Hair (colored by hairColor, shaped by hairStyle) */}
        <g id="layer-hair" fill={hairColor}>
          {hairStyle === 'style_1' ? (
            <path d="M 32,25 C 32,5 68,5 68,25 C 68,15 32,15 32,25 Z" /> /* Franja Simples */
          ) : hairStyle === 'style_2' ? (
            <path d="M 32,35 C 25,10 75,10 68,35 C 70,5 30,5 32,35 Z" /> /* Cabelo Longo */
          ) : (
            <circle cx="50" cy="18" r="12" /> /* Cabelo Redondo/Black Power */
          )}
        </g>

        {/* Layer 5: Weapon Overlay */}
        {hasWeapon && mode === 'full' && (
          <g id="layer-weapon">
            <rect x="69" y="40" width="4" height="40" fill="#94a3b8" /> {/* Lâmina */}
            <rect x="65" y="70" width="12" height="4" fill="#f59e0b" /> {/* Guarda */}
            <rect x="69" y="74" width="4" height="15" fill="#78350f" /> {/* Cabo */}
          </g>
        )}
      </svg>
    </div>
  );
}
