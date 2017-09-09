import {FETCH_DATA} from '../actions/index';
import _ from 'lodash';

export default function(state={data:[], term:null}, action) {
	switch (action.type) {
		case FETCH_DATA:
			let dataEl = action.payload.data.petfinder;
				const actMeta = action.meta;
				const metaTerm = actMeta.term;
				const metaTermText = actMeta.termText;
				const metaBreed = actMeta.breed;
				const termText = metaBreed.length > 0 ? metaTermText + ' / ' + metaBreed : metaTermText;
				if(_.isEmpty(dataEl.pets)) {
					return {data: null, term: metaTerm, termText: termText, termShort:metaTermText, breed: metaBreed};
				} else{
					if(dataEl.pets) {
						let metaPrevData = actMeta.prevData !== 0 ? actMeta.prevData : [];
						let isResultRepeating = _.isEqual(metaPrevData[0], dataEl.pets.pet[0]);
						let newPage = dataEl.lastOffset.$t;
						let finalData;
						if(isResultRepeating) {
							return state;
						} else {
							finalData = actMeta.prevData !== 0 ? actMeta.prevData.concat(dataEl.pets.pet) : dataEl.pets.pet;
						}
						return {data: finalData, term: metaTerm, termShort: metaTermText, termText: termText, breed: metaBreed, newPage: newPage};
					}
			}
		default: 
			return state
	}
}