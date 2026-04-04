import React, {Component} from 'react';
import { withTranslate } from 'react-redux-multilingual'
// Custom Components
import HeaderOne from './common/headers/header-one';
import FooterOne from "./common/footers/footer-one";
import { ToastContainer } from 'react-toastify';
// import { generateToken, notificationEnabled, messaging } from './firebase/notifications/firebase'
import Notifications from './common/alert/notifications'
import { onMessage } from 'firebase/messaging';
import { Toaster } from 'react-hot-toast';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: true
        }  
        
        // if (notificationEnabled()) {
        //     onMessage(messaging, (payload) => {
        //         // console.log('Message received. ', payload);
        //         // ...
        //     });
        // }
    }
    handleHideAlert = () => {
        this.setState({
            showAlert: false
        })
        // generateToken();
    }

    componentDidMount = () =>{
        // if (Notification.permission == 'granted') {
        //     generateToken();
        // }
    }
    
    render() {
        return (
            <div>
               
                <HeaderOne logoName={'logo.png'}/>
                
                {this.props.children}
                {/* { !notificationEnabled() && this.state.showAlert && <Notifications title="Notifications" buttonText="Next" onClose={this.handleHideAlert} />} */}
                <FooterOne logoName={'logo.png'}/>
                <ToastContainer/>
                <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 3000,
    removeDelay: 1000,
    style: {
      background: '#427fc1',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
            </div>
        );
    }
}

export default withTranslate(App);
