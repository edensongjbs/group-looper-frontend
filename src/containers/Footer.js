import React from 'react'
import { connect } from 'react-redux'

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                All Rights Reserved
                {this.props.loggedIn? 
                <button onClick={this.props.logOut}>Log Out</button> : null}
            </footer>
        )
    }
}

const mapStateToProps = (state) => ({ loggedIn: state.session.loggedIn })

const mapDispatchToProps = (dispatch) => ({logOut: () => dispatch({type:'LOGOUT'})})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)