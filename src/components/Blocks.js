import './Blocks.css';

function Option({ children, ...props }) {
  return <label className="Option" {...props}>{children}</label>
}

export function Block({ block, updateBlock, handleDrag, handleDrop }) {
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
      </select>
    </Option>
    {
      {
        Reps: <Reps block={block} updateBlockKey={updateBlockKey} />,
        Timer: <Timer block={block} updateBlockKey={updateBlockKey} />,
        AMRAP: <AMRAP block={block} updateBlockKey={updateBlockKey} />,
        ALAP: <ALAP block={block} updateBlockKey={updateBlockKey} />,
        Rest: <Rest block={block} updateBlockKey={updateBlockKey} />,
      }[block.type]
    }

    <Option>Note: <input name="note" onChange={updateBlockKey} placeholder="Focus on your form" /></Option>
  </div>
}

export function Reps({ block, updateBlockKey }) {
  return <>
    <Option>Exercise: <input name="exercise" value={block.exercise} onChange={updateBlockKey} /></Option>
    <Option>Number: <input type="number" name="count" value={block.count} onChange={updateBlockKey} /></Option>
  </>
}

export function Timer({ block, updateBlockKey }) {
  return <>
    <Option>Exercise: <input name="exercise" value={block.exercise} onChange={updateBlockKey} /></Option>
    <Option>Time (seconds): <input type="number" name="timer" value={block.timer} onChange={updateBlockKey} /></Option>
  </>
}

export function AMRAP({ block, updateBlockKey }) {
  return <>
    <Option>Exercise: <input name="exercise" value={block.exercise} onChange={updateBlockKey} /></Option>
    <Option>Has Rep Counter: <input type="checkbox" name="hasRepCounter" checked={block.hasRepCounter} onChange={updateBlockKey} /></Option>
    <Option>Has Timer: <input type="checkbox" name="hasTimer" checked={block.hasTimer} onChange={updateBlockKey} /></Option>
    {block.hasTimer && <Option>Time (seconds): <input type="number" name="timer" value={block.timer} onChange={updateBlockKey} /></Option>}
  </>
}

export function ALAP({ block, updateBlockKey }) {
  return <>
    <Option>Exercise: <input name="exercise" value={block.exercise} onChange={updateBlockKey} /></Option>
    <Option>Has Time Counter: <input type="checkbox" name="hasTimeCounter" value={block.hasTimeCounter} onChange={updateBlockKey} /></Option>
  </>
  }

export function Rest({ block, updateBlockKey }) {
  return <div>
    <Option>Auto Start: <input type="checkbox" name="autoStart" checked={block.autoStart} onChange={updateBlockKey} /></Option>
    <Option>Time (seconds): <input type="number" name="timer" value={block.timer} onChange={updateBlockKey} /></Option>
  </div>
}
