import { ActionHub } from "../../components/ActionHub/ActionHub";
import { mockActions, mockCharacter } from "../../mocks/gameData";
import styles from "./Arena.module.css";

export function Arena() {
  return (
    <div className={styles.page}>

      <div className={styles.mainBoard}>
        <div className={styles.boardTitle}>PAINEL DE ARENA</div>

        {/* ===== 1x1 ===== */}
        <div className={styles.modeBlock}>
          <div className={styles.modeTitle}>PVP 1x1 (Duelo)</div>
          <div className={styles.modeBody}>
            <div className={styles.duelRow}>
              <div className={styles.playerCard}>
                <div className={styles.playerAvatar}>😶</div>
                <div className={styles.eloBadge}>ELO {mockCharacter.elo}</div>
              </div>
              <div className={styles.vs}>
                <div className={styles.vsText}>⚔️</div>
                <div className={styles.timer}>INÍCIO EM: 02:30</div>
              </div>
              <div className={styles.opponentCard}>
                <div className={styles.opponentAvatar}>❓</div>
                <div className={styles.opponentLabel}>OPONENTE</div>
              </div>
            </div>
            <button className={styles.actionBtn}>DUELAR</button>
          </div>
        </div>

        {/* ===== 3x3 ===== */}
        <div className={styles.modeBlock}>
          <div className={styles.modeTitle}>PVP EM GRUPO 3x3</div>
          <div className={styles.modeBody}>
            <div className={styles.groupRow}>
              {/* Grupo A */}
              <div className={styles.groupCol}>
                <div style={{fontSize: '0.55rem', color: '#594523', fontWeight: 900, textTransform: 'uppercase'}}>GRUPO A</div>
                <div className={styles.groupSlot} data-filled="true">
                  <span>😶</span>
                  <div>
                    <div className={styles.groupSlotTag}>⭐ Guerreiro</div>
                  </div>
                </div>
                <div className={styles.inviteSlot}>＋ CONVIDAR</div>
                <div className={styles.inviteSlot}>＋ CONVIDAR</div>
              </div>

              <div style={{fontSize: '1.5rem', flexShrink: 0}}>⚔️</div>

              {/* Grupo B */}
              <div className={styles.groupCol}>
                <div style={{fontSize: '0.55rem', color: '#7c2d12', fontWeight: 900, textTransform: 'uppercase', textAlign: 'right'}}>GRUPO B (OPONENTES)</div>
                <div className={styles.groupSlot}>❓</div>
                <div className={styles.groupSlot}>❓</div>
                <div className={styles.groupSlot}>❓</div>
              </div>
            </div>
            <button className={styles.actionBtn}>COMBATE EM GRUPO</button>
          </div>
        </div>

        {/* ===== GVG ===== */}
        <div className={styles.modeBlock}>
          <div className={styles.modeTitle}>GVG (GUILD vs GUILD)</div>
          <div className={styles.modeBody}>
            <div className={styles.gvgBanner}>
              <div className={styles.guildBadge}>🦁</div>
              <div className={styles.gvgCenter}>🏰</div>
              <div className={styles.guildBadge}>👁️</div>
            </div>
            <div className={styles.gvgTimer}>PRÓXIMA GvG: em 2 dias (HORÁRIO DE INÍCIO: 21:00)</div>
            <button className={styles.actionBtn} style={{marginBottom: '0.5rem'}}>GUERRA DE GUILDAS</button>
            <button className={styles.actionBtn}>LISTAR OPONENTES</button>
          </div>
        </div>

      </div>

      <ActionHub actions={mockActions} />
    </div>
  );
}
