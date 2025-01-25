// redux state
const initialState: reduxStore = {
   currentUser: '',
   // deck of cards
   cards: [],
   // your turn or not
   turn: true,
   // is in game
   inGame: false,
   // is participating in a game at the moment
   currentGame: '',
   // opponent's name
   opponent: '',
   // opponent's cards
   opponentCards: [],
   // opponent cards number
   opponentCardsNumber: 0,
   // did this user already created a game
   hasCreatedGame: false,
   //wins
   wins: 0,
   // total games
   games: 0
};

// type for the redux state
type reduxStore = {
   currentUser: string,
   cards: number[],
   turn: boolean,
   inGame: boolean,
   currentGame: string,
   opponent: string,
   opponentCards: number[],
   opponentCardsNumber: number,
   hasCreatedGame: false,
   wins: number,
   games: number
}

/**
 * Redux reducer for the Redux store defined in Board.tsx
 * Actions:
 * - Get state: store.getstate()
 * - Dispatch atcion: store.dispatch({type:'USER_CARDS_UPDATE})
 * - Subscribe: store.subscribe(() => {console.log(store.getState())})
 * 
 * @param state 
 * @param action 
 * @returns 
 */

const reducer = (state = initialState, action: any = {}) => {
   switch (action.type) {
      case 'USER_TURN_UPDATE':
         // assigns the opposite value of 'turn' (false->true and true->false)
         return Object.assign({}, state, {
            turn: !state.turn
         })

      case 'USER_CARDS_UPDATE' || "USER_CREATED_GAME" || "USER_JOINED_GAME":
         // updates the card store of an user, only updatable upon request
         return {
            ...state,
            ...action.content
         }

      default:
         return state;
   }
}
export default reducer;