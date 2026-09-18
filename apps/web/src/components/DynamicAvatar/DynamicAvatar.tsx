import { CharacterAppearance, Item } from '@fitness-rpg/shared';
import styles from './DynamicAvatar.module.css';

interface DynamicAvatarProps {
  appearance: CharacterAppearance;
  equippedItems?: Item[];
  mode?: 'face' | 'full';
}

export function DynamicAvatar({ appearance, equippedItems = [], mode = 'full' }: DynamicAvatarProps) {
  const { skinTone, hairColor, eyeColor, hairStyle, eyeShape } = appearance;
  
  const hasChest = equippedItems.some(i => i.slot === 'CHEST');
  const hasWeapon = equippedItems.some(i => i.slot === 'WEAPON');

  // Lógica SVG para os Formatos de Olhos (1 a 5)
  const renderEyes = () => {
    switch(eyeShape) {
      case 'shape_2': // Amendoado
        return <path d="M 40,28 Q 43,24 46,28 Q 43,30 40,28 M 54,28 Q 57,24 60,28 Q 57,30 54,28" fill={eyeColor} />;
      case 'shape_3': // Alongado
        return <path d="M 39,28 L 47,28 L 45,26 Z M 53,28 L 61,28 L 55,26 Z" fill={eyeColor} />;
      case 'shape_4': // Caído
        return <path d="M 40,26 Q 43,26 46,29 L 40,29 Z M 54,29 Q 57,26 60,26 L 60,29 Z" fill={eyeColor} />;
      case 'shape_5': // Intenso
        return <path d="M 40,30 L 46,27 L 46,30 Z M 54,27 L 60,30 L 54,30 Z" fill={eyeColor} />;
      case 'shape_1': // Redondo (Padrão)
      default:
        return <><circle cx="43" cy="28" r="3" fill={eyeColor} /><circle cx="57" cy="28" r="3" fill={eyeColor} /></>;
    }
  };

  return (
    <div className={`${styles.avatarContainer} ${styles[mode]}`}>
      <svg viewBox={mode === 'face' ? "30 10 40 40" : "0 0 100 100"} className={styles.svgLayers}>
        
        {/* Layer 1: Base Body */}
        <g id="layer-body" fill={skinTone}>
          <circle cx="50" cy="30" r="15" />
          <path d="M 35,60 C 35,45 65,45 65,60 L 65,95 L 35,95 Z" />
          <rect x="35" y="95" width="10" height="15" rx="5" />
          <rect x="55" y="95" width="10" height="15" rx="5" />
          <rect x="25" y="55" width="8" height="25" rx="4" />
          <rect x="67" y="55" width="8" height="25" rx="4" />
        </g>

        {/* Layer 2: Chest Armor */}
        {hasChest && (
          <g id="layer-chest-armor" fill="#475569">
            <path d="M 34,58 C 34,44 66,44 66,58 L 66,80 L 34,80 Z" />
            <rect x="48" y="45" width="4" height="35" fill="#334155" />
          </g>
        )}

        {/* Layer 3: Face (Eye Shapes & Colors) */}
        <g id="layer-face">
          {renderEyes()}
        </g>
        
        {/* Layer 4: Hair */}
        <g id="layer-hair" fill={hairColor}>
          {hairStyle === 'style_1' ? (
            <path d="M 32,25 C 32,5 68,5 68,25 C 68,15 32,15 32,25 Z" />
          ) : hairStyle === 'style_2' ? (
            <path d="M 32,35 C 25,10 75,10 68,35 C 70,5 30,5 32,35 Z" />
          ) : (
            <circle cx="50" cy="18" r="12" />
          )}
        </g>

        {/* Layer 5: Weapon */}
        {hasWeapon && mode === 'full' && (
          <g id="layer-weapon">
            <rect x="69" y="40" width="4" height="40" fill="#94a3b8" />
            <rect x="65" y="70" width="12" height="4" fill="#f59e0b" />
            <rect x="69" y="74" width="4" height="15" fill="#78350f" />
          </g>
        )}
      </svg>
    </div>
  );
}

