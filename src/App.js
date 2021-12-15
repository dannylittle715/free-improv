import './App.css';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [notes, setNotes] = useState('')
  const [adj, setAdj] = useState('')
  const [time, setTime] = useState('')
  
  const generate = useCallback(async () => {
    const url = 'https://random-word-form.herokuapp.com/random/adjective';
    const allNotes = ['A', 'B', 'C', 'D', 'E', 'F'];
    const suffixes = ['', 'b', '#'];

    const removeBadNote = noteStr => {
      switch (noteStr) {
        case 'B#':
          return 'C';
        case 'Cb':
          return 'B';
        case 'D#':
          return 'Eb';
        case 'E#':
          return 'F';
        case 'Fb':
          return 'E';
        default:
          return noteStr;
      }
    };

    const sample = arr => arr[~~(Math.random() * arr.length)];
    const randNumInclusive = (low, high) =>
      low + ~~(Math.random() * (high - low + 1));

    const noteGen = () => {
      const notesSet = new Set();
      const n = randNumInclusive(2, 4);
      while (notesSet.size < n) {
        notesSet.add(removeBadNote(sample(allNotes) + sample(suffixes)));
      }
      return notesSet;
    };

    const adjGen = async () => {
      const response = await fetch(url);
      return await response.json();
    };
    const a = await adjGen()
    setAdj(a)
    setNotes(noteGen());
    setTime(Math.ceil(randNumInclusive(5, 30)/5)*5);
  }, []);

  useEffect(() => {
    generate()
    }, [generate])
  return (
    <div className='App'>
      <div>
        <h1>Free Improvisation</h1>
        <p>Notes: {Array.from(notes).join(', ')}</p>
        <p>Timeframe: {String(time)} seconds</p>
        <p>Descriptor: {adj ? adj[0] : ''}</p>
      </div>
      <button onClick={generate}>Regenerate</button>
    </div>
  );
}

export default App;
