


import classes from './ChatPageContent.module.css';
import Nav from './Nav'
import ChatBody from './ChatBody'
const ChatPageContent = () => {
  return (
    <div className={classes.root} >
    
      <section className={classes.main}>
     
      <ChatBody/>
      </section>
    </div>
  );
};

export default ChatPageContent;