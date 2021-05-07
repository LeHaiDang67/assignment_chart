import {useReducer} from 'react';
import {useWindowResize, useDebouncedFn} from 'beautiful-react-hooks';


const initialState = {
    windowWidth: window.innerWidth,
    sunPosition: 0.0,
    period: 0,
    scrollAt: 0,
    isMouseDown: false,
    scrollLeft: 0,
    startXAxis: 0
}
const reducer = (state, {type, payload = {} }) => {
    switch (type) {
        case 'UPDATE_WINDOW_WIDTH': 
            return {...state, windowWidth: payload.windowWidth}
        case 'UPDATE_SUN_POSITION':
            return {...state, sunPosition: payload.sunPosition}
        case 'UPDATE_PERIOD':
            return {...state, period: payload.period}
        case 'UPDATE_SCROLL_AT':
            return {...state, scrollAt: payload.scrollAt}
        case 'UPDATE_SCROLL_STATE':
            return {...state, scrollAt: payload.scrollAt, period: payload.period, sunPosition: payload.sunPosition}
        case 'UPDATE_STATE_MOUSE_DOWN':
            return {...state, isMouseDown: payload.newState}
        case 'UPDATE_STATE_MANUAL_SCROLL':
            return {...state, scrollLeft: payload.scrollLeft, isMouseDown: payload.isMouseDown}
        default :
            return state; 
    }
}

const useWeatherChart = () =>{
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useWindowResize(useDebouncedFn( (event)=>{
        dispatch({type:'UPDATE_WINDOW_WIDTH', payload: {
            windowWidth: event.currentTarget.innerWidth }})
    }));

    const manipulateState = {...state, halfWindowWidth: state.windowWidth / 2,
                 pxPerHr: state.windowWidth /12
    }
    
    return [manipulateState, dispatch];
}

export default useWeatherChart;