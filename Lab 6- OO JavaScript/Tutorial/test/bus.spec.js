const {expect} = require('chai');
const Bus = require('../model/bus');

//test
describe('Testing the Bus class', ()=>{
  describe('The insurance Method Test Cases' , ()=>{
      it('when horse power is < 600 we expect the insurance to be 1000' , ()=>{
          let bus = new Bus('Toyota', 5500, 40);
          // expect(bus.getInsurance()).equal(2000)
          expect(bus.badMethod(1000)).equal(false)
      })

      it('when horse power is < 1000 we expect the insurance to be 1000' , ()=>{
          let bus = new Bus('Toyota', 800, 40);
          expect(bus.getInsurance()).lessThan(1200)
      })

      it('when horse power is >= 1000 we expect the insurance to be 1000' , ()=>{
          let bus = new Bus('Toyota', 1200, 40);
          expect(bus.getInsurance()).equal(2000)
      })
  })
})

