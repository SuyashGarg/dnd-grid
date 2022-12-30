import React from "react";
import { render } from "react-dom";
import { ListManager } from "react-beautiful-dnd-grid";
import "./styles.css";

const list = [
  {
    id: "0",
    order: 0
  },
  {
    id: "1",
    order: 1
  },
  {
    id: "555",
    order: 2
  },
  {
    id: "3",
    order: 3
  },
  {
    id: "4",
    order: 4
  },
  {
    id: "5",
    order: 5
  },
  {
    id: "6",
    order: 6
  },
  {
    id: "7",
    order: 7
  },
  {
    id: "8",
    order: 8
  },
  {
    id: "9",
    order: 9
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedList: sortList(props.list)
    };
  }

  sortList = () => {
    this.setState({
      ...this.state,
      sortedList: sortList(this.state.sortedList)
    });
  };

  reorderList = (sourceIndex, destinationIndex) => {
    console.log(sourceIndex, destinationIndex);
    if (destinationIndex === sourceIndex) {
      return;
    }
    const list = this.state.sortedList;

    if (destinationIndex === 0) {
      list[sourceIndex].order = list[0].order - 1;
      this.sortList();
      return;
    }

    if (destinationIndex === list.length - 1) {
      list[sourceIndex].order = list[list.length - 1].order + 1;
      this.sortList();
      return;
    }

    if (destinationIndex < sourceIndex) {
      list[sourceIndex].order =
        (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
      this.sortList();
      return;
    }

    list[sourceIndex].order =
      (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
    this.sortList();
  };

  render = () => (
    <div className="App">
      <ListManager
        items={this.state.sortedList}
        direction="horizontal"
        maxItems={4}
        render={(item) => <ListElement item={item} />}
        onDragEnd={this.reorderList}
      />
    </div>
  );
}

function sortList(list) {
  return list.slice().sort((first, second) => first.order - second.order);
}

function ListElement({ item: { id } }) {
  return (
    <div className="item">
      <div>{id}</div>
    </div>
  );
}

render(<App list={list} />, document.getElementById("root"));
