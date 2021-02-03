import store from '../store'

export const nikename = {
  inserted(el, binding) {
    var content = el.innerHTML
    let id = binding.value;
    if ( store.state.friendList[id] ) {
      // console.log(store.state.friendList[id]);
      if(store.state.friendList[id].notes){
        content=store.state.friendList[id].notes 
      }
    }
    el.innerHTML = content;
  },
}