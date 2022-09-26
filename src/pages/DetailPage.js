import React from "react";
import { useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import { getNote } from "../utils/api";

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={id} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    const {data} = getNote(props.id)

    this.state = {
      notes: data,
    };
  }

  render() {
    if (this.state.notes === null) {
      return <p className="note-detail__empty">Catatan Tidak Ditemukan</p>;
    }

    return (
      <section>
        <NoteDetail {...this.state.notes} />
      </section>
    );
  }
}

export default DetailPageWrapper;
