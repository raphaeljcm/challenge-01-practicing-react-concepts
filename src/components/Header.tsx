import logo from '../assets/logo.svg';

import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header_container}>
      <img src={logo} alt="logo" />
    </header>
  );
}