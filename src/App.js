import { useState } from "react";

/* const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true },
    { id: 3, description: "Charger", quantity: 12, packed: false },
]; */

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((prevItems) => [...prevItems, item]);
    }

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItems={handleDeleteItem}
                onToggleItems={handleToggleItem}
            />
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away </h1>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handlerSubmit(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
        console.log(newItem);
    }

    return (
        <form className="add-form" onSubmit={handlerSubmit}>
            <h3>What do you need for your trip ?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></input>
            <button>Add</button>
        </form>
    );
}

function PackingList({ items, onDeleteItems, onToggleItems }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItems={onDeleteItems}
                        onToggleItems={onToggleItems}
                    />
                ))}
            </ul>
        </div>
    );
}

function Item({ item, onDeleteItems, onToggleItems }) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onToggleItems(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} -{item.description}
            </span>
            <button onClick={() => onDeleteItems(item.id)}>❌</button>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <p>
                You have X item(s) on your list, and you already packed X (X%)
            </p>
        </footer>
    );
}
