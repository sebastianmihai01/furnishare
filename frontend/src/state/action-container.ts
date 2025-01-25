/**
 * container for action defining for redux
 */

export const setData = (content: any) => {
    return {
        type: 'USER_CARDS_UPDATE',
        content
    }
}

// dispatch = store.dispatch(setdata(x))
export const appendData = (obj: any) => {
    console.log('Redux Hit')
    return (dispatch: any) => {
        return dispatch(setData(obj));
    }


}
