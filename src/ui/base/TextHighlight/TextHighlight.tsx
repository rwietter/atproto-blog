import type { FC, PropsWithChildren } from "react";

import styles from "./styles.module.css";

type TextHighlightPropType = PropsWithChildren<{
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
}>

const TextHighlight: FC<TextHighlightPropType> = ({ children, color }) => {
  return <span data-color={color} className={styles.text}>{children}</span>
}

export default TextHighlight;