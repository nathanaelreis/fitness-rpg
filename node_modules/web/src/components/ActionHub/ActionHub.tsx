import { ActionItem } from "@fitness-rpg/shared";
import styles from "./ActionHub.module.css";

interface Props { actions: ActionItem[]; }

export function ActionHub({ actions }: Props) {
  return (
    <section className={styles.section} aria-label="Ações rápidas">
      <h2 className={styles.title}>O que fazer</h2>
      <nav className={styles.grid} aria-label="Menu de navegação">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className={styles.action}
            data-accent={action.accent ? "true" : "false"}
            aria-label={action.badge ? `${action.label} - ${action.badge} notificações` : action.label}
            onClick={(e) => { if(!action.href.startsWith('#')) e.preventDefault() }}
          >
            {action.spriteClass ? (
               <div className={`${styles.iconSprite} ${styles[action.spriteClass]}`} />
            ) : (
               <span className={styles.actionIcon} aria-hidden="true">{action.icon}</span>
            )}
            
            <span className={styles.actionLabel}>{action.label}</span>
            {action.badge != null && action.badge > 0 && (
              <span className={styles.badge} aria-hidden="true">{action.badge}</span>
            )}
          </a>
        ))}
      </nav>
    </section>
  );
}
