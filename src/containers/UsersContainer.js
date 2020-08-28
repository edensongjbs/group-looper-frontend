import React from 'react'

export default class UsersContainer extends React.Component {
    render(){
        return (
            <div className="users">
                <div className="users-title">
                    <h3>Users</h3>
                </div>
                <div className="user-scroll">
                    <ul>
                        <li><div className="user-li"><button>X</button>UserName Here</div></li>
                        <li><div><button>X</button>UserName Here</div></li>
                        <li><div><button>X</button>UserName Here</div></li>
                        <li><div><button>X</button>UserName Here</div></li>
                        <li><div><button>X</button>UserName Here</div></li>
                        <li><div><button>X</button>UserName Here</div></li>
                        <li><div><button>X</button>UserName Here</div></li>
                        <li><div><button>X</button>UserName Here</div></li>
                    </ul>
                </div>
            </div>
        )
    }
}