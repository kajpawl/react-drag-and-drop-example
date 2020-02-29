import React from "react";
import ReactDOM from "react-dom";
import uuid from "uuid";

import "./styles.css";

const createItems = (items, remove, change) =>
  items.map(item => (
    <TodoItem
      item={item}
      key={item.id}
      removeTodo={id => remove(id)}
      changeItem={(id, val) => change(id, val)}
    >
      {item.text}
    </TodoItem>
  ));

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: ""
    };
  }

  addNew = value =>
    this.setState({
      val: value
    });

  render() {
    return (
      <div>
        <p>Add something</p>
        <input onChange={e => this.addNew(e.target.value)} />
        <p>{this.state.val}</p>
        <button onClick={() => this.props.addTodo(this.state.val)}>ADD</button>
      </div>
    );
  }
}

const TodoItem = props => (
  <li>
    {props.item.text}{" "}
    <button
      onClick={() => {
        console.log(props.item.id);
        props.removeTodo(props.item.id);
      }}
    >
      X
    </button>
    <button
      onClick={(id, val) =>
        props.changeItem(props.item.id, prompt("Insert new name"))
      }
    >
      Change
    </button>
  </li>
);

const TodoList = props => (
  <div>
    <ul>{createItems(props.items, props.removeTodo, props.changeTodo)}</ul>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          text: "get breakfast"
        },
        {
          id: 2,
          text: "get dinner"
        },
        {
          id: 3,
          text: "get supper"
        }
      ]
    };
  }

  addTodo(val) {
    this.setState({
      data: [
        ...this.state.data,
        {
          id: uuid.v4(),
          text: val
        }
      ]
    });
  }

  removeTodo(id) {
    const remainder = this.state.data.filter(item => item.id !== id);
    this.setState({
      data: remainder
    });
  }

  changeTodo(id, val) {
    const newData = this.state.data.map(item =>
      item.id === id ? { ...item, text: val } : item
    );
    this.setState({
      data: newData
    });
  }

  render() {
    return (
      <div className="App">
        <h1> </h1>
        <h2>test</h2>
        {this.state.data.map(item => (
          <p>{item.id}</p>
        ))}
        <TodoForm addTodo={val => this.addTodo(val)} />
        <TodoList
          items={this.state.data}
          removeTodo={id => this.removeTodo(id)}
          changeTodo={(id, val) => this.changeTodo(id, val)}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
