import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import EventList from './eventList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 1,
      keyword: '',
      pageCount: ''
    };
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleKeywordSubmit = this.handleKeywordSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.loadEventsFromServer = this.loadEventsFromServer.bind(this);
  }

  loadEventsFromServer() {
    axios.get(`http://localhost:3000/events?q=${this.state.keyword}`)
      .then(response => {
        this.setState({
          pageCount: Math.ceil(response.data.length / 10)
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(`http://localhost:3000/events?q=${this.state.keyword}&_page=${this.state.currentPage}&_limit=10`)
      .then((response) => {
        this.setState({
          data: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleKeywordChange(e) {
    e.preventDefault();
    this.setState({
      keyword: e.target.value
    })
  };

  handleKeywordSubmit(e) {
    e.preventDefault();
    this.loadEventsFromServer();
  };

  handlePageClick() {

  };

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <form onSubmit={this.handleKeywordSubmit}>
          <label>
            Search by keyword:
            <input type="text" value={this.state.keyword} onChange={this.handleKeywordChange} />
          </label>
          <input type="submit" value="Search" />
        </form>
        <EventList data={this.state.data} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

