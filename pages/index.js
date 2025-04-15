/* eslint-disable flowtype/require-valid-file-annotation */

import React, { useState, Component } from "react";
import Button from '@mui/material/Button'
import Popout from "react-popout";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initial = [
  { id: "id-1", content: "Quote1" },
  { id: "id-2", content: "Quote2" },
  { id: "id-3", content: "Quote3" },
  { id: "id-4", content: "Quote4" },
  { id: "id-5", content: "Quote5" }
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Quote = ({ quote, index }) => (
  <Draggable draggableId={quote.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div style={{ width: "200px", border: "1px solid grey" }}>
          {quote.content}
        </div>
      </div>
    )}
  </Draggable>
);

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return (
    quotes &&
    quotes.length &&
    quotes.map((quote, index) => (
      <Quote quote={quote} index={index} key={quotes.id} />
    ))
  );
});

const DnDList = () => {
  const [quotes, setQuotes] = useState(initial);

  function onDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const newQuotes = reorder(
      quotes,
      result.source.index,
      result.destination.index
    );
    setQuotes(newQuotes);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

class Index extends Component {
  state = {
    menuOpen: false,
    popoutOpen: false
  };

  handlePopoutClosing = () => {
    this.setState({
      menuOpen: false,
      popoutOpen: false
    });
  };

  handleOpenPopoutClick = () => {
    this.setState({
      popoutOpen: true
    });
  };

  handleMenuOpenClick = (event) => {
    this.setState({ anchorEl: event.currentTarget, menuOpen: true });
  };

  handleMenuClosing = () => {
    this.setState({ menuOpen: false });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Button raised color="primary" onClick={this.handleOpenPopoutClick}>
          Open Popout
        </Button>
        <DnDList />
        {this.state.popoutOpen && (
          <Popout onClosing={this.handlePopoutClosing}>
            <DnDList />
          </Popout>
        )}
      </div>
    );
  }
}

export default Index;
