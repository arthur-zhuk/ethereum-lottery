import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import voting from './voting';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',

    // Lottery State
    candidates: {
      arthur: '0x6265aaFC8D25B36f97181C44d0EB6693f00EbA17',
      zhuk: '0x425dBB8a60A038e91594660C00b1bD79c24248FA'
    },
    arthurVotes: 0,
    zhukVotes: 0,

    totalTokens: 0,
    tokensSold: 0,
    pricePerToken: 0,
    balanceInContract: '',

    voteInput: '',
    thinking: false,
    amountTokensToBuy: '',
    addressToLookup: '',
    tokenVoteAmount: '',
    voterDetails: null,
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    const arthurVotes = await voting.methods
      .votesReceived(this.state.candidates['arthur'])
      .call();
    const zhukVotes = await voting.methods
      .votesReceived(this.state.candidates['zhuk'])
      .call();
    const totalTokens = await voting.methods.totalTokens().call();
    const tokensSold = await voting.methods.tokensSold().call();
    const pricePerToken = await voting.methods.tokenPrice().call();
    const balanceInContract = await web3.eth.getBalance(voting.options.address);
    const accounts = await web3.eth.getAccounts();

    console.log({
      totalTokens,
      tokensSold,
      pricePerToken,
      balanceInContract,
      balance,
      accounts,
    }, voting.options.address);

    this.setState({
      manager,
      players,
      balance,
      arthurVotes,
      zhukVotes,
      totalTokens,
      tokensSold,
      pricePerToken,
      balanceInContract,
    });
  }

  voteForCandidate = async () => {
    const accounts = await web3.eth.getAccounts();
    const candidateName = this.state.voteInput;
    const candidateAddress = this.state.candidates[candidateName];
    this.setState({
      thinking: true
    });
    await voting.methods.voteForCandidate(candidateAddress, this.state.tokenVoteAmount).send({
      gas: 1400000,
      from: accounts[0]
    });
    this.getNewVoteValues();
    this.setState({
      voteInput: '',
      thinking: false
    });
  };

  buyTokens = async () => {
    const accounts = await web3.eth.getAccounts();
    const price = this.state.amountTokensToBuy * this.state.pricePerToken;
    console.log({ price });
    try {
      const buyResponse = await voting.methods.buy().send({value: web3.utils.toWei('1', 'ether'), from: accounts[0], gas: 1500000});
      console.log({buyResponse})
    } catch (err) {
      console.log({err});
    }
    this.setState({ amountTokensToBuy: '' });
  };

  lookupVoter = async () => {
    const lookupAddress = this.state.addressToLookup;
    console.log({ lookupAddress });
    const voterDetails = await voting.methods.voterDetails(lookupAddress).call();
    this.setState({ voterDetails })
    console.log({voterDetails});
  };

  getNewVoteValues = async () => {
    const arthurVotes = await voting.methods
      .votesReceived(this.state.candidates['arthur'])
      .call();
    const zhukVotes = await voting.methods
      .votesReceived(this.state.candidates['zhuk'])
      .call();

    this.setState({
      arthurVotes,
      zhukVotes
    });
  };

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: 'Waiting on transaction success...'
    });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({
      message: 'You have been entered!'
    });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: 'Waiting on transaction success...'
    });
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({
      message: 'A winner has been picked!'
    });
  };

  renderVoterDetails() {
  }

  render() {
    return (
      <div>
        <h2> Lottery Contract </h2>
        <p>
          This contract is managed by {this.state.manager}.There are currently
          {this.state.players.length}
          people entered, competing to win {this.state.balance}
          ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4> Want to try your luck ? </h4>
          <div>
            <label> Amount of ether to enter </label>
            <input
              value={this.state.value}
              onChange={event =>
                this.setState({
                  value: event.target.value
                })
              }
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Ready to pick a winner ?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr />
        <h1>{this.state.message}</h1>
        <h3 style={{ textAlign: 'center' }}>Voting Example</h3>
        <div className="voting-container">
          <div className="voting-section">
          <table>
            <thead>
              <tr><th>Candidate</th><th>Votes</th></tr>
            </thead>
            <tbody>
              <tr><td>Arthur</td><td id="candidate-1">{this.state.arthurVotes}</td></tr>
              <tr><td>Zhuk</td><td id="candidate-2">{this.state.zhukVotes}</td></tr>
            </tbody>
          </table>
          <input
            value={this.state.voteInput}
            onChange={event =>
              this.setState({
                voteInput: event.target.value
              })
            }
            placeholder="Name of Person"
            type="text"
            id="candidate"
          />
          <input
            value={this.state.tokenVoteAmount}
            onChange={event =>
              this.setState({
                tokenVoteAmount: event.target.value
              })
            }
            placeholder="Token Amount"
            type="text"
            id="candidate"
          />
          <button onClick={this.voteForCandidate}>Vote</button>
          {this.state.thinking ? (
            <h3> Sending vote to the blockchain... </h3>
          ) : null}
        </div>
        <div className="stats-container">
          <div className="stats">
            <h4>Token Stats</h4>
            <p>Tokens for sale: {this.state.totalTokens}</p>
            <p>Tokens sold: {this.state.tokensSold}</p>
            <p>Price per Token: {this.state.pricePerToken}</p>
            <p>Balance in the contract: {this.state.balanceInContract}</p>
          </div>
          <div>
            <h4>Purchase Tokens</h4>
            <input
              onChange={e =>
                this.setState({
                  amountTokensToBuy: e.target.value
                })
              }
            />
            <button onClick={this.buyTokens}>Purchase</button>
          </div>
          <div>
            <h4>Lookup Voter Info</h4>
            <input
              placeholder="Address"
              onChange={e =>
                this.setState({
                  addressToLookup: e.target.value
                })
              }
            />
            <button onClick={this.lookupVoter}>Lookup</button>
            <div className="lookup-results">
              {
                this.state.voterDetails !== null ? (
                <p>Total Tokens Bought: { this.state.voterDetails[0] }
                <br />
                Arthur: { this.state.voterDetails[1][0] }
                <br />
                Zhuk: { this.state.voterDetails[1][1] }
                <br /></p>
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
