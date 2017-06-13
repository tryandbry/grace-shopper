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

import {Bom} from 'APP/app/components/Bom';

describe('React tests', function(){
  describe('<Bom />', function(){
    let bomWrapper;

    beforeEach('Create wrapper for <Bom />', function(){
      let myProps = {
	bom: {
	  id: 1,
	  shipping: "31 Spooner St.\nQuahog, RI 01234",
	  status: "completed",
	  items: [
	    {
	      bom_id: 1,
	      cart_id: null,
	      cost: "234974.22",
	      discount: 0.67,
	      id: 1,
	      product_id: 6,
	      quantity: 1
	    },
	    {
	      bom_id: 1,
	      cart_id: null,
	      cost: "12323.34",
	      discount: 0.7,
	      id: 2,
	      product_id: 6,
	      quantity: 8
	    },
	  ],
	  products: [
	    {
	      cost: "278906.71",
	      description: "Shiny like a diamond.  \'cuz it\'s a diamond.",
	      id: 2,
	      inventory: 5366,
	      name: "dino poo",
	      // image: URL /*Not providing image for test, but this exists
	      //        in the Model
	    },
	    {
	      cost: "461720.15",
	      description: "A porous rock perfect for exfoliation in the shower or classroom.",
	      id: 6,
	      inventory: 5084,
	      name: "trilobite",
	      // image: URL /*Not providing image for test, but this exists
	      //        in the Model
	    },
	  ],
	},
      };
      bomWrapper = shallow(<Bom bom={myProps.bom} />);
    });

    it('includes the order number in the title',function(){
      //expect(bomWrapper.find('#shipping h3')).to.have.html('<h3>Order 1</h3>');
      expect(bomWrapper.findWhere(n=>n.text() == 'Order 1')).to.have.length(1);
    });

    it('renders data for each line item in a table',function(){
      let tabledata = bomWrapper.find('td');
      //console.log('tabledata:',tabledata.contains('dino poo'));
      expect(tabledata.contains('dino poo')).to.be.true;
      expect(tabledata.contains("Shiny like a diamond.  \'cuz it\'s a diamond.")).to.be.true;
      expect(tabledata.contains('$234,974.22')).to.be.true;
      expect(tabledata.contains('$12,323.34')).to.be.true;
      expect(tabledata.contains('$98,586.72')).to.be.true;
      expect(tabledata.contains('trilobite')).to.be.true;
      expect(tabledata.contains("A porous rock perfect for exfoliation in the shower or classroom.")).to.be.true;
    });

    it('renders summary data in a table',function(){
      let tabledata = bomWrapper.find('td');

      expect(tabledata.contains('$333,560.94')).to.be.true; //subtotal
    });
  });
});














