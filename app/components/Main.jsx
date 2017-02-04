import React from 'react';
import ChatApp from '../components/ChatAppGroup'
export default function Main (props) {
  return (
    <main>
      <ChatAppGroup/>
      {/* {
       props.children && React.cloneElement(props.children, props)
      } */}
    </main>
  );
}
