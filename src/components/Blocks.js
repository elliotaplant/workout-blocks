import './Blocks.css';
import { useState } from 'react';
import newBlock from './newBlock'

function Option({ children, ...props }) {
  return <label className="Option" {...props}>{children}</label>
}

export function Block({ block, updateBlock, handleDrag, handleDrop, deleteBlock }) {
  const updateBlockKey = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    return updateBlock({ ...block, [name]: value });
  }

  return <div
    className="Block"
    draggable={true}
    onDragStart={handleDrag}
    onDrop={handleDrop}
    onDragOver={e => e.preventDefault()}
  >
    <Option>Type: <select name="type" value={block.type} onChange={updateBlockKey}>
        <option>Reps</option>
        <option>Timer</option>
        <option>AMRAP</option>
        <option>ALAP</option>
        <option>Rest</option>
        <option>Repeat</option>
      </select>
    </Option>
    {block.type !== 'Rest' && block.type !== 'Repeat' &&
      <Option>Exercise: <input name="exercise" value={block.exercise} onChange={updateBlockKey} /></Option>
    }
    {
      {
        Reps: <Reps block={block} updateBlockKey={updateBlockKey} />,
        Timer: <Timer block={block} updateBlockKey={updateBlockKey} />,
        AMRAP: <AMRAP block={block} updateBlockKey={updateBlockKey} />,
        ALAP: <ALAP block={block} updateBlockKey={updateBlockKey} />,
        Rest: <Rest block={block} updateBlockKey={updateBlockKey} />,
        Repeat: <Repeat block={block} updateBlock={updateBlock} updateBlockKey={updateBlockKey}/>,
      }[block.type]
    }

    <Option>Note: <input name="note" value={block.note} onChange={updateBlockKey} placeholder="Focus on your form" /></Option>
    <button onClick={deleteBlock}>Delete</button>
  </div>
}

export function Reps({ block, updateBlockKey }) {
  return <>
    <Option>Number: <input type="number" name="count" value={block.count} onChange={updateBlockKey} /></Option>
  </>
}

export function Timer({ block, updateBlockKey }) {
  return <>
    <Option>Auto Start: <input type="checkbox" name="autoStart" checked={!!block.autoStart} onChange={updateBlockKey} /></Option>
    <Option>Time (seconds): <input type="number" name="timer" value={block.timer} onChange={updateBlockKey} /></Option>
  </>
}

export function AMRAP({ block, updateBlockKey }) {
  return <>
    <Option>Has Rep Counter: <input type="checkbox" name="hasRepCounter" checked={!!block.hasRepCounter} onChange={updateBlockKey} /></Option>
    <Option>Has Timer: <input type="checkbox" name="hasTimer" checked={!!block.hasTimer} onChange={updateBlockKey} /></Option>
    {block.hasTimer && <Option>Time (seconds): <input type="number" name="timer" value={block.timer} onChange={updateBlockKey} /></Option>}
  </>
}

export function ALAP({ block, updateBlockKey }) {
  return <>
    <Option>Has Time Counter: <input type="checkbox" name="hasTimeCounter" checked={!!block.hasTimeCounter} onChange={updateBlockKey} /></Option>
  </>
  }

export function Rest({ block, updateBlockKey }) {
  return <>
    <h3>Rest</h3>
    <Option>Auto Start: <input type="checkbox" name="autoStart" checked={!!block.autoStart} onChange={updateBlockKey} /></Option>
    <Option>Time (seconds): <input type="number" name="timer" value={block.timer} onChange={updateBlockKey} /></Option>
  </>
}

export function Repeat({ block, updateBlockKey, updateBlock }) {
  const [dragIndex, setDragIndex] = useState(-1);
  const subBlocks = block.subBlocks || [];

  const updateSubBlock = (i, subBlock) => updateBlock({
    ...block,
    subBlocks: [...subBlocks.slice(0, i), subBlock, ...subBlocks.slice(i + 1)]
  });

  const addBlock = () => updateBlock({ ...block, subBlocks: [...subBlocks, newBlock()] });
  const deleteBlock = (i) => updateBlock({ ...block, subBlocks: [...subBlocks.slice(0, i), ...subBlocks.slice(i + 1)] });

  const handleDrag = (e, i) => {
    setDragIndex(i);
  }

  const handleDrop = (e, dropIndex) => {
    const blocksWithoutDrag = [...subBlocks.slice(0, dragIndex), ...subBlocks.slice(dragIndex + 1)];
    const blocksWithNewDrag = [
      ...blocksWithoutDrag.slice(0, dropIndex),
      subBlocks[dragIndex],
      ...blocksWithoutDrag.slice(dropIndex),
    ];

    updateBlock({ ...block, subBlocks: blocksWithNewDrag })
    e.preventDefault();
    e.stopPropagation();
  }

  return <div className="sub-block-container">
      <Option>Sets: <input name="sets" type="number" value={block.sets} onChange={updateBlockKey} /></Option>
      <ul>
        {subBlocks.map((block, i) => <li key={i}>
          <Block
            block={block}
            updateBlock={(block) => updateSubBlock(i, block)}
            handleDrag={(e) => handleDrag(e, i)}
            handleDrop={(e) => handleDrop(e, i)}
            deleteBlock={() => deleteBlock(i)}
          />
        </li>)}
      </ul>
      <button onClick={addBlock} className="Add">+</button>
  </div>
}
