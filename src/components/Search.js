import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          showlist: false
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();
        // this.props.history.push(`/user/${this.refs.userInput.value}`);
        fetch(`https://api.github.com/search/users?q=${this.refs.userInput.value}`)
        .then(response => response.json())
        .then(
            users => {
                this.setState({
                    users: users.items,
                    showlist: true
                });
            }
        );
    }

    render() {
        let userlist = '';
        if(this.state.showlist){
           userlist = (
            <div>
            {
              this.state.users.map((user,index) => {
                return (
                  <div className="user-page" key={index}>
                      <div className="user-info">
                          <Link className="user-info__text" to={`/user/${user.login}`}>
                              <img className="user-info__avatar" src={user.avatar_url} alt={`${user.login} avatar`}/>
                              <h2 className="user-info__title">{user.login}</h2>
                          </Link>
                      </div>
                  </div>
                )
              })
            }
            </div>
          );
        }

        return (
            <div className="search-page">
                <div className="search-header">GitPeople</div>
                <form onSubmit={this._handleSubmit}>
                    <input ref="userInput" className="search-page__input" type="text" />
                    <button className="search-page__button">Search</button>
                </form>
                {
                  this.state.showlist === true? userlist : <div className="no-user-found">No users found</div>
                }
            </div>
        );
    }
};

export default Search;
