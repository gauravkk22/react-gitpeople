import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userdata: [],
          repodata:[],
          repo_sort: 'full_name'
        }
    }

    componentDidMount() {
        fetch(`https://api.github.com/users/${this.props.match.params.username}`)
        .then(response => response.json())
        .then(
            userdata => {
                this.setState({
                    userdata: userdata
                });
            }
        );

        fetch(`https://api.github.com/users/${this.props.match.params.username}/repos`)
        .then(response => response.json())
        .then(
            repodata => {
              console.log('repo',repodata);
                // How can we use `this` inside a callback without binding it??
                this.setState({
                    repodata: repodata
                });
            }
        );
    }

    sortTypeChanged = (event) => {
      event.preventDefault();
      this.setState({
        repo_sort : event.target.value
      });

      fetch(`https://api.github.com/users/${this.props.match.params.username}/repos?sort=${event.target.value}`)
      .then(response => response.json())
      .then(
          repodata => {
              this.setState({
                  repodata: repodata
              });
          }
      );

    }
    render() {
        const userdata = this.state.userdata;
        let repodata = [];
        if(this.state.repodata){
          repodata = (
            <div>
            {
              this.state.repodata.map( (repo,index) => {
                return (
                  <div className="repo-container" key={index}>
                    <a href={repo.svn_url} target="_blank"><div className="repo-name">{repo.name}</div></a>
                    <div className="repo-description">{repo.description}</div>
                    <span className="main-lang">{repo.language}</span>
                    <span className="forks">{repo.forks_count}</span>
                    <span className="stars">{repo.stargazers_count}</span>
                    <span className="lastupdate">{repo.updated_at}</span>
                  </div>
                )
              })
            }
            </div>
          );
        }
        return (
            <div className="details-page">
              <div className="user-detail">
                  <img className="user-detail-avatar" src={userdata.avatar_url} alt={`${userdata.login} avatar`}/>
                  <h2>{userdata.login}</h2>
                  <div>{userdata.location}</div>
                  <div>{userdata.company}</div>
                  <a href={userdata.blog} target="_blank">{userdata.blog}</a>
              </div>
              <div className="user-repo-detail">
                  <h1>REPOSITORIES</h1>
                  <label htmlFor="repo-sort">
                    Sort Repo By : &nbsp;
                    <select name="repo-sort" id="repo-sort" value={this.state.repo_sort} onChange={this.sortTypeChanged}>
                      <option value="created">created</option>
                      <option value="updated">updated</option>
                      <option value="pushed">pushed</option>
                      <option value="full_name" >full_name</option>
                    </select>
                  </label>
                  {
                    this.state.repodata.length !== 0 ? repodata : <h1>No repo found</h1>
                  }
              </div>
            </div>
        )
    }
};

export default User;
