import { BeersState } from './beers.state-type';
import { FETCH_BEERS_RESPONSE } from './beers.actions';
import { GenericAction } from '../../models';
import { beersReducer } from './beers.reducer';


describe('beersReducer', () => {

  const initialState: BeersState = {
    beers: [],
    beer: null,
  };

  describe('FETCH_BEERS_RESPONSE', () => {
    it('should set beers list as payload received', () => {
      const payload = [
        {id: 'test', name: 'testName'},
        {id: 'test1', name: 'testName1'},
        {id: 'test2', name: 'testName2'},
        {id: 'test3', name: 'testName3'}
      ];
      const action = new GenericAction(FETCH_BEERS_RESPONSE, payload);

      const result = beersReducer(initialState, action);

      expect(result.beers).toEqual(payload);
    });
  });
});
