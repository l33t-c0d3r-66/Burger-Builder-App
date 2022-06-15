import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';


configure({adapter: new Adapter()});

    
describe('<NavigationItems />', ()=>{
    let wrapper;
    beforeEach(() => {
            wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> without authentication', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> with authentication', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});