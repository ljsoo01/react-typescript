import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
// npm install @reduxjs/toolkit redux react-redux
// 리덕스를 설치하면 App 컴포넌트를 Provider 컴포넌트로 감싸준다
// Context API 또는 redux는 프로젝트 전반적으로 사용할 state를 저장하기 위한 공간

const 초기값 : {count:number, user:string} = {count:0, user:'김유신'}

// createStore -> createSlice
// createSlice에는 name, initialState, reducers 만들기
const countSlice = createSlice({ // name, initialState, reducers
  name: 'counter',
  initialState: 초기값,
  reducers: {
    증가(state) { // state: 기존값
      state.count += 1
    },
    감소(state) {
      state.count -= 1
    },
    더하기(state, action : PayloadAction<number>) { // action: 사용하는 곳에서 잔달받을 값(매개변수)
      state.count += action.payload // .payload 붙여서 사용하기
    },
    초기화(state) {
      state.count = 0
    }
  }
})

// Provider에 제공할 store
let store = configureStore({
  reducer:{
    리듀서1 : countSlice.reducer, // 리듀서1 이라는 키워드로 countSlice의 리듀서 함수를 제공하겠다
  }
})

// 제공할 리듀서 변수, 함수, State를 import 할 수 있게 export
export let {증가, 감소, 더하기, 초기화} = countSlice.actions
// 타입스크립트에서 리덕스를 사용할 때, 내보낼 상태의 타입을 만들어놓는다
export type RootState = ReturnType<typeof store.getState>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );
  root.render(
    <Provider store={store}>
    <App />
  </Provider>

);





// const 초기값 : {count : number} = {count: 0} // 초기값 0
// // 옛날 방법 (@reduxjs/toolkit을 안쓰고)
// // 리듀서 만들기 (전역 상태/변수를 수정할 수 있게 제공하는 함수 생성)
// function reducer(state=초기값, action:{type:string}) {
//   if(action.type === '증가') {
//     return {...state, count:state.count + 1}
//   } else if(action.type === '감소') {
//     return {...state, count:state.count - 1}
//   } else {
//     return 초기값
//   }
// }
// const store = createStore(reducer)