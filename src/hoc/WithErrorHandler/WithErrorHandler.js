import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxiliary/Auxiliary';

const withErrorHandler = ( WrappedComponent, axios ) => {
   return class extends Component {

        state = {
            error: null
        }
        // Can be inside the instructor
        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render() {
            return (
                <Auxillary>
                     <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message: null}
                     </Modal>
                     <WrappedComponent {...this.props}/>
                 </Auxillary>
            ); 
        }
   }
}

export default withErrorHandler;