import React from 'react'

export default class Sidebar extends React.Component {
    render() {
        return(
            <div className="sidebar">
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
                
                <div className="layers">
                    <div className="users-title">
                        <h3>Layers</h3>
                    </div>
                    <div className="layer-scroll">
                        <ul>
                            <li><div className="layer-li"><button>X</button>UserName Here</div></li>
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
            </div>
        )
    }
}