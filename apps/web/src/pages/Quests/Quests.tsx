import { useState } from 'react';
import { ActionHub } from "../../components/ActionHub/ActionHub";
import { mockActions } from "../../mocks/gameData";
import styles from "./Quests.module.css";

const QuestProgress = ({ current, total, doneText }: { current: number, total: number, doneText?: string }) => {
  const percent = Math.min(100, Math.max(0, (current / total) * 100));
  const isDone = current >= total;
  return (
    <div className={styles.progBg}>
      <div className={styles.progFill} data-done={isDone} style={{ width: `${percent}%` }} />
      <div className={styles.progText}>{isDone ? (doneText || "Concluído") : `${current}/${total}`}</div>
    </div>
  );
};

export function Quests() {
  const [activeTab, setActiveTab] = useState("DIÁRIAS");

  return (
    <div className={styles.page}>
      
      <div className={styles.mainBoard}>
        <div className={styles.boardTitle}>PAINEL DE MISSÕES</div>
        
        <div className={styles.tabsContainer}>
          <div className={styles.tab} data-active={activeTab === 'DIÁRIAS'} onClick={() => setActiveTab('DIÁRIAS')}>DIÁRIAS</div>
          <div className={styles.tab} data-active={activeTab === 'SEMANAIS'} onClick={() => setActiveTab('SEMANAIS')}>SEMANAIS</div>
          <div className={styles.tab} data-active={activeTab === 'ESPECIAIS'} onClick={() => setActiveTab('ESPECIAIS')}>ESPECIAIS</div>
          <div className={styles.tab} data-active={activeTab === 'EVENTO'} onClick={() => setActiveTab('EVENTO')}>
            EVENTO <div className={styles.tabBadge}>4</div>
          </div>
        </div>

        {/* TOP SECTION (Diárias / Semanais visualizadas juntas no MVP para replicar a imagem) */}
        <div className={styles.twoColGrid}>
          {/* COLUNA ESQUERDA (Diárias) */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
            <div className={styles.colHeader}>Reset em: 12h</div>
            <div className={styles.questCard}>
              <div className={styles.questIcon}>🧪</div>
              <div className={styles.questInfo}>
                <div className={styles.questTitle}>Coletar 3 Poções de Vida</div>
                <QuestProgress current={2} total={5} />
              </div>
            </div>
            <div className={styles.questCard}>
              <div className={styles.questIcon}>👺</div>
              <div className={styles.questInfo}>
                <div className={styles.questTitle}>Derrotar 5 Goblins</div>
                <QuestProgress current={3} total={5} />
              </div>
            </div>
            <div className={styles.questCard}>
              <div className={styles.questIcon}>📖</div>
              <div className={styles.questInfo}>
                <div className={styles.questTitle}>Completar 1 Missão de História</div>
                <QuestProgress current={0} total={1} />
              </div>
            </div>
            <div className={styles.colHeader} style={{marginTop: '4px'}}>Reset em: 12h</div>
          </div>

          {/* COLUNA DIREITA (Semanais) */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
            <div className={styles.colHeader}>Reset em: 4 dias</div>
            <div className={styles.questCard}>
              <div className={styles.questIcon}>📅</div>
              <div className={styles.questInfo}>
                <div className={styles.questTitle}>Concluir 20 Missões Diárias</div>
                <div className={styles.questSub}>Recompensas</div>
                <QuestProgress current={10} total={20} />
              </div>
            </div>
            <div className={styles.questCard}>
              <div className={styles.questIcon}>👾</div>
              <div className={styles.questInfo}>
                <div className={styles.questTitle}>Derrotar o Chefe Semanal</div>
                <QuestProgress current={10} total={20} />
              </div>
            </div>
            <div className={styles.questCard}>
              <div className={styles.questIcon}>⚒️</div>
              <div className={styles.questInfo}>
                <div className={styles.questTitle}>Melhorar 3 Equipamentos</div>
                <div style={{display: 'flex', gap: '4px', marginTop: '2px'}}>
                  <span style={{fontSize: '0.5rem'}}>💎10 🔴30 🟡300</span>
                </div>
              </div>
            </div>
            <div className={styles.colHeader} style={{marginTop: '4px'}}>Reset em: 4 dias</div>
          </div>
        </div>

        {/* BOTTOM SECTION (Especiais / Evento) */}
        <div className={styles.twoColGrid} style={{marginTop: '4px'}}>
          {/* COLUNA ESQUERDA (Especiais) */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
            <div className={styles.sectionHeader}>ESPECIAIS</div>
            <div className={styles.questCard}>
              <div className={styles.questIcon}>🗡️</div>
              <div className={styles.questInfo}>
                <div className={styles.questTitle}>Caminho do Guerreiro (Cap. 1)</div>
                <QuestProgress current={2} total={5} />
              </div>
            </div>
            <div className={styles.questCard}>
              <div className={styles.questIcon}>🏛️</div>
              <div className={styles.questInfo}>
                <div className={styles.questTitle}>Mistério da Arena</div>
                <QuestProgress current={20} total={20} />
              </div>
            </div>
            <div className={styles.questCard}>
              <div className={styles.questIcon}>📜</div>
              <div className={styles.questInfo}>
                <div className={styles.questTitle}>Mistério da Arena</div>
                <QuestProgress current={1} total={1} doneText="Concluído" />
              </div>
            </div>
            <div className={styles.questCard}>
              <div className={styles.questIcon}>🎟️</div>
              <div className={styles.questInfo}>
                <div className={styles.questTitle}>Mistério da Arena</div>
                <QuestProgress current={1} total={1} doneText="Concluído" />
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA (Evento) */}
          <div>
            <div className={styles.eventCard}>
              <div className={styles.eventBadge}>🎅</div>
              <div className={styles.eventTitle}>EVENTO</div>
              
              <div className={styles.eventQuest}>
                <div className={styles.questIcon} style={{background: 'transparent', border: 'none'}}>🎅</div>
                <div className={styles.questInfo}>
                  <div className={styles.questTitle}>Colete Gnomos Perdidos</div>
                  <QuestProgress current={1} total={1} doneText="Concluído" />
                </div>
              </div>

              <div className={styles.eventQuest}>
                <div className={styles.questIcon} style={{background: 'transparent', border: 'none'}}>🗺️</div>
                <div className={styles.questInfo}>
                  <div className={styles.questTitle}>Complete a Pista do Gnomo</div>
                  <QuestProgress current={17} total={20} />
                </div>
              </div>

              <div className={styles.eventQuest}>
                <div className={styles.questIcon} style={{background: 'transparent', border: 'none'}}>🎒</div>
                <div className={styles.questInfo}>
                  <div className={styles.questTitle}>Complete a Pista do Gnomo</div>
                  <div className={styles.eventRewards}>
                    <div className={styles.eventReward}>👣x5</div>
                    <div className={styles.eventReward}>🟡x50</div>
                    <div className={styles.eventReward}>XP 1,000</div>
                  </div>
                </div>
              </div>

              <div className={styles.eventTimer}>Evento termina em:<br/>6 dias</div>
            </div>
          </div>
        </div>

        <button className={styles.claimBtn}>RESGATAR TODAS</button>
      </div>

      <ActionHub actions={mockActions} />
    </div>
  );
}

