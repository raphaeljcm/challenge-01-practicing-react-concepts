import { Header } from './components/Header';
import { TasksList } from './components/TasksList';

import styles from './App.module.scss';
import './styles/global.scss';

function App() {
  return (
    <>
      <Header />

      <main className={styles.container}>
        <TasksList />
      </main>
    </>
  );
}

export default App
