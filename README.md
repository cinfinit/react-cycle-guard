# 🛡️ react-cycle-guard

Introducing react-cycle-guard — your React component’s personal bodyguard.
It doesn’t block bad props or fight evil side effects,
but it will throw itself between your app and an infinite render loop.
It’s like useEffect()’s older sibling who says:
"Hey. You’ve rendered 15 times this second. You okay, champ?"

In Simple Terms : A tiny React hook that helps you detect infinite loops and excessive re-renders — *before* they crash your app.

---

## 🚀 Why?

React renders are fast — but bugs aren’t. If your component:

- Triggers a state update during render  
- Re-renders dozens of times per second  
- Gets stuck in a `useEffect` loop  
- Re-renders constantly from unstable props  

…it can silently crush your app's performance or even cause a full browser crash.

**`react-cycle-guard`** is a tiny, dev-only hook that warns you when this is happening — right in your console.

---

## 💡 How It Works

It monitors how many times a component re-renders per second.

If it crosses a threshold (**default: 10 renders/second**), it shows a warning like:


---

## 📦 Install

```bash
npm install react-cycle-guard
```

---

## 🔧 Usage

```javascript
import { useCycleGuard } from 'react-cycle-guard';

function ProductList(props) {
  useCycleGuard("ProductList");

  return <ul>{props.items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}
```

That’s it. Now you’ll get a warning in the console if this component renders too often.

---

## 🐞 What Problems It Detects

### 🔁 1. Infinite Loops

```javascript
function Buggy() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // 🔥 Renders forever
  useCycleGuard("Buggy");
  return <div>{count}</div>;
}
```

### ⚠️ 2. Effects Without Dependencies

```javascript
useEffect(() => {
  fetchData(); // sets state
}); // ❌ Missing deps — runs every render

useCycleGuard("Dashboard");
```

### 🔄 3. Re-renders from Parent Props

```javascript
<ChildComponent onClick={() => doSomething()} />

// ✔️ Add useCycleGuard("ChildComponent") inside and catch it!

useCycleGuard("ChildComponent");
```

## custom threshold

```javascript
useCycleGuard("ChildComponent", 20); // 20 renders/second
```

---

## 🧼 Zero Prod Impact

This is a dev-only tool. Use it freely. It’s small, safe, and has no side effects.

---

## ✅ Ideal For

- Debugging mysterious re-renders
- Catching infinite render bugs fast
- Preventing accidental prop spam from parents
- Improving performance by exposing unnecessary updates

Enjoy ! 🎉