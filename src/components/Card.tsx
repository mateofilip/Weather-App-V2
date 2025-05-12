export default function Card({ id, temperature, max, min, name, onClose }) {
  return (
    <div>
      {id}, {name}, {temperature}, {max}, {min}
      <button onClick={onClose}>X</button>
    </div>
  );
}
