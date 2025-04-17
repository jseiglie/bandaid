export const initialStore = () => {
    return {
     ok: false
    }
  }
  //  NO PUEDE SER ASYNC!!!!
  export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'test':
            console.log('test ok', action.payload)
            return {
                ...store,
                ok: action.payload.ok
            };
      default:
        throw Error('Unknown action.');
    }
  }