import React from 'react';

class SessionForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fname: '',
            password: '',
            email: ''
        }
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = Object.assign({}, this.state); // {user: {fname, password}}
        this.props.processForm(user).then(this.props.closeModal).then(() => this.history.push('/'));
    }

    update(field) {
        return (event) => {
            this.setState({[field]: event.target.value});
        }
    }

    renderErrors() {
        return (
            <ul>
                {this
                    .props
                    .errors
                    .map((error, i) => (
                        <li key={`error-${i}`}>
                            {error}
                        </li>
                    ))}
            </ul>
        );
    }

    render() {

        const loginHeader = (
            <div className="login-header">
                <h1>Login to continue</h1>
            </div>
        );

        const registerHeader = (
            <div className="register-header">
                <h1>Create your account</h1>
                <p>Registration is easy.</p>
            </div>
        );

        const header = this.props.formType === 'Register'
            ? registerHeader
            : loginHeader;

        const fnameInput = this.props.formType === 'Register' ? (
            <div className="login-form">
                <label htmlFor="fname">
                    First name
                    <span className="text-orange">*</span>
                </label>
                
                <input
                    type="text"
                    value={this.state.fname}
                    onChange={this.update('fname')}
                    className="login-input"
                    id="fname" />

                <br />
            </div>            
        ) : ('');

        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">

                    {header}

                    <div className="login-form">
                        <br/>

                        <label htmlFor="email">Email address
                            <span className="text-orange">*</span>
                        </label>
                        <input
                            type="email"
                            value={this.state.email}
                            onChange={this.update('email')}
                            className="login-input"
                            id="email" />

                        <br />

                       {fnameInput}

                        <label htmlFor="password">Password
                            <span className="text-orange">*</span>
                        </label>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            className="login-input"
                            id="password"/>

                        <br/>

                        
                        <button className="clicky">{this.props.formType}</button>

                    </div>
                </form>
            </div>
        );
    }

}

export default SessionForm;