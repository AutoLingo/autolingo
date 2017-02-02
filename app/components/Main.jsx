import React from 'react';
import ChatApp from '../components/ChatApp'
import ChatAppCopy from '../components/ChatAppCopy'
export default function Main (props) {
  return (
    <main>
      <ChatAppCopy/>
      {/* {
       props.children && React.cloneElement(props.children, props)
      } */}
    </main>
  );
}
