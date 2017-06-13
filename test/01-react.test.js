import React from 'react';
import {createStore} from 'redux';

import chai, {expect} from 'chai'; // provides expect(), assert(), and should()
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import {shallow} from 'enzyme'; // React testing wrapper
import {spy} from 'sinon'; //spies 
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
//import faker from 'faker';

import Jokes from 'APP/app/components/Bom';

describe('React tests', function(){
  describe('<Bom />', function(){
    let BomWrapper;

    beforeEach('Create wrapper for <Bom />', function(){
      BomWrapper = shallow(<Bom />);
      console.log("Wrapper methods: ",Object.keys(BomWrapper.__proto__));
    });

    xit('includes Shipping Address as a table header',function(){
    });
  });
});
