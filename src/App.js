import React, { Component } from "react";
import Header from "./Header.js";
import NoteList from "./NoteList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  addNote = () => {
    //create a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    //add new note to existing notes array in state
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    //editMeId == id of the note that is edited
    //updatedKey == title or description
    //updatedValue == whatever was entered

    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });

    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  removeNote = (noteId) => {
    // to learn how the .filter method works, check out https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const filterCallback = (note) => note.id !== noteId;
    const newNotes = this.state.notes.filter(filterCallback);
    this.setState({ notes: newNotes });
  };

  componentDidMount() {
    const stateString = localStorage.getItem("stateString");
    if (stateString) {
      const savedState = JSON.parse(stateString);
      this.setState(savedState);
    }
  }

  componentDidUpdate() {
    const stateString = JSON.stringify(this.state);
    localStorage.setItem("stateString", stateString);
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          addNote={this.addNote}
          searchText={this.state.searchText}
        />
        <NoteList
          onType={this.onType}
          notes={this.state.notes}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}

export default App;
