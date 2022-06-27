import { Header } from './components/Header';
import { TasksList } from './components/TasksList';

import styles from './App.module.scss';
import './styles/global.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import {isMobile} from 'react-device-detect';

function App() {
  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <Header />

      <main className={styles.container}>
        <TasksList />
      </main>
    </DndProvider>
  );
}

export default App
