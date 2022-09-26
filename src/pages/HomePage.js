import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { LocaleConsumer } from "../context/LocaleContext";
import { deleteNote, getActiveNotes } from "../utils/api";

// function HomePage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [contacts, setContacts] = React.useState([]);
//   const [keyword, setKeyword] = React.useState(() => {
//     return searchParams.get('keyword') || ''
//   });
//   const {locale} = React.useContext(LocaleContext)

//   return (
//     <div>HomePage</div>
//   )
// }

// export default HomePage

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }
  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || "",
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data,
      };
    });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);

    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data,
      };
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });
    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <main>
              <SearchBar
                keyword={this.state.keyword}
                keywordChange={this.onKeywordChangeHandler}
              />
              <br />
              <h2>{locale === "id" ? "Daftar Catatan" : "Notes List"}</h2>
              <NoteList notes={notes} onDelete={this.onDeleteHandler} />
            </main>
          );
        }}
      </LocaleConsumer>
    );
  }
}

export default HomePageWrapper;
