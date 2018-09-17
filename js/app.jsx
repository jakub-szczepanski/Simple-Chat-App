import React from 'react';
import ReactDOM from 'react-dom';
import { ChatManager, TokenProvider } from '@pusher/chatkit';

/*
const DUMMY_DATA = [
    {
        senderId: "pankoala",
        text: "what's up?!"
    },
    {
        senderId: "paniTygrys",
        text: "hello<3"
    }
]
*/

const instanceLocator = "v1:us1:0ad25573-c6a8-42c6-8be2-246bcdf809f3";
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0ad25573-c6a8-42c6-8be2-246bcdf809f3/token";
const userName = "pankoala";
const roomId = 16334912;

document.addEventListener('DOMContentLoaded', function () {

    class App extends React.Component {
        constructor(props) {
            super(props);
            this.sendMessage = this.sendMessage.bind(this);
            this.state = {
                messages: []
            }
        }

        componentDidMount() {
            const chatManager = new ChatManager({
                instanceLocator: instanceLocator,
                userId: userName,
                tokenProvider: new TokenProvider({
                    url: testToken
                })
            })

            chatManager.connect()
                .then(currentUser => {
                    this.currentUser = currentUser
                    this.currentUser.subscribeToRoom({
                        roomId: roomId,
                        hooks: {
                            onNewMessage: message => {

                                this.setState({
                                    messages: [...this.state.messages, message]
                                })
                            }
                        }
                    })
                })
        }

            sendMessage(text) {
                this.currentUser.sendMessage({
                    text,
                    roomId: roomId
                })
            }

        render() {
            return (
                <div className="app">
                    <Title />
                    <MessageList messages={this.state.messages} />
                    <SendMessageForm sendMessage={this.sendMessage} />
                </div>
            )
        }
    }

    class MessageList extends React.Component {
        render() {
            return (
                <ul className="message-list">
                    {this.props.messages.map(message => {
                        return (
                            <li key={message.id}>
                                <div className="first-child">
                                    {message.senderId}
                                </div>
                                <div className="second-child">
                                    {message.text}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    class SendMessageForm extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                message: ''
            }
        }
        handleChange(e) {
            this.setState({
                message: e.target.value
            })
        }

        handleSubmit(e) {
            e.preventDefault();
            this.props.sendMessage(this.state.message);
            this.setState({
                message: ''
            })
        }

        render() {
            return (
                <form className="send-message-form" onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.message} placeholder="Type your message and hit ENTER" type="text" />
                </form>
            )
        }
    }

    class Title extends React.Component {
        render() {
            return (
                <p className="title">My first chat app</p>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});