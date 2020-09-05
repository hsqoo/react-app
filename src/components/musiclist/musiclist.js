import React from 'react';
import {Link} from 'react-router-dom';
import {getPlayList} from '../../api';

class Musiclist extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            playlist: [],
            text: ''
        }
    }
    componentWillMount() {
        let userId = localStorage.getItem('userId');
        getPlayList({'uid':userId}).then((res)=> {
            if (res.status === 200) {
                this.setState({
                    playlist: res.data.playlist
                })
            }
        })
    }
    render() {
        return (

            <div className="playlist">
                {this.state.playlist.map((item)=>(
                    <div key={item.name}>{item.name}</div>
                ))}
            </div>
        )
    }
}
export default Musiclist;