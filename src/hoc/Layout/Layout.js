import React, {Component} from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import cssClasses from './Layout.css';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToogle = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !this.state.showSideDrawer};
        }); 
    }


    render() {
        return (
            <Auxiliary>
                <Toolbar click={this.sideDrawerToogle} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <div>Sidebar, Backdrop</div>
                <main className={cssClasses.content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }

}
    
export default Layout; 